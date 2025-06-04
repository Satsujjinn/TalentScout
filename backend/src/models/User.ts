import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  name: string;
  passwordHash: string;
  role: 'athlete' | 'recruiter';
}

const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['athlete', 'recruiter'], required: true }
});

export default mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
