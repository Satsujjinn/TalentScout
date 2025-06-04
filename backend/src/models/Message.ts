import mongoose, { Schema, Document } from 'mongoose';

export interface MessageDocument extends Document {
  roomId: string;
  senderId: string;
  text: string;
  createdAt: Date;
}

const MessageSchema = new Schema<MessageDocument>({
  roomId: { type: String, required: true },
  senderId: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message || mongoose.model<MessageDocument>('Message', MessageSchema);
