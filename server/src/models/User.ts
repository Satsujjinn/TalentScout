import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  role: 'talent' | 'scout';
  isAthlete: boolean;
  isRecruiter: boolean;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['talent', 'scout'], required: true },
  isAthlete: Boolean,
  isRecruiter: Boolean
});

export default mongoose.model<IUser>('User', UserSchema);
