import request from 'supertest';
import express from 'express';
import healthRoutes from '../src/routes/health';

const app = express();
app.use('/api/health', healthRoutes);

describe('GET /api/health', () => {
  it('returns status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});
