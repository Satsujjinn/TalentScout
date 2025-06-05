import request from 'supertest';
import express from 'express';
import paymentRoutes from '../src/routes/payments';
import User from '../src/models/User';

jest.mock('../src/middleware/auth', () => ({ authenticate: (_req: any, _res: any, next: any) => next() }));
jest.mock('../src/utils/token', () => ({ verifyToken: jest.fn(() => ({ id: '1' })) }));

jest.mock('../src/models/User');

const app = express();
app.use(express.json());
app.use('/api/payments', paymentRoutes);

describe('POST /subscribe', () => {
  it('marks user subscribed', async () => {
    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue({});
    const res = await request(app)
      .post('/api/payments/subscribe')
      .send({ userId: '1' });
    expect(res.status).toBe(200);
    expect(User.findByIdAndUpdate).toHaveBeenCalledWith('1', { isSubscribed: true });
  });
});
