import mongoose from 'mongoose';

export function getMongoUri() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<db_password>')) {
    console.warn(
      'MONGODB_URI not set or contains placeholder; using mongodb://localhost:27017/Talent'
    );
    return 'mongodb://localhost:27017/Talent';
  }
  return uri;
}

export async function connect(uri: string) {
  await mongoose.connect(uri);
  console.log('MongoDB connected');
}

export default mongoose;
