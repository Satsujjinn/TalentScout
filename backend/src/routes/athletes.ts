import { Router } from 'express';
import Athlete from '../models/Athlete';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import { uploadFile } from '../../../services/media/src/s3';

const router = Router();
router.use(authenticate);

const upload = multer();

router.get('/', async (_req, res) => {
  const athletes = await Athlete.find();
  res.json(athletes);
});

router.get('/:id', async (req, res) => {
  const athlete = await Athlete.findById(req.params.id);
  if (!athlete) return res.status(404).json({ message: 'Athlete not found' });
  res.json(athlete);
});

router.put('/:id', async (req, res) => {
  const { name, sport, avatarUrl, achievements, highlightVideoUrl } = req.body as {
    name?: string;
    sport?: string;
    avatarUrl?: string;
    achievements?: string[];
    highlightVideoUrl?: string;
  };
  const athlete = await Athlete.findByIdAndUpdate(
    req.params.id,
    { name, sport, avatarUrl, achievements, highlightVideoUrl },
    { new: true }
  );
  res.json(athlete);
});

// @ts-ignore - multer typings conflict in tests
router.post('/:id/highlight', upload.single('video'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const key = `highlights/${req.params.id}/${Date.now()}_${req.file.originalname}`;
  const url = await uploadFile(key, req.file.buffer, req.file.mimetype);
  await Athlete.findByIdAndUpdate(req.params.id, { highlightVideoUrl: url });
  res.json({ url });
});

export default router;
