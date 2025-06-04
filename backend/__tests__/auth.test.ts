import request from 'supertest';
import express from 'express';
import { authenticate } from '../src/middleware/auth';
import { verifyToken } from '../src/utils/token';

jest.mock('../src/utils/token');

const app = express();
app.get('/protected', authenticate, (_req, res) => res.json({ ok: true }));

describe('authenticate middleware', () => {
  it('returns 401 without token', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
  });

  it('allows request with valid token', async () => {
    (verifyToken as jest.Mock).mockReturnValue({ id: '1' });
    const res = await request(app)
      .get('/protected')
      .set('Authorization', 'Bearer token');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });
});
