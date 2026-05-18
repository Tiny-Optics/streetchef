import {Router} from 'express';
import {getDb} from '../db.js';
import {requireSession, requireRole, type AuthedRequest} from '../middleware/requireSession.js';

export const ordersRouter = Router();

ordersRouter.use(requireSession);

type OrderStatus = 'preparing' | 'delivering' | 'arrived' | 'completed' | 'new';

function formatOrder(doc: Record<string, unknown>) {
  return {
    id: doc.orderId as string,
    date: (doc.createdAt as Date).toISOString(),
    status: doc.status as OrderStatus,
    total: doc.total as number,
    items: doc.items,
    addressId: doc.addressId,
    userId: doc.userId,
  };
}

ordersRouter.get('/', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const role = (req.sessionUser as {role?: string}).role ?? 'customer';

    const filter =
      role === 'merchant'
        ? {}
        : role === 'driver'
          ? {driverId: userId}
          : {userId};

    const orders = await getDb()
      .collection('orders')
      .find(filter)
      .sort({createdAt: -1})
      .toArray();

    res.json(orders.map((o) => formatOrder(o as Record<string, unknown>)));
  } catch {
    res.status(500).json({error: 'Failed to fetch orders'});
  }
});

ordersRouter.post('/', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const {items, total, addressId, tax = 5, discount = 0} = req.body as {
      items?: unknown[];
      total?: number;
      addressId?: string;
      tax?: number;
      discount?: number;
    };

    if (!items?.length || total === undefined) {
      res.status(400).json({error: 'items and total are required'});
      return;
    }

    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const doc = {
      orderId,
      userId,
      driverId: null,
      items,
      total,
      tax,
      discount,
      addressId: addressId ?? null,
      status: 'preparing' as OrderStatus,
      paymentStatus: 'pending_cash',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await getDb().collection('orders').insertOne(doc);
    res.status(201).json(formatOrder(doc as unknown as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to create order'});
  }
});

ordersRouter.get('/:id', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const role = (req.sessionUser as {role?: string}).role ?? 'customer';
    const order = await getDb().collection('orders').findOne({orderId: req.params.id});

    if (!order) {
      res.status(404).json({error: 'Order not found'});
      return;
    }

    const canAccess =
      order.userId === userId ||
      order.driverId === userId ||
      role === 'merchant';

    if (!canAccess) {
      res.status(403).json({error: 'Forbidden'});
      return;
    }

    res.json(formatOrder(order as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to fetch order'});
  }
});

ordersRouter.patch('/:id/status', requireRole('merchant', 'driver'), async (req: AuthedRequest, res) => {
  try {
    const {status} = req.body as {status?: OrderStatus};
    if (!status) {
      res.status(400).json({error: 'status is required'});
      return;
    }

    const result = await getDb().collection('orders').findOneAndUpdate(
      {orderId: req.params.id},
      {$set: {status, updatedAt: new Date()}},
      {returnDocument: 'after'},
    );

    if (!result) {
      res.status(404).json({error: 'Order not found'});
      return;
    }

    res.json(formatOrder(result as unknown as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to update order'});
  }
});
