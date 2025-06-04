import { Server } from 'socket.io';

let io: Server | null = null;

export function initSocket(server: import('http').Server) {
  io = new Server(server, {
    cors: { origin: '*' },
  });
  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
}
