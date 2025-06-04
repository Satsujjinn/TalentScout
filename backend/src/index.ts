import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI || '';
const client = new MongoClient(mongoUri);
let db: any;

async function init() {
  await client.connect();
  db = client.db();
  httpServer.listen(process.env.PORT || 4000, () => {
    console.log('Server running');
  });
}

init().catch((err) => console.error(err));

// Basic athletes endpoint
app.get('/api/athletes', async (_req, res) => {
  const athletes = await db.collection('athletes').find().toArray();
  res.json(athletes);
});

// Create match
app.post('/api/matches', async (req, res) => {
  const { athleteId, recruiterId } = req.body as {
    athleteId: string;
    recruiterId: string;
  };
  const match = {
    athleteId: new ObjectId(athleteId),
    recruiterId: new ObjectId(recruiterId),
    createdAt: new Date(),
  };
  await db.collection('matches').insertOne(match);
  io.to(athleteId).emit('match', match);
  io.to(recruiterId).emit('match', match);
  res.json({ ok: true, match });
});

app.get('/api/matches/athlete/:id', async (req, res) => {
  const id = req.params.id;
  const matches = await db
    .collection('matches')
    .find({ athleteId: new ObjectId(id) })
    .toArray();
  res.json(matches);
});

app.get('/api/matches/recruiter/:id', async (req, res) => {
  const id = req.params.id;
  const matches = await db
    .collection('matches')
    .find({ recruiterId: new ObjectId(id) })
    .toArray();
  res.json(matches);
});

// socket.io for chat
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
