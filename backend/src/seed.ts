import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connect, getMongoUri } from './config/database';
import User from './models/User';
import Athlete from './models/Athlete';
import Match from './models/Match';
import Message from './models/Message';

dotenv.config();

async function seed() {
  const mongoUri = getMongoUri();
  await connect(mongoUri);

  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const passwordHash = await bcrypt.hash('password', 10);
    await User.create([
      { email: 'athlete@example.com', name: 'Athlete User', passwordHash, role: 'athlete' },
      { email: 'recruiter@example.com', name: 'Recruiter User', passwordHash, role: 'recruiter' }
    ]);
    console.log('Users seeded');
  }

  const athleteCount = await Athlete.countDocuments();
  if (athleteCount === 0) {
    await Athlete.create({
      _id: new mongoose.Types.ObjectId(),
      name: 'John Doe',
      sport: 'Basketball',
      achievements: ['MVP 2024']
    });
    console.log('Athletes seeded');
  }

  const matchCount = await Match.countDocuments();
  const athleteUser = await User.findOne({ role: 'athlete' });
  const recruiterUser = await User.findOne({ role: 'recruiter' });
  if (matchCount === 0 && athleteUser && recruiterUser) {
    await Match.create({
      athleteId: athleteUser._id,
      recruiterId: recruiterUser._id,
      status: 'pending'
    });
    console.log('Matches seeded');
  }

  const messageCount = await Message.countDocuments();
  if (messageCount === 0 && athleteUser && recruiterUser) {
    await Message.create({
      roomId: 'general',
      senderId: athleteUser._id.toString(),
      text: 'Welcome to TalentScout!'
    });
    console.log('Messages seeded');
  }

  await mongoose.connection.close();
}

seed().catch((err) => {
  console.error('Seed failed', err);
  mongoose.connection.close();
});
