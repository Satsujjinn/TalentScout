import mongoose from 'mongoose';

export async function connect(uri: string) {
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}

export default mongoose;
