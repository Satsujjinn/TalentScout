import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { initSocket } from './socket';
import { connectDB } from './config/db';
import athleteRoutes from './routes/athletes';
import matchRoutes from './routes/matches';
import messageRoutes from './routes/messages';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import healthRoutes from './routes/health';
import Message from './models/Message';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = initSocket(httpServer);

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/athletes', athleteRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/health', healthRoutes);

const mongoUri = process.env.MONGODB_URI;
if (process.env.DISABLE_DB === 'true') {
  console.warn('Database disabled via DISABLE_DB. Skipping connection.');
} else {
  if (!mongoUri) {
    console.error(
      'Missing MONGODB_URI. Create a backend/.env file based on backend/.env.example.'
    );
    process.exit(1);
  }
  connectDB(mongoUri);
}

httpServer.listen(process.env.PORT || 4000, () => {
  console.log('Server running');
});

io.on('connection', (socket) => {
  const { roomId, userId } = socket.handshake.query as {
    roomId?: string;
    userId?: string;
  };

  if (roomId) socket.join(roomId);
  if (userId) socket.join(userId);

  socket.on('message', async (data: { roomId: string; text: string; senderId: string }) => {
    io.to(data.roomId).emit('message', data);
    try {
      await Message.create(data);
    } catch (err) {
      console.error('Failed to save message', err);
    }
  });
});
