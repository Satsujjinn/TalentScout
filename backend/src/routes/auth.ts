import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';
import Athlete from '../models/Athlete';

const router = Router();

router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, name, password, role, sport } = req.body as {
    email: string;
    name: string;
    password: string;
    role: 'athlete' | 'recruiter';
    sport?: string;
  };
  if (!email || !name || !password || !role) {
    res.status(400).json({ message: 'Missing fields' });
    return;
  }
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409).json({ message: 'Email already registered' });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = await User.create({
    email,
    name,
    passwordHash,
    role,
    verificationToken,
  });

  if (role === 'athlete') {
    await Athlete.create({ _id: user._id, name, sport });
  }

  console.log('Email verification token for', email, ':', verificationToken);

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role, isVerified: user.isVerified } });
});

router.post('/login', async (req: Request, res: Response): Promise<void> => {
  if (process.env.DISABLE_AUTH === 'true') {
    const token = jwt.sign(
      { id: process.env.DEFAULT_USER_ID || 'test-user' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );
    res.json({
      token,
      user: {
        id: process.env.DEFAULT_USER_ID || 'test-user',
        email: 'dev@example.com',
        name: 'Dev User',
        role: 'athlete',
        isVerified: true,
      },
    });
    return;
  }
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }
  if (!user.isVerified) {
    res.status(403).json({ message: 'Email not verified' });
    return;
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', { expiresIn: '7d' });
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
});

router.post('/verify', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body as { token: string };
  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    res.status(400).json({ message: 'Invalid token' });
    return;
  }
  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();
  res.json({ message: 'Email verified' });
});

export default router;
