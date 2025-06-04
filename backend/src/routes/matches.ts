import { Router } from 'express';
import Match from '../models/Match';
import { getIO } from '../socket';

const router = Router();

router.post('/', async (req, res) => {
  const { athleteId, recruiterId } = req.body as {
    athleteId: string;
    recruiterId: string;
  };
  const match = await Match.create({ athleteId, recruiterId });
  try {
    const io = getIO();
    io.to(athleteId).emit('match', match);
    io.to(recruiterId).emit('match', match);
  } catch (err) {
    console.error('Socket.io not initialized', err);
  }
  res.json(match);
});

router.patch('/:id', async (req, res) => {
  const { status } = req.body as { status: 'accepted' | 'declined' };
  const match = await Match.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!match) {
    res.status(404).json({ message: 'Match not found' });
    return;
  }
  if (match) {
    try {
      const io = getIO();
      io.to(match.athleteId.toString()).emit('match', match);
      io.to(match.recruiterId.toString()).emit('match', match);
    } catch (err) {
      console.error('Socket.io not initialized', err);
    }
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
  if (!match) {
    res.status(404).json({ message: 'Match not found' });
    return;
  }
  res.json(match);
});

export default router;
