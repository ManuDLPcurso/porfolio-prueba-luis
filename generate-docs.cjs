const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50, size: 'A4' });
const outputPath = path.join(__dirname, 'Documentacion_Monorepo_LOTR.pdf');

doc.pipe(fs.createWriteStream(outputPath));

const gold = '#c9a227';
const dark = '#1a1a2e';
const gray = '#555';

function title(text, size = 24) {
  doc.fontSize(size).fillColor(gold).font('Helvetica-Bold').text(text, { underline: true });
  doc.moveDown(0.5);
}

function subtitle(text, size = 14) {
  doc.fontSize(size).fillColor(dark).font('Helvetica-Bold').text(text);
  doc.moveDown(0.3);
}

function body(text, size = 10) {
  doc.fontSize(size).fillColor(gray).font('Helvetica').text(text);
  doc.moveDown(0.3);
}

function bullet(text) {
  doc.fontSize(10).fillColor(gray).font('Helvetica').text(`  •  ${text}`, { indent: 15 });
  doc.moveDown(0.15);
}

function code(text) {
  doc.fontSize(9).fillColor('#333').font('Courier').text(`    ${text}`, { indent: 10 });
  doc.moveDown(0.15);
}

function divider() {
  doc.moveDown(0.5);
  doc.strokeColor(gold).lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.5);
}

// ─── PORTADA ────────────────────────────────────────
doc.moveDown(6);
title('Portfolio LOTR', 32);
doc.moveDown(0.5);
doc.fontSize(14).fillColor(gray).font('Helvetica').text('Documentación del Monorepo');
doc.moveDown(0.3);
doc.fontSize(10).fillColor(gold).text('Frontend + Backend | Express + React + MongoDB');
doc.moveDown(2);
doc.fontSize(9).fillColor(gray).text('Generado: ' + new Date().toLocaleDateString('es-ES'));
doc.addPage();

// ─── 1. ESTRUCTURA ─────────────────────────────────
title('1. Estructura del Proyecto');
body('El proyecto está organizado como un monorepo con dos carpetas principales:');
doc.moveDown(0.3);

subtitle('portfolio-lotr/');
bullet('package.json          — Scripts raíz (concurrently)');
bullet('vercel.json            — Configuración de despliegue Vercel');
bullet('.gitignore');
doc.moveDown(0.3);

subtitle('portfolio-lotr/backend/');
bullet('server.ts             — Servidor Express principal (todas las rutas API)');
bullet('package.json          — Dependencias: express, mongoose, cors, formidable');
bullet('tsconfig.json         — Configuración TypeScript');
bullet('.env                  — Variables: MONGODB_URI, MONGODB_DB, SEED_SECRET');
bullet('seed-local.ts         — Script para poblar la base de datos');
bullet('test-connection.ts    — Script para probar conexión a MongoDB');
bullet('mongodb-schema.js     — Esquemas para MongoDB Compass');
doc.moveDown(0.3);

subtitle('portfolio-lotr/frontend/');
bullet('src/                  — Código fuente React + Ionic');
bullet('src/config/api.ts     — Cliente HTTP centralizado (fetch wrapper)');
bullet('src/context/          — AuthContext, ThemeContext');
bullet('src/services/         — ProjectService, SkillService, MessageService, etc.');
bullet('src/pages/            — HomePage, AdminPage, LoginPage, etc.');
bullet('src/types/            — Interfaces TypeScript');
bullet('.env                  — Variables: VITE_API_URL, VITE_GITHUB_USERNAME');
bullet('vite.config.ts        — Configuración Vite');
doc.addPage();

// ─── 2. STACK TECNOLÓGICO ─────────────────────────
title('2. Stack Tecnológico');

subtitle('Backend:');
bullet('Runtime: Node.js + TypeScript');
bullet('Framework: Express 4.18');
bullet('Base de datos: MongoDB Atlas (Mongoose 8.8)');
bullet('Auth: SHA-256 hash + token aleatorio');
bullet('Uploads: formidable (multipart/form-data)');
bullet('CORS: cors middleware');
doc.moveDown(0.3);

subtitle('Frontend:');
bullet('Framework: React 19 + Ionic 8');
bullet('Routing: react-router-dom v5');
bullet('Build: Vite 5 + TypeScript 5.9');
bullet('HTTP: Fetch nativo (apiClient centralizado)');
bullet('Animaciones: Framer Motion');
bullet('Icons: Lucide React + Ionicons');
bullet('Móvil: Capacitor 8 (Android)');
doc.addPage();

// ─── 3. SCRIPTS ────────────────────────────────────
title('3. Scripts Disponibles');

subtitle('Desde la raíz (portfolio-lotr/):');
code('npm run dev              — Arranca backend + frontend juntos');
code('npm run dev:backend      — Solo backend (Express :3000)');
code('npm run dev:frontend     — Solo frontend (Vite :5173)');
code('npm run install:all      — Instalar dependencias de ambos');
code('npm run build            — Build del frontend');
code('npm run seed             — Poblar base de datos');
code('npm run test-db          — Probar conexión MongoDB');
doc.moveDown(0.3);

subtitle('Desde backend/:');
code('npm run dev              — tsx server.ts');
code('npm run build            — tsc (compila a ./dist/)');
code('npm run start            — node dist/server.js');
doc.moveDown(0.3);

subtitle('Desde frontend/:');
code('npm run dev              — vite (dev server)');
code('npm run build            — tsc && vite build');
code('npm run preview          — vite preview');
doc.addPage();

// ─── 4. ENDPOINTS API ──────────────────────────────
title('4. Endpoints API (Backend Express)');

subtitle('Autenticación:');
code('POST   /api/auth/login        — Login (email + password)');
doc.moveDown(0.3);

subtitle('Proyectos:');
code('GET    /api/projects          — Listar todos (?featured=true, ?id=...)');
code('POST   /api/projects          — Crear proyecto');
code('PUT    /api/projects?id=X     — Actualizar proyecto');
code('DELETE /api/projects?id=X     — Eliminar proyecto');
doc.moveDown(0.3);

subtitle('Habilidades:');
code('GET    /api/skills            — Listar todas (?category=frontend)');
code('POST   /api/skills            — Crear habilidad');
code('PUT    /api/skills?id=X       — Actualizar habilidad');
code('DELETE /api/skills?id=X       — Eliminar habilidad');
doc.moveDown(0.3);

subtitle('Mensajes:');
code('GET    /api/messages          — Listar todos (?unread=true para conteo)');
code('POST   /api/messages          — Enviar mensaje (contacto)');
code('PUT    /api/messages?id=X     — Marcar como leído');
code('DELETE /api/messages?id=X     — Eliminar mensaje');
doc.moveDown(0.3);

subtitle('Perfil:');
code('GET    /api/profile           — Obtener perfil');
code('PUT    /api/profile?id=X      — Actualizar perfil');
doc.moveDown(0.3);

subtitle('Archivos:');
code('POST   /api/upload            — Subir imagen (multipart)');
code('DELETE /api/upload?fileName=X — Eliminar imagen');
doc.moveDown(0.3);

subtitle('Seed:');
code('POST   /api/seed              — Poblar DB (requiere SEED_SECRET)');
doc.addPage();

// ─── 5. BASE DE DATOS ──────────────────────────────
title('5. Base de Datos (MongoDB Atlas)');

subtitle('Base de datos: portfolio_lotr');
doc.moveDown(0.3);

subtitle('Colecciones:');
bullet('usuarios    — email (unique), password (SHA-256), role, full_name');
bullet('proyectos   — titulo, descripcion, imagen, github, demo, tecnologias[], estado, fecha, destacado');
bullet('habilidades — nombre, icono, categoria (frontend/backend/herramientas)');
bullet('mensajes    — nombre, email, asunto, mensaje, leido, created_at');
bullet('profiles    — bio, avatar_url, location, title, updated_at');
doc.moveDown(0.3);

subtitle('Índices:');
bullet('proyectos: destacado (1), fecha (-1)');
bullet('habilidades: categoria (1)');
bullet('mensajes: leido (1)');
bullet('usuarios: email (unique)');
doc.addPage();

// ─── 6. VARIABLES DE ENTORNO ───────────────────────
title('6. Variables de Entorno');

subtitle('backend/.env:');
code('MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_lotr');
code('MONGODB_DB=portfolio_lotr');
code('SEED_SECRET=tu-secreto-seguro');
code('PORT=3000');
doc.moveDown(0.3);

subtitle('frontend/.env:');
code('VITE_API_URL=http://localhost:3000/api   (desarrollo)');
code('VITE_API_URL=https://tu-backend.vercel.app/api   (producción)');
code('VITE_GITHUB_USERNAME=luisfetrabajo');
doc.addPage();

// ─── 7. AUTENTICACIÓN ──────────────────────────────
title('7. Sistema de Autenticación');

body('El login funciona así:');
bullet('1. El usuario ingresa email y contraseña en /login');
bullet('2. El frontend envía POST /api/auth/login con { email, password }');
bullet('3. El backend hashea la contraseña con SHA-256 y busca en la colección "usuarios"');
bullet('4. Si coincide, devuelve { user: { id, email }, token }');
bullet('5. El frontend guarda user y token en localStorage');
bullet('6. AuthContext carga el perfil del usuario (role: admin/authorized/guest)');
bullet('7. AdminPage solo.renderiza si isAdmin === true');
doc.moveDown(0.5);

subtitle('Credenciales por defecto (tras seed):');
code('Email:    admin@lotr.com');
code('Password: admin123');
doc.moveDown(0.5);

subtitle('Panel de Administración (/admin):');
bullet('Dashboard con estadísticas (proyectos, mensajes, skills)');
bullet('CRUD de Proyectos (crear, editar, eliminar, destacar)');
bullet('CRUD de Habilidades (crear, editar, eliminar)');
bullet('Gestión de Mensajes (ver, marcar leído, eliminar)');
bullet('Subida de imágenes para proyectos');
doc.addPage();

// ─── 8. DESPLIEGUE ─────────────────────────────────
title('8. Despliegue en Vercel');

body('El vercel.json en la raíz está configurado para desplegar el frontend:');
code('buildCommand:   "cd frontend && npm install && npm run build"');
code('outputDirectory: "frontend/dist"');
code('framework:      "vite"');
doc.moveDown(0.3);

body('Rewrites: todas las rutas van a index.html (SPA routing).');
doc.moveDown(0.3);

body('IMPORTANTE: El backend Express no puede desplegarse en Vercel (es serverless).');
body('Opciones para el backend:');
bullet('Railway.app (gratis, soporta Express)');
bullet('Render.com (gratis tier)');
bullet('Fly.io');
bullet('Cualquier VPS con Node.js');
doc.moveDown(0.3);

body('Una vez desplegado el backend, actualiza VITE_API_URL en frontend/.env');
body('con la URL del servidor backend.');
doc.addPage();

// ─── 9. COMANDOS RÁPIDOS ───────────────────────────
title('9. Guía Rápida de Inicio');

body('1. Clonar el repositorio:');
code('git clone <url>');
code('cd portfolio-lotr');
doc.moveDown(0.3);

body('2. Instalar dependencias:');
code('npm run install:all');
doc.moveDown(0.3);

body('3. Configurar variables de entorno:');
code('cp backend/.env.example backend/.env');
code('cp frontend/.env.example frontend/.env');
body('Editar backend/.env con tu URI de MongoDB Atlas');
doc.moveDown(0.3);

body('4. Poblar la base de datos:');
code('npm run seed');
doc.moveDown(0.3);

body('5. Arrancar en desarrollo:');
code('npm run dev');
body('Frontend: http://localhost:5173');
body('Backend:  http://localhost:3000');
doc.moveDown(0.3);

body('6. Login admin:');
code('URL:  http://localhost:5173/login');
code('Email: admin@lotr.com');
code('Pass:  admin123');

doc.end();
console.log(`PDF generado: ${outputPath}`);
