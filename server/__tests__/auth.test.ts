import request from 'supertest';
process.env.NODE_ENV = 'test';
import app from '../src/index';
import User from '../src/models/User';

type UserType = { id: string; username: string; password: string; role: string };
const users: UserType[] = [];

jest.mock('../src/models/User', () => ({
  __esModule: true,
  default: {
    create: jest.fn(async (data: Omit<UserType, 'id'>) => {
      const user = { id: String(users.length + 1), ...data } as UserType;
      users.push(user);
      return user;
    }),
    findOne: jest.fn(async (query: Partial<UserType>) =>
      users.find((u) => u.username === query.username) || null
    ),
  },
}));

describe('auth flow', () => {
  beforeEach(() => {
    users.length = 0;
    jest.clearAllMocks();
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
