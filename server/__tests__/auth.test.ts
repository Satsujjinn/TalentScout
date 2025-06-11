import request from 'supertest';
// Mock the User model with a simple in-memory store so tests do not
// require a real MongoDB instance.
jest.mock('../src/models/User', () => {
  const users: any[] = [];
  return {
    __esModule: true,
    default: {
      create: async (data: any) => {
        const user = { id: String(users.length + 1), ...data };
        users.push(user);
        return user;
      },
      findOne: async (query: any) => users.find((u) => u.username === query.username) || null,
      find: async (query: any) => users.filter((u) => u.role === query.role)
    }
  };
});

jest.setTimeout(20000);

process.env.JWT_SECRET = 'testsecret';
const app = require('../src/index').default;

describe('auth flow', () => {

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
