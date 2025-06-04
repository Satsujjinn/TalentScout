import request from 'supertest';
import express from 'express';
import athleteRoutes from '../src/routes/athletes';
import Athlete from '../src/models/Athlete';
import { uploadFile } from '../../services/media/src/s3';

jest.mock('../src/models/Athlete');
jest.mock('../../services/media/src/s3');
jest.mock('../src/middleware/auth', () => ({ authenticate: (_req: any, _res: any, next: any) => next() }));
jest.mock('../src/utils/token', () => ({ verifyToken: jest.fn(() => ({ id: '1' })) }));

const app = express();
app.use(express.json());
app.use('/api/athletes', athleteRoutes);

describe('Athlete highlight upload', () => {
  it('uploads video and stores url', async () => {
    (uploadFile as jest.Mock).mockResolvedValue('http://s3/video.mp4');
    (Athlete.findByIdAndUpdate as jest.Mock).mockResolvedValue({});
    const res = await request(app)
      .post('/api/athletes/1/highlight')
      .attach('video', Buffer.from('data'), 'video.mp4');
    expect(res.status).toBe(200);
    expect(uploadFile).toHaveBeenCalled();
    expect(Athlete.findByIdAndUpdate).toHaveBeenCalledWith('1', { highlightVideoUrl: 'http://s3/video.mp4' });
  });
});
