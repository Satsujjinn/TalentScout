import { Server } from 'socket.io';
import Message from './models/Message';

let io: Server | null = null;

export function init(server: import('http').Server) {
  io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    const { userId, roomId } = socket.handshake.query as {
      userId?: string;
      roomId?: string;
    };
    if (userId) socket.join(userId);
    if (roomId) socket.join(roomId);

    socket.on(
      'message',
      async (msg: { roomId: string; text: string; senderId: string }) => {
        const saved = await Message.create(msg);
        io?.to(msg.roomId).emit('message', saved.toObject());
      }
    );
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket not initialized');
  return io;
}
