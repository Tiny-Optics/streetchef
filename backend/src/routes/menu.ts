import {Router} from 'express';
import {getDb} from '../db.js';

export const menuRouter = Router();

function formatMenuItem(doc: Record<string, unknown>) {
  const {_id, ...rest} = doc;
  return rest;
}

menuRouter.get('/', async (req, res) => {
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
    res.status(500).json({error: 'Failed to fetch menu'});
  }
});

menuRouter.get('/:id', async (req, res) => {
  try {
    const item = await getDb().collection('menuItems').findOne({id: req.params.id});
    if (!item) {
      res.status(404).json({error: 'Item not found'});
      return;
    }
    res.json(formatMenuItem(item as Record<string, unknown>));
  } catch {
    res.status(500).json({error: 'Failed to fetch menu item'});
  }
});
