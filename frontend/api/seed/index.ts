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

  const { secret } = req.body;
  if (secret !== process.env.SEED_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await mongoose.connect(process.env.MONGODB_URI!);
  const db = mongoose.connection.db!;

  try {
    const usuarios = db.collection('usuarios');
    let adminUser = await usuarios.findOne({ email: 'admin@lotr.com' });
    if (!adminUser) {
      await usuarios.insertOne({
        email: 'admin@lotr.com',
        password: hashPassword('admin123'),
        role: 'admin',
        full_name: 'Admin',
        created_at: new Date(),
      });
      adminUser = await usuarios.findOne({ email: 'admin@lotr.com' });
    }

    const habilidades = db.collection('habilidades');
    const skillsCount = await habilidades.countDocuments();
    if (skillsCount === 0) {
      await habilidades.insertMany([
        { nombre: 'React', icono: '⚛️', categoria: 'frontend' },
        { nombre: 'Ionic', icono: '💠', categoria: 'frontend' },
        { nombre: 'TypeScript', icono: '📘', categoria: 'frontend' },
        { nombre: 'HTML', icono: '🌐', categoria: 'frontend' },
        { nombre: 'CSS', icono: '🎨', categoria: 'frontend' },
        { nombre: 'Tailwind', icono: '💨', categoria: 'frontend' },
        { nombre: 'MongoDB', icono: '🍃', categoria: 'backend' },
        { nombre: 'Node.js', icono: '🟢', categoria: 'backend' },
        { nombre: 'Git', icono: '📂', categoria: 'herramientas' },
        { nombre: 'GitHub', icono: '🐙', categoria: 'herramientas' },
        { nombre: 'Vercel', icono: '▲', categoria: 'herramientas' },
        { nombre: 'Figma', icono: '🎨', categoria: 'herramientas' },
        { nombre: 'VSCode', icono: '💙', categoria: 'herramientas' },
      ]);
    }

    const profiles = db.collection('profiles');
    const profileExists = await profiles.findOne({});
    if (!profileExists) {
      await profiles.insertOne({
        user_id: adminUser ? adminUser._id.toString() : null,
        email: 'admin@lotr.com',
        role: 'admin',
        bio: 'Desarrollador Full Stack',
        avatar_url: '',
        location: '',
        title: 'Developer',
        updated_at: new Date(),
      });
    }

    await db.collection('proyectos').createIndex({ destacado: 1 });
    await db.collection('proyectos').createIndex({ fecha: -1 });
    await db.collection('habilidades').createIndex({ categoria: 1 });
    await db.collection('mensajes').createIndex({ leido: 1 });
    await usuarios.createIndex({ email: 1 }, { unique: true });

    return res.status(200).json({ message: 'Database seeded successfully' });
  } catch {
    return res.status(500).json({ error: 'Error seeding database' });
  } finally {
    await mongoose.disconnect();
  }
}
