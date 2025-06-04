import mongoose, { Schema, Document } from 'mongoose';

export interface AthleteDocument extends Document {
  name: string;
  sport?: string;
}

const AthleteSchema = new Schema<AthleteDocument>({
  name: { type: String, required: true },
  sport: { type: String },
});

export default mongoose.models.Athlete || mongoose.model<AthleteDocument>('Athlete', AthleteSchema);
