import { Router } from 'express';
import auth, { AuthRequest } from '../middleware/auth';
import User from '../models/User';

const router = Router();

router.get('/', auth, async (req: AuthRequest, res) => {
  const users = await User.find({ role: 'talent' });
  res.json(users);
});

export default router;
