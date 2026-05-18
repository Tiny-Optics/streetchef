import {MongoClient, Db} from 'mongodb';

const uri =
  process.env.MONGODB_URI ??
  process.env.MONGO_URI ??
  'mongodb://localhost:27017/streetchef';

if (!process.env.MONGODB_URI && process.env.MONGO_URI) {
  console.warn(
    'MONGO_URI is deprecated; rename to MONGODB_URI in backend/.env',
  );
}

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectDb(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db();
  return db;
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectDb() first.');
  }
  return db;
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
