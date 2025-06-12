import request from 'supertest';

jest.mock('../src/models/User', () => {
  const users = [
    { username: 'alice', score: 5, role: 'talent' },
    { username: 'bob', score: 10, role: 'talent' },
    { username: 'carol', score: 7, role: 'talent' }
  ];
  return {
    __esModule: true,
    default: {
      find: async () => users
    }
  };
});

process.env.JWT_SECRET = 'testsecret';
const app = require('../src/index').default;

describe('GET /api/leaderboard', () => {
  it('returns sorted leaderboard', async () => {
    const res = await request(app).get('/api/leaderboard');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0].username).toBe('bob');
  });
});
