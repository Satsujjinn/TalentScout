import mongoose from 'mongoose';
import { connect } from '../src/config/database';

jest.mock('mongoose', () => ({
  __esModule: true,
  default: { connect: jest.fn() }
}));

describe('connect', () => {
  it('uses mongoose.connect with provided URI', async () => {
    const uri = 'mongodb://localhost/test';
    await connect(uri);
    expect((mongoose as any).connect).toHaveBeenCalledWith(uri);
  });
});
