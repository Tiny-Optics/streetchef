import {Router} from 'express';
import {ObjectId} from 'mongodb';
import {getDb} from '../db.js';
import {requireSession, type AuthedRequest} from '../middleware/requireSession.js';

export const addressesRouter = Router();

addressesRouter.use(requireSession);

addressesRouter.get('/', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const addresses = await getDb()
      .collection('addresses')
      .find({userId})
      .sort({isDefault: -1})
      .toArray();
    res.json(
      addresses.map((a) => ({
        id: a._id.toString(),
        title: a.title,
        address: a.address,
        isDefault: a.isDefault ?? false,
      })),
    );
  } catch {
    res.status(500).json({error: 'Failed to fetch addresses'});
  }
});

addressesRouter.post('/', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const {title, address, isDefault} = req.body as {
      title?: string;
      address?: string;
      isDefault?: boolean;
    };

    if (!title || !address) {
      res.status(400).json({error: 'title and address are required'});
      return;
    }

    const db = getDb();
    if (isDefault) {
      await db.collection('addresses').updateMany({userId}, {$set: {isDefault: false}});
    }

    const result = await db.collection('addresses').insertOne({
      userId,
      title,
      address,
      isDefault: isDefault ?? false,
      createdAt: new Date(),
    });

    res.status(201).json({
      id: result.insertedId.toString(),
      title,
      address,
      isDefault: isDefault ?? false,
    });
  } catch {
    res.status(500).json({error: 'Failed to create address'});
  }
});

addressesRouter.patch('/:id', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const {title, address, isDefault} = req.body as {
      title?: string;
      address?: string;
      isDefault?: boolean;
    };

    const db = getDb();
    const _id = new ObjectId(req.params.id);

    if (isDefault) {
      await db.collection('addresses').updateMany({userId}, {$set: {isDefault: false}});
    }

    await db.collection('addresses').updateOne(
      {_id, userId},
      {
        $set: {
          ...(title !== undefined && {title}),
          ...(address !== undefined && {address}),
          ...(isDefault !== undefined && {isDefault}),
        },
      },
    );

    const updated = await db.collection('addresses').findOne({_id, userId});
    if (!updated) {
      res.status(404).json({error: 'Address not found'});
      return;
    }

    res.json({
      id: updated._id.toString(),
      title: updated.title,
      address: updated.address,
      isDefault: updated.isDefault ?? false,
    });
  } catch {
    res.status(500).json({error: 'Failed to update address'});
  }
});

addressesRouter.delete('/:id', async (req: AuthedRequest, res) => {
  try {
    const userId = req.sessionUser!.id;
    const result = await getDb()
      .collection('addresses')
      .deleteOne({_id: new ObjectId(req.params.id), userId});

    if (result.deletedCount === 0) {
      res.status(404).json({error: 'Address not found'});
      return;
    }

    res.json({ok: true});
  } catch {
    res.status(500).json({error: 'Failed to delete address'});
  }
});
