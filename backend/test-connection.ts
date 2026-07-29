import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env') });

async function testConnection() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI no está configurado');
    process.exit(1);
  }

  console.log('🔄 Conectando a MongoDB Atlas...');
  console.log(`📡 URI: ${uri.substring(0, 50)}...`);

  try {
    await mongoose.connect(uri);
    console.log('✅ Conexión exitosa');

    // Listar colecciones
    const collections = await mongoose.connection.db!.listCollections();
    console.log('\n📚 Colecciones encontradas:');
    collections.forEach(col => console.log(`   - ${col.name}`));

    // Verificar datos de habilidades
    const skills = await mongoose.connection.db!.collection('habilidades').countDocuments();
    console.log(`\n🛠️  Habilidades: ${skills}`);

    // Verificar usuario admin
    const admin = await mongoose.connection.db!.collection('usuarios').findOne({ email: 'admin@lotr.com' });
    console.log(`👤 Usuario admin: ${admin ? 'Existe' : 'No existe'}`);

    console.log('\n✅ Todo funciona correctamente');
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testConnection();
