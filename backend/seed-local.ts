import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function seed() {
  console.log('🔄 Conectando a MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI!);
  const db = mongoose.connection.db!;
  console.log('✅ Conectado');

  // Crear usuario admin
  const usuarios = db.collection('usuarios');
  const adminExists = await usuarios.findOne({ email: 'admin@lotr.com' });
  if (!adminExists) {
    await usuarios.insertOne({
      email: 'admin@lotr.com',
      password: hashPassword('admin123'),
      role: 'admin',
      full_name: 'Admin',
      created_at: new Date(),
    });
    console.log('✅ Usuario admin creado (admin@lotr.com / admin123)');
  } else {
    console.log('ℹ️  Usuario admin ya existe');
  }

  // Insertar habilidades
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
    console.log('✅ 13 habilidades creadas');
  } else {
    console.log(`ℹ️  Ya hay ${skillsCount} habilidades`);
  }

  // Crear profile por defecto
  const profiles = db.collection('profiles');
  const profileExists = await profiles.findOne({});
  if (!profileExists) {
    await profiles.insertOne({
      bio: 'Desarrollador Full Stack',
      avatar_url: '',
      location: '',
      title: 'Developer',
      updated_at: new Date(),
    });
    console.log('✅ Profile por defecto creado');
  } else {
    console.log('ℹ️  Profile ya existe');
  }

  // Crear índices
  await db.collection('proyectos').createIndex({ destacado: 1 });
  await db.collection('proyectos').createIndex({ fecha: -1 });
  await db.collection('habilidades').createIndex({ categoria: 1 });
  await db.collection('mensajes').createIndex({ leido: 1 });
  await usuarios.createIndex({ email: 1 }, { unique: true });
  console.log('✅ Índices creados');

  console.log('\n🎉 Seed completado exitosamente');
  await mongoose.disconnect();
}

seed().catch(console.error);
