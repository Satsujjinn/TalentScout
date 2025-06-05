import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { signToken } from '../utils/token';
import User from '../models/User';
import Athlete from '../models/Athlete';

const router = Router();

router.post('/register', async (req, res) => {
  const { email, name, password, role, sport } = req.body as {
    email: string;
    name: string;
    password: string;
    role: 'athlete' | 'recruiter';
    sport?: string;
  };

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already registered' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, name, passwordHash, role });

  if (role === 'athlete') {
    await Athlete.create({ _id: user._id, name, sport });
  }

  const token = signToken(user.id);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isSubscribed: user.isSubscribed,
    },
  });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken(user.id);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isSubscribed: user.isSubscribed,
    },
  });
});

export default router;
