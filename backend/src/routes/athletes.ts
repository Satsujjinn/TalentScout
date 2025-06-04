import { Router } from 'express';
import Athlete from '../models/Athlete';

const router = Router();

router.get('/', async (_req, res) => {
  const athletes = await Athlete.find();
  res.json(athletes);
});

router.get('/:id', async (req, res) => {
  const athlete = await Athlete.findById(req.params.id);
  if (!athlete) return res.status(404).json({ message: 'Athlete not found' });
  res.json(athlete);
});

router.put('/:id', async (req, res) => {
  const { name, sport, avatarUrl, achievements } = req.body as {
    name?: string;
    sport?: string;
    avatarUrl?: string;
    achievements?: string[];
  };
  const athlete = await Athlete.findByIdAndUpdate(
    req.params.id,
    { name, sport, avatarUrl, achievements },
    { new: true }
  );
  res.json(athlete);
});

export default router;
