import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
let app: any;

describe('auth flow', () => {
  let mongo: MongoMemoryServer;
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create({ binary: { version: '6.0.5', platform: 'linux' } });
    process.env.MONGO_URI = mongo.getUri();
    const mod = await import('../src/index');
    app = mod.default;
    await mongoose.connect(mongo.getUri());
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongo.stop();
  });

  it('registers and logs in', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'u', password: 'p', role: 'talent' });
    expect(res.body.token).toBeDefined();

    const res2 = await request(app)
      .post('/api/auth/login')
      .send({ username: 'u', password: 'p' });
    expect(res2.body.token).toBeDefined();

    const verify = await request(app)
      .post('/api/auth/verify')
      .set('Authorization', `Bearer ${res2.body.token}`);
    expect(verify.status).toBe(200);
    expect(verify.body.message).toBe('Token valid');
  });
});
