import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio_lotr';

let isConnected = false;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (isConnected) {
    return mongoose;
  }

  await mongoose.connect(MONGODB_URI);
  isConnected = true;

  return mongoose;
}
