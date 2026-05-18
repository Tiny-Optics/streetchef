import {Router} from 'express';
import {getDb} from '../db.js';
import {requireSession, requireRole, type AuthedRequest} from '../middleware/requireSession.js';

export const merchantRouter = Router();

merchantRouter.use(requireSession, requireRole('merchant'));

type MenuItemDoc = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  rating: number;
  reviews: number;
  prepTime: string;
  available?: boolean;
  options?: {name: string; choices: string[]}[];
};

function formatMenuItem(doc: Record<string, unknown>): MenuItemDoc {
  const {_id, ...rest} = doc;
  return rest as MenuItemDoc;
}

merchantRouter.get('/dashboard', async (_req: AuthedRequest, res) => {
  try {
    const db = getDb();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = await db
      .collection('orders')
      .find({createdAt: {$gte: today}})
      .toArray();

    const sales = todayOrders.reduce((sum, o) => sum + (o.total as number), 0);
    const activeOrders = await db
      .collection('orders')
      .find({status: {$in: ['preparing', 'new']}})
      .sort({createdAt: -1})
      .limit(10)
      .toArray();

    const formatTimeAgo = (date: Date) => {
      const mins = Math.floor((Date.now() - date.getTime()) / 60000);
      if (mins < 1) return 'Just now';
      if (mins < 60) return `${mins} min ago`;
      const hrs = Math.floor(mins / 60);
      return `${hrs} hour${hrs > 1 ? 's' : ''} ago`;
    };

    res.json({
      todaySales: sales,
      orderCount: todayOrders.length,
      activeOrders: activeOrders.map((o) => ({
        id: o.orderId,
        items: (o.items as {name: string; quantity: number}[])
          .map((i) => `${i.quantity}x ${i.name}`)
          .join(', '),
        time: formatTimeAgo(o.createdAt as Date),
        status:
          o.status === 'preparing'
            ? 'Preparing'
            : o.status === 'delivering'
              ? 'Ready for Pickup'
              : 'New',
        total: o.total as number,
      })),
    });
  } catch {
    res.status(500).json({error: 'Failed to fetch dashboard'});
  }
});

merchantRouter.get('/menu', async (req, res) => {
  try {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    const filter = q
      ? {
          $or: [
            {name: {$regex: q, $options: 'i'}},
            {description: {$regex: q, $options: 'i'}},
            {category: {$regex: q, $options: 'i'}},
          ],
        }
      : {};

    const items = await getDb().collection('menuItems').find(filter).toArray();
    res.json(items.map((doc) => formatMenuItem(doc as Record<string, unknown>)));
  } catch {
    res.status(500).json({error: 'Failed to fetch merchant menu'});
  }
});

merchantRouter.post('/menu', async (req, res) => {
  try {
    const {name, description, price, image, category, available, prepTime, popular} = req.body as {
      name?: string;
      description?: string;
      price?: number;
      image?: string;
      category?: string;
      available?: boolean;
      prepTime?: string;
      popular?: boolean;
    };

    if (!name?.trim() || price === undefined || !category?.trim()) {
      res.status(400).json({error: 'name, price, and category are required'});
      return;
    }

    if (typeof price !== 'number' || price < 0) {
      res.status(400).json({error: 'price must be a non-negative number'});
      return;
    }

    const item: MenuItemDoc = {
      id: `m-${Date.now().toString(36)}`,
      name: name.trim(),
      description: description?.trim() ?? '',
      price,
      image:
        image?.trim() ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
      category: category.trim(),
      available: available !== false,
      rating: 0,
      reviews: 0,
      prepTime: prepTime?.trim() || '15-20 min',
      ...(popular !== undefined && {popular}),
    };

    await getDb().collection('menuItems').insertOne(item);
    res.status(201).json(item);
  } catch {
    res.status(500).json({error: 'Failed to create menu item'});
  }
});

merchantRouter.patch('/menu/:id', async (req, res) => {
  try {
    const {price, name, description, available, image, category} = req.body as {
      price?: number;
      name?: string;
      description?: string;
      available?: boolean;
      image?: string;
      category?: string;
    };

    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
      res.status(400).json({error: 'price must be a non-negative number'});
      return;
    }

    const updates: Record<string, unknown> = {};
    if (price !== undefined) updates.price = price;
    if (name !== undefined) updates.name = name.trim();
    if (description !== undefined) updates.description = description.trim();
    if (available !== undefined) updates.available = available;
    if (image !== undefined) updates.image = image.trim();
    if (category !== undefined) updates.category = category.trim();

    if (Object.keys(updates).length === 0) {
      res.status(400).json({error: 'No valid fields to update'});
      return;
    }

    const result = await getDb().collection('menuItems').findOneAndUpdate(
      {id: req.params.id},
      {$set: updates},
      {returnDocument: 'after'},
    );

    if (!result) {
      res.status(404).json({error: 'Item not found'});
      return;
    }

    res.json(formatMenuItem(result as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to update menu item'});
  }
});

merchantRouter.delete('/menu/:id', async (req, res) => {
  try {
    const result = await getDb().collection('menuItems').deleteOne({id: req.params.id});
    if (result.deletedCount === 0) {
      res.status(404).json({error: 'Item not found'});
      return;
    }
    res.status(204).send();
  } catch {
    res.status(500).json({error: 'Failed to delete menu item'});
  }
});
