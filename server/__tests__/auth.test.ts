import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/index';

describe('auth flow', () => {
  let mongo: MongoMemoryServer;
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create();
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
  });
});
