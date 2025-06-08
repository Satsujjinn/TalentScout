import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

jest.setTimeout(20000);

process.env.JWT_SECRET = 'testsecret';
const app = require('../src/index').default;

describe('auth flow', () => {
  let mongo: MongoMemoryServer;
  beforeAll(async () => {
    mongo = await MongoMemoryServer.create({ binary: { version: '6.0.5' } });
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

  it('rejects invalid login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'bad', password: 'user' });
    expect(res.status).toBe(401);
  });

  it('lists talents with valid token', async () => {
    const register = await request(app)
      .post('/api/auth/register')
      .send({ username: 't', password: 'p', role: 'talent' });
    const token = register.body.token;
    const list = await request(app)
      .get('/api/talents')
      .set('Authorization', `Bearer ${token}`);
    expect(list.status).toBe(200);
  });
});
