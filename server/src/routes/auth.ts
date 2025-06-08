import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

const router = Router();

router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, role });
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: 'Invalid' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Invalid' });
  const token = jwt.sign({ id: user.id }, JWT_SECRET);
  res.cookie('token', token, { httpOnly: true });
  res.json({ token });
});

router.post('/verify', (req, res) => {
  res.json({ message: 'Verification stub' });
});

export default router;
