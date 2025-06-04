import { Router } from 'express';
import Match from '../models/Match';

const router = Router();

router.post('/', async (req, res) => {
  const { athleteId, recruiterId } = req.body as {
    athleteId: string;
    recruiterId: string;
  };
  const match = await Match.create({ athleteId, recruiterId });
  res.json(match);
});

router.get('/athlete/:id', async (req, res) => {
  const matches = await Match.find({ athleteId: req.params.id });
  res.json(matches);
});

router.get('/recruiter/:id', async (req, res) => {
  const matches = await Match.find({ recruiterId: req.params.id });
  res.json(matches);
});

export default router;
