import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await mongoose.connect(process.env.MONGODB_URI!);
  const collection = mongoose.connection.db!.collection('profiles');

  try {
    switch (req.method) {
      case 'GET': {
        const { userId } = req.query;

        if (userId) {
          const profile = await collection.findOne({ user_id: userId });
          if (!profile) {
            return res.status(200).json({ user_id: userId, role: 'guest' });
          }
          return res.status(200).json(profile);
        }

        const profile = await collection.findOne({});
        return res.status(200).json(profile);
      }

      case 'PUT': {
        const { id } = req.query;
        const { _id, ...updateData } = req.body;
        await collection.updateOne(
          { _id: new (mongoose.Types.ObjectId)(id as string) },
          { $set: { ...updateData, updated_at: new Date().toISOString() } }
        );
        const updated = await collection.findOne({ _id: new (mongoose.Types.ObjectId)(id as string) });
        return res.status(200).json(updated);
      }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  } finally {
    await mongoose.disconnect();
  }
}
