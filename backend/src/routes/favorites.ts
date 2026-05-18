import {Router} from 'express';
import {getDb} from '../db.js';
import {requireSession, type AuthedRequest} from '../middleware/requireSession.js';

export const favoritesRouter = Router();

favoritesRouter.use(requireSession);

favoritesRouter.get('/', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const favorites = await getDb().collection('favorites').find({userId}).toArray();
    const menuIds = favorites.map((f) => f.menuItemId);
    const items =
      menuIds.length > 0
        ? await getDb()
            .collection('menuItems')
            .find({id: {$in: menuIds}})
            .toArray()
        : [];
    res.json(items);
  } catch {
    res.status(500).json({error: 'Failed to fetch favorites'});
  }
});

favoritesRouter.post('/:menuItemId', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const menuItemId = req.params.menuItemId;

    const item = await getDb().collection('menuItems').findOne({id: menuItemId});
    if (!item) {
      res.status(404).json({error: 'Menu item not found'});
      return;
    }

    await getDb()
      .collection('favorites')
      .updateOne(
        {userId, menuItemId},
        {$set: {userId, menuItemId, createdAt: new Date()}},
        {upsert: true},
      );

    res.status(201).json({ok: true, menuItemId});
  } catch {
    res.status(500).json({error: 'Failed to add favorite'});
  }
});

favoritesRouter.delete('/:menuItemId', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    await getDb().collection('favorites').deleteOne({userId, menuItemId: req.params.menuItemId});
    res.json({ok: true});
  } catch {
    res.status(500).json({error: 'Failed to remove favorite'});
  }
});
