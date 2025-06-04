import { MongoClient, Db } from 'mongodb';
import { env } from './config/env';

const client = new MongoClient(env.MONGODB_URI);
export let db: Db;

export async function connectToDatabase() {
  await client.connect();
  db = client.db();
}
