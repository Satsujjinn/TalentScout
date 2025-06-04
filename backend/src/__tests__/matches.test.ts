import request from 'supertest';
import express from 'express';
import matchesRouter from '../routes/matches';
import Match from '../models/Match';

jest.mock('../models/Match');

const app = express();
app.use(express.json());
app.use('/matches', matchesRouter);

describe('PATCH /matches/:id', () => {
  it('returns 404 when match not found', async () => {
    (Match.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
    const res = await request(app)
      .patch('/matches/123')
      .send({ status: 'accepted' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Match not found' });
  });
});
