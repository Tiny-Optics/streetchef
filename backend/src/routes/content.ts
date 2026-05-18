import {Router} from 'express';
import {getDb} from '../db.js';

export const contentRouter = Router();

contentRouter.get('/help', async (_req, res) => {
  try {
    const doc = await getDb().collection('content').findOne({key: 'help'});
    res.json(doc?.faqs ?? []);
  } catch {
    res.status(500).json({error: 'Failed to fetch help content'});
  }
});

contentRouter.get('/legal', async (_req, res) => {
  try {
    const doc = await getDb().collection('content').findOne({key: 'legal'});
    res.json({
      title: doc?.title ?? 'Privacy & Policy',
      effectiveDate: doc?.effectiveDate ?? 'January 2025',
      sections: doc?.sections ?? [],
    });
  } catch {
    res.status(500).json({error: 'Failed to fetch legal content'});
  }
});
