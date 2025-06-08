import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import talentRoutes from './routes/talents';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
// cookie-parser typings are not fully compatible with the latest
// @types/express generics which causes a type error during tests.
// The middleware still functions correctly so we suppress the type check.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/talents', talentRoutes);

if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/talentsite')
    .then(() => console.log('Mongo connected'))
    .catch((err) => console.error(err));

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Server running on ${port}`));
}

export default app;
