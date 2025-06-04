import { Server } from 'socket.io';
let io: Server | null = null;

export function init(server: import('http').Server) {
  io = new Server(server, { cors: { origin: '*' } });
  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket not initialized');
  return io;
}
