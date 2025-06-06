import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { init } from './socket';
import { connect, getMongoUri } from './config/database';
import authRoutes from './routes/auth';
import athleteRoutes from './routes/athletes';
import matchRoutes from './routes/matches';
import messageRoutes from './routes/messages';
import userRoutes from './routes/users';
import healthRoutes from './routes/health';
import paymentRoutes from './routes/payments';

dotenv.config();

const app = express();
const httpServer = createServer(app);
init(httpServer);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/athletes', athleteRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/payments', paymentRoutes);

const mongoUri = getMongoUri();
connect(mongoUri)
  .then(() => console.log(`MongoDB connected to ${mongoUri}`))
  .catch((err) => {
    console.error('Mongo connection failed', err);
    process.exit(1);
  });

const port = process.env.PORT || 4000;
httpServer.listen(port, () => console.log(`Server running on port ${port}`));
