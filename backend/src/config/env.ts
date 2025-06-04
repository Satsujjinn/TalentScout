import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  MONGODB_URI: z.string().url(),
  PORT: z.string().optional(),
});

export const env = envSchema.parse(process.env);
