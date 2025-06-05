import { Router } from 'express';
import Match from '../models/Match';
import User from '../models/User';
import { authenticate } from '../middleware/auth';
import { getIO } from '../socket';

const router = Router();
router.use(authenticate);

router.post('/', async (req, res) => {
  const { athleteId, recruiterId } = req.body as { athleteId: string; recruiterId: string };
  const recruiter = await User.findById(recruiterId);
  if (!recruiter?.isSubscribed) {
    return res.status(402).json({ message: 'Subscription required' });
  }
  const match = await Match.create({ athleteId, recruiterId });
  try {
    const io = getIO();
    io.to(athleteId).to(recruiterId).emit('match', match);
  } catch {
    // socket server not initialized (e.g., during tests)
  }
  res.json(match);
});

router.patch('/:id', async (req, res) => {
  const { status } = req.body as { status: 'accepted' | 'declined' };
  const match = await Match.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!match) return res.status(404).json({ message: 'Match not found' });
  try {
    const io = getIO();
    io.to(match.athleteId.toString()).to(match.recruiterId.toString()).emit('match', match);
  } catch {
    // socket server not initialized (e.g., during tests)
  }
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
