import mongoose from 'mongoose';
import User from '../src/models/User';
import Athlete from '../src/models/Athlete';
import Match from '../src/models/Match';
import Message from '../src/models/Message';
import { connect, getMongoUri } from '../src/config/database';
import bcrypt from 'bcryptjs';

jest.mock('../src/config/database', () => ({
  connect: jest.fn(() => Promise.resolve()),
  getMongoUri: jest.fn(() => 'mongodb://localhost:27017/Talent')
}));
jest.mock('../src/models/User');
jest.mock('../src/models/Athlete');
jest.mock('../src/models/Match');
jest.mock('../src/models/Message');
jest.mock('bcryptjs');

(mongoose as any).connection = { close: jest.fn() };

(User.countDocuments as jest.Mock).mockResolvedValue(0);
(Athlete.countDocuments as jest.Mock).mockResolvedValue(0);
(Match.countDocuments as jest.Mock).mockResolvedValue(0);
(Message.countDocuments as jest.Mock).mockResolvedValue(0);
(User.create as jest.Mock).mockResolvedValue({});
(Athlete.create as jest.Mock).mockResolvedValue({});
(Match.create as jest.Mock).mockResolvedValue({});
(Message.create as jest.Mock).mockResolvedValue({});
(User.findOne as jest.Mock).mockResolvedValue({ _id: '1' });

(bcrypt.hash as jest.Mock).mockResolvedValue('hash');

describe('seed script', () => {
  it('runs without throwing', async () => {
    await import('../src/seed');
  });
});
