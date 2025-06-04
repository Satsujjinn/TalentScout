import { Router } from 'express';
import Athlete from '../models/Athlete';

const router = Router();

router.get('/', async (_req, res) => {
  const athletes = await Athlete.find();
  res.json(athletes);
});

export default router;
