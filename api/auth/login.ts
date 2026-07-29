import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
import crypto from 'crypto';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  const collection = mongoose.connection.db!.collection('usuarios');

  try {
    const { email, password } = req.body;
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.status(401).json({ error: 'Credenciales invalidas' });
    }

    const token = crypto.randomBytes(32).toString('hex');

    return res.status(200).json({
      user: {
        id: user._id.toString(),
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error en el servidor' });
  } finally {
    await mongoose.disconnect();
  }
}
