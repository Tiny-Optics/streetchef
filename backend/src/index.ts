import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import {toNodeHandler} from 'better-auth/node';
import {initAuth} from './auth.js';
import {connectDb} from './db.js';
import {seedDatabase} from './seed/index.js';
import {menuRouter} from './routes/menu.js';
import {addressesRouter} from './routes/addresses.js';
import {ordersRouter} from './routes/orders.js';
import {favoritesRouter} from './routes/favorites.js';
import {profileRouter} from './routes/profile.js';
import {merchantRouter} from './routes/merchant.js';
import {settingsRouter} from './routes/settings.js';
import {contentRouter} from './routes/content.js';
import {driverRouter} from './routes/driver.js';

const PORT = Number(process.env.PORT) || 4000;
const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';

async function start() {
  const db = await connectDb();
  await seedDatabase(db);
  const auth = initAuth(db);

  const app = express();

  app.use(
    cors({
      origin: frontendUrl,
      credentials: true,
    }),
  );

  app.all('/api/auth/*', toNodeHandler(auth));

  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({status: 'ok'});
  });

  app.get('/api', (_req, res) => {
    res.json({name: 'StreetChef API', version: '0.0.0'});
  });

  app.use('/api/menu', menuRouter);
  app.use('/api/addresses', addressesRouter);
  app.use('/api/orders', ordersRouter);
  app.use('/api/favorites', favoritesRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/merchant', merchantRouter);
  app.use('/api/settings', settingsRouter);
  app.use('/api/content', contentRouter);
  app.use('/api/driver', driverRouter);

  app.get('/api/payment', (_req, res) => {
    res.status(501).json({
      error: 'Payment processing is not enabled',
      message: 'Use cash on delivery or pay-on-delivery for orders.',
    });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StreetChef backend listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
