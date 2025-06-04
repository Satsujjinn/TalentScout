import request from 'supertest';
import express from 'express';
import matchRoutes from '../src/routes/matches';
import Match from '../src/models/Match';

jest.mock('../src/middleware/auth', () => ({ authenticate: (_req: any, _res: any, next: any) => next() }));
jest.mock('../src/utils/token', () => ({ verifyToken: jest.fn(() => ({ id: '1' })) }));

jest.mock('../src/models/Match');

const app = express();
app.use(express.json());
app.use('/api/matches', matchRoutes);

const mockMatch = { _id: '1', athleteId: 'a1', recruiterId: 'r1', status: 'pending' };

beforeEach(() => {
  jest.resetAllMocks();
});

describe('Match routes', () => {
  it('creates a match', async () => {
    (Match.create as jest.Mock).mockResolvedValue(mockMatch);
    const res = await request(app)
      .post('/api/matches')
      .send({ athleteId: 'a1', recruiterId: 'r1' });
    expect(res.status).toBe(200);
    expect(Match.create).toHaveBeenCalledWith({ athleteId: 'a1', recruiterId: 'r1' });
    expect(res.body).toEqual(mockMatch);
  });

  it('updates a match status', async () => {
    (Match.findByIdAndUpdate as jest.Mock).mockResolvedValue({ ...mockMatch, status: 'accepted' });
    const res = await request(app)
      .patch('/api/matches/1')
      .send({ status: 'accepted' });
    expect(res.status).toBe(200);
    expect(Match.findByIdAndUpdate).toHaveBeenCalledWith('1', { status: 'accepted' }, { new: true });
  });

  it('returns 404 when updating missing match', async () => {
    (Match.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    const res = await request(app)
      .patch('/api/matches/2')
      .send({ status: 'accepted' });
    expect(res.status).toBe(404);
  });
});
