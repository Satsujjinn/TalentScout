import { Router } from 'express';
import User from '../models/User';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.post('/subscribe', async (req, res) => {
  const { userId } = req.body as { userId: string };
  await User.findByIdAndUpdate(userId, { isSubscribed: true });
  res.json({ success: true });
});

export default router;
