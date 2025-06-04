import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { env } from './config/env';
import { connectToDatabase } from './db';
import matchesRouter from './routes/matches';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

app.use('/api/matches', matchesRouter);

io.on('connection', (socket) => {
  const { roomId, userId } = socket.handshake.query as {
    roomId?: string;
    userId?: string;
  };
  if (userId) {
    socket.join(userId);
  }
  if (roomId) {
    socket.join(roomId);
  }

  socket.on('message', (data: { roomId: string; text: string; senderId: string }) => {
    io.to(data.roomId).emit('message', data);
  });
});

async function start() {
  await connectToDatabase();
  httpServer.listen(env.PORT ? parseInt(env.PORT) : 4000, () => {
    console.log('Server running');
  });
}

start().catch((err) => console.error(err));
