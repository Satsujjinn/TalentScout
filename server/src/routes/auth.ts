import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid' });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret');
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

router.post('/verify', async (req, res) => {
  const token =
    req.headers.authorization?.replace('Bearer ', '') ||
    req.cookies.token;
  if (!token) return res.status(401).json({ message: 'No token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as {
      id: string;
    };

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Token valid', user });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
