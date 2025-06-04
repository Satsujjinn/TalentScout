import { Router, Request, Response } from 'express';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import User from '../models/User';

const router = Router();

router.get('/me', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.userId).select('-passwordHash');
  res.json(user);
});

export default router;
