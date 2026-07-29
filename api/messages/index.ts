import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await mongoose.connect(process.env.MONGODB_URI!);
  const collection = mongoose.connection.db!.collection('mensajes');

  try {
    switch (req.method) {
      case 'GET': {
        const { unread } = req.query;

        if (unread === 'true') {
          const count = await collection.countDocuments({ leido: false });
          return res.status(200).json({ count });
        }

        const messages = await collection.find({}).sort({ created_at: -1 }).toArray();
        return res.status(200).json(messages);
      }

      case 'POST': {
        const message = {
          ...req.body,
          leido: false,
          created_at: new Date().toISOString(),
        };
        const result = await collection.insertOne(message);
        return res.status(201).json({ _id: result.insertedId, ...message });
      }

      case 'PUT': {
        const { id } = req.query;
        const { _id, ...updateData } = req.body;
        await collection.updateOne(
          { _id: new (mongoose.Types.ObjectId)(id as string) },
          { $set: updateData }
        );
        const updated = await collection.findOne({ _id: new (mongoose.Types.ObjectId)(id as string) });
        return res.status(200).json(updated);
      }

      case 'DELETE': {
        const { id } = req.query;
        await collection.deleteOne({ _id: new (mongoose.Types.ObjectId)(id as string) });
        return res.status(204).end();
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
