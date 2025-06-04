import { Router } from 'express';
import Message from '../models/Message';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/:roomId', async (req, res) => {
  const messages = await Message.find({ roomId: req.params.roomId }).sort({ createdAt: 1 });
  res.json(messages);
});

export default router;
