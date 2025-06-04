import mongoose, { Schema, Document } from 'mongoose';

export interface AthleteDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  sport?: string;
  avatarUrl?: string;
}

const AthleteSchema = new Schema<AthleteDocument>({
  name: { type: String, required: true },
  sport: { type: String },
  avatarUrl: { type: String },
});

export default mongoose.models.Athlete || mongoose.model<AthleteDocument>('Athlete', AthleteSchema);
