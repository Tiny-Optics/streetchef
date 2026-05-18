import {Router} from 'express';
import {getDb} from '../db.js';
import {requireSession, requireRole, type AuthedRequest} from '../middleware/requireSession.js';

export const driverRouter = Router();

driverRouter.use(requireSession, requireRole('driver'));

const DRIVER_FEE_RATE = 0.15;

function formatOrderSummary(doc: Record<string, unknown>) {
  const items = doc.items as {name: string; quantity: number}[];
  return {
    id: doc.orderId as string,
    restaurant: 'Street Chef',
    pickup: 'Street Chef Kitchen, Cape Town',
    dropoff: 'Customer delivery address',
    distance: '2.5 km',
    time: '15 min',
    earnings: Math.round((doc.total as number) * DRIVER_FEE_RATE * 100) / 100,
    rating: 4.8,
    status: doc.status as string,
    total: doc.total as number,
    items: items.map((i) => `${i.quantity}x ${i.name}`).join(', '),
    createdAt: (doc.createdAt as Date).toISOString(),
  };
}

driverRouter.get('/available', async (_req: AuthedRequest, res) => {
  try {
    const orders = await getDb()
      .collection('orders')
      .find({driverId: null, status: {$in: ['preparing', 'delivering']}})
      .sort({createdAt: -1})
      .limit(20)
      .toArray();

    res.json(orders.map((o) => formatOrderSummary(o as Record<string, unknown>)));
  } catch {
    res.status(500).json({error: 'Failed to fetch available orders'});
  }
});

driverRouter.get('/active', async (req: AuthedRequest, res) => {
  try {
    const driverId = req.sessionUser!.id;
    const order = await getDb().collection('orders').findOne({
      driverId,
      status: {$in: ['preparing', 'delivering', 'arrived']},
    });

    if (!order) {
      res.json(null);
      return;
    }

    res.json(formatOrderSummary(order as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to fetch active order'});
  }
});

driverRouter.post('/orders/:id/accept', async (req: AuthedRequest, res) => {
  try {
    const driverId = req.sessionUser!.id;
    const existing = await getDb().collection('orders').findOne({
      driverId,
      status: {$in: ['preparing', 'delivering', 'arrived']},
    });

    if (existing) {
      res.status(400).json({error: 'You already have an active delivery'});
      return;
    }

    const result = await getDb().collection('orders').findOneAndUpdate(
      {orderId: req.params.id, driverId: null},
      {$set: {driverId, status: 'delivering', updatedAt: new Date()}},
      {returnDocument: 'after'},
    );

    if (!result) {
      res.status(404).json({error: 'Order not available'});
      return;
    }

    res.json(formatOrderSummary(result as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to accept order'});
  }
});

driverRouter.patch('/orders/:id/status', async (req: AuthedRequest, res) => {
  try {
    const driverId = req.sessionUser!.id;
    const {status} = req.body as {status?: string};

    if (!status) {
      res.status(400).json({error: 'status is required'});
      return;
    }

    const result = await getDb().collection('orders').findOneAndUpdate(
      {orderId: req.params.id, driverId},
      {$set: {status, updatedAt: new Date()}},
      {returnDocument: 'after'},
    );

    if (!result) {
      res.status(404).json({error: 'Order not found'});
      return;
    }

    res.json(formatOrderSummary(result as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to update order'});
  }
});

driverRouter.get('/earnings', async (req: AuthedRequest, res) => {
  try {
    const driverId = req.sessionUser!.id;
    const db = getDb();

    const completed = await db
      .collection('orders')
      .find({driverId, status: 'completed'})
      .sort({updatedAt: -1})
      .toArray();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = completed.filter((o) => (o.updatedAt as Date) >= today);
    const todayEarnings = todayOrders.reduce(
      (sum, o) => sum + (o.total as number) * DRIVER_FEE_RATE,
      0,
    );
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - 7);
    const weekOrders = completed.filter((o) => (o.updatedAt as Date) >= weekStart);
    const weekEarnings = weekOrders.reduce(
      (sum, o) => sum + (o.total as number) * DRIVER_FEE_RATE,
      0,
    );

    const trips = completed.slice(0, 20).map((o) => ({
      id: o.orderId as string,
      date: (o.updatedAt as Date).toISOString(),
      amount: Math.round((o.total as number) * DRIVER_FEE_RATE * 100) / 100,
      distance: '—',
    }));

    res.json({
      todayEarnings: Math.round(todayEarnings * 100) / 100,
      weekEarnings: Math.round(weekEarnings * 100) / 100,
      tripCount: completed.length,
      trips,
    });
  } catch {
    res.status(500).json({error: 'Failed to fetch earnings'});
  }
});
