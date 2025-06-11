import { io, Socket } from 'socket.io-client';

const useMock = !process.env.NEXT_PUBLIC_API_URL;

let socket: Socket | null = null;

export function getSocket(userId?: string, roomId?: string) {
  if (useMock) {
    // simple eventless mock
    return {
      on: () => {},
      emit: () => {},
    } as unknown as Socket;
  }
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      query: { userId, roomId },
    });
  }
  return socket;
}
