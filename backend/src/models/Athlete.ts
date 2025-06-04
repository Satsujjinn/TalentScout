import mongoose, { Schema, Document } from 'mongoose';

export interface AthleteDocument extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  sport?: string;
  avatarUrl?: string;
  achievements?: string[];
}

const AthleteSchema = new Schema<AthleteDocument>({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  sport: { type: String },
  avatarUrl: { type: String },
  achievements: { type: [String], default: [] }
});

export default mongoose.models.Athlete || mongoose.model<AthleteDocument>('Athlete', AthleteSchema);
