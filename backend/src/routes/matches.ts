import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { db } from '../db';
import type { Request, Response } from 'express';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { athleteId, recruiterId } = req.body as {
    athleteId: string;
    recruiterId: string;
  };
  const match = {
    athleteId: new ObjectId(athleteId),
    recruiterId: new ObjectId(recruiterId),
    createdAt: new Date(),
  };
  await db.collection('matches').insertOne(match);
  res.json({ ok: true, match });
});

router.get('/athlete/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const matches = await db
    .collection('matches')
    .find({ athleteId: new ObjectId(id) })
    .toArray();
  res.json(matches);
});

router.get('/recruiter/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const matches = await db
    .collection('matches')
    .find({ recruiterId: new ObjectId(id) })
    .toArray();
  res.json(matches);
});

export default router;
