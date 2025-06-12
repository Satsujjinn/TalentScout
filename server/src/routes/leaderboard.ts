import { Router } from 'express';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find({ role: 'talent' });
  const sorted = users
    .map((u: any) => ({ username: u.username, score: u.score || 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  res.json(sorted);
});

export default router;
