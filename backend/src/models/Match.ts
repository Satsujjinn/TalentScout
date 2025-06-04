import mongoose, { Schema, Document } from 'mongoose';

export interface MatchDocument extends Document {
  athleteId: mongoose.Types.ObjectId;
  recruiterId: mongoose.Types.ObjectId;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
}

const MatchSchema = new Schema<MatchDocument>({
  athleteId: { type: Schema.Types.ObjectId, required: true },
  recruiterId: { type: Schema.Types.ObjectId, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Match || mongoose.model<MatchDocument>('Match', MatchSchema);
