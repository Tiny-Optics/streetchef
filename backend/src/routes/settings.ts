import {Router} from 'express';
import {getDb} from '../db.js';
import {requireSession, type AuthedRequest} from '../middleware/requireSession.js';

export const settingsRouter = Router();

settingsRouter.use(requireSession);

const defaultNotifications = {
  notifications: true,
  sound: false,
  vibrate: false,
  specialOffers: true,
  payments: false,
  cashback: false,
  appUpdates: true,
};

const defaultSecurity = {
  rememberPassword: true,
  faceId: false,
  biometricId: false,
};

settingsRouter.get('/', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const doc = await getDb().collection('userSettings').findOne({userId});

    res.json({
      notifications: doc?.notifications ?? defaultNotifications,
      security: doc?.security ?? defaultSecurity,
    });
  } catch {
    res.status(500).json({error: 'Failed to fetch settings'});
  }
});

settingsRouter.patch('/', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const {notifications, security} = req.body as {
      notifications?: Record<string, boolean>;
      security?: Record<string, boolean>;
    };

    const update: Record<string, unknown> = {updatedAt: new Date()};
    if (notifications) update.notifications = notifications;
    if (security) update.security = security;

    await getDb().collection('userSettings').updateOne(
      {userId},
      {$set: update, $setOnInsert: {userId, createdAt: new Date()}},
      {upsert: true},
    );

    const doc = await getDb().collection('userSettings').findOne({userId});
    res.json({
      notifications: doc?.notifications ?? defaultNotifications,
      security: doc?.security ?? defaultSecurity,
    });
  } catch {
    res.status(500).json({error: 'Failed to update settings'});
  }
});
