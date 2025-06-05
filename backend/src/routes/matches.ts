import { Router } from 'express';
import Match from '../models/Match';
import User from '../models/User';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.post('/', async (req, res) => {
  const { athleteId, recruiterId } = req.body as { athleteId: string; recruiterId: string };
  const recruiter = await User.findById(recruiterId);
  if (!recruiter?.isSubscribed) {
    return res.status(402).json({ message: 'Subscription required' });
  }
  const match = await Match.create({ athleteId, recruiterId });
  res.json(match);
});

router.patch('/:id', async (req, res) => {
  const { status } = req.body as { status: 'accepted' | 'declined' };
  const match = await Match.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!match) return res.status(404).json({ message: 'Match not found' });
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

router.get('/:id', async (req, res) => {
  const match = await Match.findById(req.params.id);
  if (!match) return res.status(404).json({ message: 'Match not found' });
  res.json(match);
});

export default router;
