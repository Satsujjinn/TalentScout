import request from 'supertest';
import express from 'express';
import messageRoutes from '../src/routes/messages';
import Message from '../src/models/Message';

jest.mock('../src/middleware/auth', () => ({ authenticate: (_req: any, _res: any, next: any) => next() }));
jest.mock('../src/utils/token', () => ({ verifyToken: jest.fn(() => ({ id: '1' })) }));

jest.mock('../src/models/Message');

const app = express();
app.use('/api/messages', messageRoutes);

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Message routes', () => {
  it('retrieves messages for a room', async () => {
    (Message.find as jest.Mock).mockReturnValue({ sort: jest.fn().mockResolvedValue([{ text: 'hi' }]) });
    const res = await request(app).get('/api/messages/room1');
    expect(Message.find).toHaveBeenCalledWith({ roomId: 'room1' });
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ text: 'hi' }]);
  });
});
