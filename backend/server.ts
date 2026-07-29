import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import formidable from 'formidable';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ─── MongoDB Connection ───────────────────────────────────────────
async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log('✅ Conectado a MongoDB Atlas');
}

// ─── Helper ───────────────────────────────────────────────────────
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// ─── AUTH: POST /api/auth/login ───────────────────────────────────
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('usuarios');
    const { email, password } = req.body;

    const user = await collection.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    return res.status(200).json({
      user: { id: user._id.toString(), email: user.email },
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ─── PROJECTS: /api/projects ──────────────────────────────────────
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('proyectos');
    const { featured, id } = req.query;

    if (id) {
      const project = await collection.findOne({ _id: new mongoose.Types.ObjectId(id as string) });
      return res.status(200).json(project);
    }

    if (featured === 'true') {
      const projects = await collection.find({ destacado: true }).sort({ fecha: -1 }).toArray();
      return res.status(200).json(projects);
    }

    const projects = await collection.find({}).sort({ fecha: -1 }).toArray();
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/projects', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('proyectos');
    const project = { ...req.body, created_at: new Date().toISOString() };
    const result = await collection.insertOne(project);
    return res.status(201).json({ _id: result.insertedId, ...project });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/projects', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('proyectos');
    const { id } = req.query;
    const { _id, ...updateData } = req.body;
    await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(id as string) },
      { $set: updateData }
    );
    const updated = await collection.findOne({ _id: new mongoose.Types.ObjectId(id as string) });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/projects', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('proyectos');
    const { id } = req.query;
    await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id as string) });
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─── SKILLS: /api/skills ──────────────────────────────────────────
app.get('/api/skills', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('habilidades');
    const { category } = req.query;

    if (category) {
      const skills = await collection.find({ categoria: category }).sort({ nombre: 1 }).toArray();
      return res.status(200).json(skills);
    }

    const skills = await collection.find({}).sort({ categoria: 1 }).toArray();
    return res.status(200).json(skills);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/skills', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('habilidades');
    const skill = req.body;
    const result = await collection.insertOne(skill);
    return res.status(201).json({ _id: result.insertedId, ...skill });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/skills', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('habilidades');
    const { id } = req.query;
    const { _id, ...updateData } = req.body;
    await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(id as string) },
      { $set: updateData }
    );
    const updated = await collection.findOne({ _id: new mongoose.Types.ObjectId(id as string) });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/skills', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('habilidades');
    const { id } = req.query;
    await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id as string) });
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─── PROFILE: /api/profile ────────────────────────────────────────
app.get('/api/profile', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('profiles');
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
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/profile', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('profiles');
    const { id } = req.query;
    const { _id, ...updateData } = req.body;
    await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(id as string) },
      { $set: { ...updateData, updated_at: new Date().toISOString() } }
    );
    const updated = await collection.findOne({ _id: new mongoose.Types.ObjectId(id as string) });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─── MESSAGES: /api/messages ──────────────────────────────────────
app.get('/api/messages', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('mensajes');
    const { unread } = req.query;

    if (unread === 'true') {
      const count = await collection.countDocuments({ leido: false });
      return res.status(200).json({ count });
    }

    const messages = await collection.find({}).sort({ created_at: -1 }).toArray();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/messages', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('mensajes');
    const message = {
      ...req.body,
      leido: false,
      created_at: new Date().toISOString(),
    };
    const result = await collection.insertOne(message);
    return res.status(201).json({ _id: result.insertedId, ...message });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/messages', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('mensajes');
    const { id } = req.query;
    const { _id, ...updateData } = req.body;
    await collection.updateOne(
      { _id: new mongoose.Types.ObjectId(id as string) },
      { $set: updateData }
    );
    const updated = await collection.findOne({ _id: new mongoose.Types.ObjectId(id as string) });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/messages', async (req: Request, res: Response) => {
  try {
    await connectDB();
    const collection = mongoose.connection.db!.collection('mensajes');
    const { id } = req.query;
    await collection.deleteOne({ _id: new mongoose.Types.ObjectId(id as string) });
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// ─── SEED: POST /api/seed ────────────────────────────────────────
app.post('/api/seed', async (req: Request, res: Response) => {
  try {
    const { secret } = req.body;
    if (secret !== process.env.SEED_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    await connectDB();
    const db = mongoose.connection.db!;

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
  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ error: 'Error seeding database' });
  }
});

// ─── UPLOAD: /api/upload ──────────────────────────────────────────
app.post('/api/upload', async (req: Request, res: Response) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err: any, fields: any, files: any) => {
    if (err) return res.status(500).json({ error: 'Error parsing file' });

    const file = files.file;
    const bucket = (fields.bucket as string) || 'projects';
    const uploadDir = join(__dirname, 'public', 'uploads', bucket);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.originalFilename}`;
    const filePath = join(uploadDir, fileName);
    fs.copyFileSync(file.filepath, filePath);

    return res.status(200).json({
      url: `/uploads/${bucket}/${fileName}`,
      fileName,
    });
  });
});

app.delete('/api/upload', async (req: Request, res: Response) => {
  const { fileName, bucket } = req.query;
  const filePath = join(
    __dirname, 'public', 'uploads',
    (bucket as string) || 'projects',
    fileName as string
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return res.status(200).json({ success: true });
});

// ─── START SERVER ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Servidor local corriendo en http://localhost:${PORT}`);
  console.log(`📡 Endpoints disponibles:`);
  console.log(`   POST   http://localhost:${PORT}/api/auth/login`);
  console.log(`   GET    http://localhost:${PORT}/api/projects`);
  console.log(`   POST   http://localhost:${PORT}/api/projects`);
  console.log(`   PUT    http://localhost:${PORT}/api/projects?id=...`);
  console.log(`   DELETE http://localhost:${PORT}/api/projects?id=...`);
  console.log(`   GET    http://localhost:${PORT}/api/skills`);
  console.log(`   GET    http://localhost:${PORT}/api/profile`);
  console.log(`   GET    http://localhost:${PORT}/api/messages`);
  console.log(`   POST   http://localhost:${PORT}/api/messages`);
  console.log(`   POST   http://localhost:${PORT}/api/seed`);
  console.log(`   POST   http://localhost:${PORT}/api/upload`);
});
