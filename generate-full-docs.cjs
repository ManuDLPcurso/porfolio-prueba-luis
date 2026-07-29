const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const doc = new PDFDocument({ margin: 50, size: 'A4', bufferPages: true });
const outputPath = path.join(__dirname, 'Guia_Completa_Portfolio_LOTR.pdf');

doc.pipe(fs.createWriteStream(outputPath));

const gold = '#c9a227';
const dark = '#1a1a2e';
const gray = '#555';
const lightGray = '#888';

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

function bullet(text, indent = 15) {
  doc.fontSize(10).fillColor(gray).font('Helvetica').text(`  •  ${text}`, { indent });
  doc.moveDown(0.15);
}

function code(text, indent = 10) {
  doc.fontSize(9).fillColor('#333').font('Courier').text(`    ${text}`, { indent });
  doc.moveDown(0.15);
}

function divider() {
  doc.moveDown(0.5);
  doc.strokeColor(gold).lineWidth(1).moveTo(50, doc.y).lineTo(545, doc.y).stroke();
  doc.moveDown(0.5);
}

function newPage() {
  doc.addPage();
}

// ════════════════════════════════════════════════════════════════
// PORTADA
// ════════════════════════════════════════════════════════════════
doc.moveDown(8);
title('Portfolio LOTR', 36);
doc.moveDown(0.3);
doc.fontSize(16).fillColor(gray).font('Helvetica').text('Guia Completa del Proyecto');
doc.moveDown(0.5);
doc.fontSize(11).fillColor(gold).text('Frontend + Backend | Express + React + MongoDB');
doc.moveDown(3);
doc.fontSize(9).fillColor(lightGray).text('Documento generado automaticamente');
doc.text('Fecha: ' + new Date().toLocaleDateString('es-ES'));
doc.text('Version: 1.0.0');
newPage();

// ════════════════════════════════════════════════════════════════
// TABLA DE CONTENIDOS
// ════════════════════════════════════════════════════════════════
title('Tabla de Contenidos');
doc.moveDown(0.3);
const chapters = [
  '1. Vision General del Proyecto',
  '2. Arquitectura y Estructura',
  '3. Backend Express - Explicacion Detallada',
  '4. Base de Datos MongoDB - Tablas y Colecciones',
  '5. Sistema de Autenticacion',
  '6. Panel de Administracion (Admin)',
  '7. Frontend React - Componentes',
  '8. Flujo de Datos Completo',
  '9. Configuracion y Variables de Entorno',
  '10. Guia de Despliegue',
  '11. Posibles Mejoras',
  '12. Solucion de Problemas',
];
chapters.forEach(ch => {
  doc.fontSize(11).fillColor(dark).font('Helvetica').text(ch, { indent: 20 });
  doc.moveDown(0.2);
});
newPage();

// ════════════════════════════════════════════════════════════════
// 1. VISION GENERAL
// ════════════════════════════════════════════════════════════════
title('1. Vision General del Proyecto');
body('Portfolio LOTR es un backend y frontend para un portfolio personal con tematica "Lord of the Rings". Permite gestionar proyectos, habilidades, mensajes de contacto y un perfil de administrador.');
doc.moveDown(0.3);
subtitle('Objetivos:');
bullet('Mostrar proyectos del desarrollador con filtros y estados');
bullet('Listar habilidades/tecnologias organizadas por categoria');
bullet('Recibir mensajes de contactos通过 un formulario');
bullet('Panel de administracion para CRUD completo (Crear, Leer, Actualizar, Eliminar)');
bullet('Autenticacion basica para proteger el area de admin');
doc.moveDown(0.3);
subtitle('Stack Tecnologico:');
bullet('Backend: Node.js + Express 4.18 + TypeScript');
bullet('Base de datos: MongoDB Atlas (cloud) + Mongoose 8.8');
bullet('Frontend: React 19 + Ionic 8 + Vite 5 + TypeScript 5.9');
bullet('Animaciones: Framer Motion');
bullet('Routing: react-router-dom v5');
bullet('HTTP: Fetch nativo (apiClient centralizado)');
bullet('Movil: Capacitor 8 (Android)');
newPage();

// ════════════════════════════════════════════════════════════════
// 2. ARQUITECTURA
// ════════════════════════════════════════════════════════════════
title('2. Arquitectura y Estructura');
body('El proyecto esta organizado como un monorepo con dos carpetas principales:');
doc.moveDown(0.3);
subtitle('Estructura de carpetas:');
code('portfolio-lotr/');
code('├── package.json           Scripts raiz (concurrently)');
code('├── vercel.json            Configuracion Vercel');
code('├── backend/               Servidor Express + API REST');
code('│   ├── server.ts          Archivo principal (418 lineas)');
code('│   ├── package.json       Dependencias del backend');
code('│   ├── .env               Variables: MONGODB_URI, SEED_SECRET');
code('│   ├── seed-local.ts      Script para poblar la BD');
code('│   └── tsconfig.json      Config TypeScript');
code('└── frontend/              React + Ionic + Vite');
code('    ├── src/');
code('    │   ├── App.tsx        Router principal');
code('    │   ├── config/api.ts  Cliente HTTP centralizado');
code('    │   ├── context/       AuthContext, ThemeContext');
code('    │   ├── services/      ProjectService, SkillService, etc.');
code('    │   ├── pages/         HomePage, AdminPage, LoginPage, etc.');
code('    │   └── types/         Interfaces TypeScript');
code('    ├── .env               Variables: VITE_API_URL');
code('    └── package.json       Dependencias del frontend');
doc.moveDown(0.3);
subtitle('Comunicacion Frontend-Backend:');
code('Frontend (Vite :5173) ──fetch──> Backend (Express :3000) ──mongoose──> MongoDB Atlas');
code('                              API REST (JSON)');
newPage();

// ════════════════════════════════════════════════════════════════
// 3. BACKEND DETALLADO
// ════════════════════════════════════════════════════════════════
title('3. Backend Express - Explicacion Detallada');
subtitle('Archivo: backend/server.ts (418 lineas)');
body('Este es el corazon del backend. Contiene TODAS las rutas API en un solo archivo.');
doc.moveDown(0.3);

subtitle('3.1 Configuracion Inicial (lineas 1-35)');
bullet('Configura DNS custom (8.8.8.8, 1.1.1.1) para resolver MongoDB Atlas');
bullet('Carga variables de entorno desde .env con dotenv');
bullet('Crea la app Express con cors() y express.json()');
bullet('Define funcion connectDB() que conecta a MongoDB si no esta conectada');
bullet('Define hashPassword() que usa SHA-256 para hashear contrasenas');
doc.moveDown(0.3);

subtitle('3.2 Rutas de Autenticacion (lineas 38-60)');
code('POST /api/auth/login');
bullet('Recibe { email, password } en el body');
bullet('Busca el usuario en la coleccion "usuarios"');
bullet('Hashea la contrasena y la compara con la guardada');
bullet('Si coincide, genera un token aleatorio (32 bytes hex)');
bullet('Devuelve { user: { id, email }, token }');
bullet('Si no coincide, devuelve 401 Unauthorized');
doc.moveDown(0.3);

subtitle('3.3 Rutas de Proyectos (lineas 62-125)');
code('GET    /api/projects         Listar todos (?featured=true, ?id=...)');
code('POST   /api/projects         Crear proyecto');
code('PUT    /api/projects?id=X    Actualizar proyecto');
code('DELETE /api/projects?id=X    Eliminar proyecto');
bullet('Trabaja con la coleccion "proyectos" de MongoDB');
bullet('GET soporta filtros: ?featured=true (solo destacados), ?id=X (uno solo)');
bullet('POST agrega created_at automaticamente');
bullet('PUT usa $set para actualizar solo los campos enviados');
bullet('DELETE elimina por _id');
doc.moveDown(0.3);

subtitle('3.4 Rutas de Habilidades (lineas 127-185)');
code('GET    /api/skills           Listar todas (?category=frontend)');
code('POST   /api/skills           Crear habilidad');
code('PUT    /api/skills?id=X      Actualizar habilidad');
code('DELETE /api/skills?id=X      Eliminar habilidad');
bullet('Trabaja con la coleccion "habilidades"');
bullet('GET soporta filtro por categoria: ?category=frontend|backend|herramientas');
doc.moveDown(0.3);

subtitle('3.5 Rutas de Perfil (lineas 187-214)');
code('GET    /api/profile          Obtener perfil (?userId=X)');
code('PUT    /api/profile?id=X     Actualizar perfil');
bullet('Trabaja con la coleccion "profiles"');
bullet('GET soporta busqueda por userId para autenticacion');
bullet('Si no encuentra perfil, devuelve { role: "guest" }');
doc.moveDown(0.3);

subtitle('3.6 Rutas de Mensajes (lineas 216-288)');
code('GET    /api/messages         Listar todos (?unread=true para conteo)');
code('POST   /api/messages         Enviar mensaje (contacto)');
code('PUT    /api/messages?id=X    Marcar como leido');
code('DELETE /api/messages?id=X    Eliminar mensaje');
bullet('Trabaja con la coleccion "mensajes"');
bullet('GET con ?unread=true devuelve { count: N } (solo los no leidos)');
bullet('POST agrega leido: false y created_at automaticamente');
doc.moveDown(0.3);

subtitle('3.7 Endpoint Seed (lineas 290-355)');
code('POST /api/seed');
bullet('Requiere { secret } en el body que coincida con SEED_SECRET');
bullet('Crea usuario admin: admin@lotr.com / admin123');
bullet('Crea 13 habilidades iniciales (React, Ionic, TypeScript, etc.)');
bullet('Crea perfil admin con role: "admin"');
bullet('Crea indices en las colecciones para busquedas rapidas');
doc.moveDown(0.3);

subtitle('3.8 Upload de Archivos (lineas 357-387)');
code('POST   /api/upload           Subir imagen (multipart/form-data)');
code('DELETE /api/upload?fileName=X&bucket=Y  Eliminar imagen');
bullet('Usa formidable para parsear archivos multipart');
bullet('Guarda archivos en backend/public/uploads/{bucket}/');
bullet('Nombre unico: {timestamp}-{nombreOriginal}');
newPage();

// ════════════════════════════════════════════════════════════════
// 4. BASE DE DATOS
// ════════════════════════════════════════════════════════════════
title('4. Base de Datos MongoDB - Tablas y Colecciones');
subtitle('Base de datos: portfolio_lotr');
subtitle('Proveedor: MongoDB Atlas (cloud)');
doc.moveDown(0.3);

subtitle('4.1 Coleccion: usuarios');
body('Almacena los usuarios del sistema con credenciales de acceso.');
code('Campos:');
code('  _id          ObjectId    (automatico por MongoDB)');
code('  email        string      (unico, indexado)');
code('  password     string      (SHA-256 hasheada)');
code('  role         string      ("admin" | "authorized" | "guest")');
code('  full_name    string      (nombre completo)');
code('  created_at   Date        (fecha de creacion)');
doc.moveDown(0.2);
code('Indice: email (unique) - rapida busqueda por email en login');
code('Ejemplo: { email: "admin@lotr.com", password: "a665a45920...", role: "admin" }');
doc.moveDown(0.3);

subtitle('4.2 Coleccion: proyectos');
body('Almacena los proyectos del portfolio.');
code('Campos:');
code('  _id          ObjectId    (automatico)');
code('  titulo       string      (requerido)');
code('  descripcion  string      (descripcion del proyecto)');
code('  imagen       string|null (URL de la imagen)');
code('  github       string|null (URL del repositorio)');
code('  demo         string|null (URL de demo en vivo)');
code('  tecnologias  string[]    (array: ["React","Ionic","TypeScript"])');
code('  estado       string      ("en_desarrollo" | "finalizado" | "archivado")');
code('  fecha        string      (fecha del proyecto)');
code('  destacado    boolean     (true = aparece en home)');
code('  created_at   string      (fecha de creacion en BD)');
doc.moveDown(0.2);
code('Indices: destacado (1), fecha (-1) - ordenamiento y filtrado rapido');
code('Ejemplo:');
code('  { titulo: "Portfolio LOTR", estado: "finalizado",');
code('    destacado: true, tecnologias: ["React","Express","MongoDB"] }');
doc.moveDown(0.3);

subtitle('4.3 Coleccion: habilidades');
body('Almacena las tecnologias/habilidades del desarrollador.');
code('Campos:');
code('  _id          ObjectId    (automatico)');
code('  nombre       string      (requerido: "React", "Node.js", etc.)');
code('  icono        string      (emoji: "⚛️", "🟢", "📘", etc.)');
code('  categoria    string      ("frontend" | "backend" | "herramientas")');
doc.moveDown(0.2);
code('Indice: categoria (1) - filtrado rapido por categoria');
code('Ejemplo: { nombre: "React", icono: "⚛️", categoria: "frontend" }');
doc.moveDown(0.3);

subtitle('4.4 Coleccion: mensajes');
body('Almacena los mensajes enviados desde el formulario de contacto.');
code('Campos:');
code('  _id          ObjectId    (automatico)');
code('  nombre       string      (nombre del remitente)');
code('  email        string      (email del remitente)');
code('  asunto       string      (asunto del mensaje)');
code('  mensaje      string      (contenido del mensaje)');
code('  leido        boolean     (true = ya fue visto por admin)');
code('  created_at   string      (fecha de envio)');
doc.moveDown(0.2);
code('Indice: leido (1) - conteo rapido de mensajes no leidos');
code('Ejemplo: { nombre: "Juan", email: "juan@mail.com",');
code('  asunto: "Consulta", leido: false }');
doc.moveDown(0.3);

subtitle('4.5 Coleccion: profiles');
body('Almacena el perfil del administrador/usuario.');
code('Campos:');
code('  _id          ObjectId    (automatico)');
code('  user_id      string      (referencia al _id de usuarios)');
code('  email        string      (email del usuario)');
code('  role         string      ("admin" | "authorized" | "guest")');
code('  bio          string      (biografia corta)');
code('  avatar_url   string      (URL de foto de perfil)');
code('  location     string      (ubicacion)');
code('  title        string      (titulo profesional)');
code('  updated_at   Date        (ultima actualizacion)');
doc.moveDown(0.2);
code('Ejemplo: { user_id: "6650a1b2...", role: "admin",');
code('  bio: "Desarrollador Full Stack", title: "Developer" }');
newPage();

// ════════════════════════════════════════════════════════════════
// 5. AUTENTICACION
// ════════════════════════════════════════════════════════════════
title('5. Sistema de Autenticacion');
subtitle('5.1 Flujo Completo de Login');
doc.moveDown(0.2);
body('Paso 1: El usuario ingresa email y password en /login');
body('Paso 2: LoginPage llama a AuthContext.signIn(email, password)');
body('Paso 3: AuthContext envia POST /api/auth/login con { email, password }');
body('Paso 4: Backend busca el usuario en coleccion "usuarios"');
body('Paso 5: Backend hashea la password con SHA-256 y compara');
body('Paso 6: Si coincide, genera token aleatorio y devuelve { user, token }');
body('Paso 7: AuthContext guarda user y token en localStorage');
body('Paso 8: AuthContext verifica si email es admin@lotr.com');
body('Paso 9: Si es admin, asigna role: "admin" directamente');
body('Paso 10: LoginPage redirige a /admin');
doc.moveDown(0.3);

subtitle('5.2 Proteccion del Panel Admin');
body('En AdminPage.tsx, la primera linea verifica:');
code('const { isAdmin } = useAuth();');
code('if (!isAdmin) return <Acceso Denegado />;');
doc.moveDown(0.2);
body('isAdmin es true solo cuando profile.role === "admin".');
body('Si el usuario no es admin, ve la pantalla "Acceso Denegado".');
doc.moveDown(0.3);

subtitle('5.3 Persistencia de Sesion');
bullet('Al hacer login, user y token se guardan en localStorage');
bullet('Al recargar la pagina, AuthContext lee localStorage');
bullet('Si hay user guardado, llama a fetchProfile para obtener el rol');
bullet('Si el email es admin@lotr.com, reasigna role: "admin"');
bullet('signOut() limpia localStorage y el estado del contexto');
doc.moveDown(0.3);

subtitle('5.4 Credenciales por Defecto (tras seed)');
code('Email:    admin@lotr.com');
code('Password: admin123');
code('Role:     admin');
newPage();

// ════════════════════════════════════════════════════════════════
// 6. PANEL ADMIN
// ════════════════════════════════════════════════════════════════
title('6. Panel de Administracion (Admin)');
subtitle('Archivo: frontend/src/pages/admin/AdminPage.tsx (404 lineas)');
doc.moveDown(0.3);

subtitle('6.1 Estructura del Admin');
body('El admin tiene 4 tabs principales:');
bullet('Dashboard - Estadisticas generales');
bullet('Proyectos - CRUD completo de proyectos');
bullet('Habilidades - CRUD de habilidades/tecnologias');
bullet('Mensajes - Ver, marcar leido, eliminar mensajes');
doc.moveDown(0.3);

subtitle('6.2 Dashboard');
body('Muestra 4 tarjetas de estadisticas:');
code('  Proyectos:     projects.length');
code('  Mensajes:      messages.length');
code('  Sin Leer:      messages.filter(m => !m.leido).length');
code('  Habilidades:   skills.length');
body('Se calculan al cargar los datos con Promise.all().');
doc.moveDown(0.3);

subtitle('6.3 Gestion de Proyectos');
body('Tabla con columnas: Titulo, Estado, Fecha, Acciones');
doc.moveDown(0.2);
body('Botones de accion por cada proyecto:');
bullet('Editar (lápiz) - Abre ProjectModal con los datos actuales');
bullet('Eliminar (X) - Pide confirmacion, luego llama ProjectService.delete()');
bullet('Destacado (ojo) - Alterna destacado con ProjectService.toggleFeatured()');
doc.moveDown(0.2);
body('ProjectModal (funcion interna):');
bullet('Campos: titulo, descripcion, GitHub URL, Demo URL, tecnologias, estado, fecha, imagen, destacado');
bullet('Las tecnologias se ingresan separadas por coma y se guardan como array');
bullet('La imagen se sube via StorageService.uploadImage() antes de guardar');
bullet('Si es edicion, pre-llena el formulario con los datos existentes');
bullet('Al guardar, llama ProjectService.create() o .update()');
doc.moveDown(0.3);

subtitle('6.4 Gestion de Habilidades');
body('Tabla con columnas: Nombre, Categoria, Acciones');
doc.moveDown(0.2);
body('SkillModal:');
bullet('Campos: nombre, icono (emoji), categoria (select)');
bullet('Categorias: frontend, backend, herramientas');
bullet('Al guardar, llama SkillService.create() o .update()');
doc.moveDown(0.3);

subtitle('6.5 Gestion de Mensajes');
body('Tabla con columnas: Nombre, Email, Asunto, Estado, Acciones');
bullet('Los mensajes no leidos se muestran con opacidad 100%');
bullet('Los leidos se muestran con opacidad 60%');
bullet('Al hacer click en ver, se marca como leido automaticamente');
bullet('MessageModal muestra el contenido completo del mensaje');
doc.moveDown(0.3);

subtitle('6.6 Modales (Componentes Internos)');
body('Hay 3 modales definidos como funciones dentro de AdminPage.tsx:');
bullet('ProjectModal - Formulario para crear/editar proyectos');
bullet('SkillModal - Formulario para crear/editar habilidades');
bullet('MessageModal - Vista de detalle de un mensaje');
body('Todos usan AnimatePresence de Framer Motion para animaciones de entrada/salida.');
newPage();

// ════════════════════════════════════════════════════════════════
// 7. FRONTEND COMPONENTES
// ════════════════════════════════════════════════════════════════
title('7. Frontend React - Componentes');
subtitle('7.1 App.tsx - Router Principal');
body('Define las rutas de la aplicacion:');
code('/              -> HomePage');
code('/habilidades   -> SkillsPage');
code('/proyectos     -> ProjectsPage');
code('/sobre-mi      -> AboutPage');
code('/contacto      -> ContactPage');
code('/login         -> LoginPage');
code('/admin         -> AdminPage');
body('Envuelve todo en ThemeProvider -> AuthProvider -> MainLayout.');
doc.moveDown(0.3);

subtitle('7.2 AuthContext - Manejo de Estado de Auth');
body('Provee: user, profile, role, isAdmin, signIn(), signOut()');
bullet('user: { id, email } o null');
bullet('profile: { role, bio, avatar_url, ... } o null');
bullet('isAdmin: true si role === "admin"');
bullet('signIn(): hace POST /auth/login, guarda en localStorage');
bullet('signOut(): limpia localStorage y estado');
doc.moveDown(0.3);

subtitle('7.3 apiClient - Cliente HTTP Centralizado');
body('Wrapper sobre fetch nativo con 4 metodos:');
code('apiClient.get<T>(endpoint)         -> fetch GET');
code('apiClient.post<T>(endpoint, data)  -> fetch POST + JSON body');
code('apiClient.put<T>(endpoint, data)   -> fetch PUT + JSON body');
code('apiClient.delete(endpoint)         -> fetch DELETE');
body('Lee la URL base de VITE_API_URL (default: /api).');
body('Todos los servicios (ProjectService, SkillService, etc.) usan apiClient.');
doc.moveDown(0.3);

subtitle('7.4 Services (Servicios HTTP)');
bullet('ProjectService - CRUD de proyectos (/api/projects)');
bullet('SkillService - CRUD de habilidades (/api/skills)');
bullet('MessageService - CRUD de mensajes (/api/messages)');
bullet('ProfileService - GET/PUT de perfil (/api/profile)');
bullet('StorageService - Upload/delete de archivos (/api/upload)');
bullet('GithubService - Consumo directo de API GitHub (no usa backend)');
doc.moveDown(0.3);

subtitle('7.5 Pages (Paginas)');
bullet('HomePage - Hero + proyectos destacados + repos de GitHub');
bullet('ProjectsPage - Lista completa de proyectos con filtros');
bullet('SkillsPage - Habilidades organizadas por categoria');
bullet('AboutPage - Info personal + repos de GitHub');
bullet('ContactPage - Formulario que envia mensajes via MessageService');
bullet('LoginPage - Formulario de login');
bullet('AdminPage - Panel de administracion CRUD');
doc.moveDown(0.3);

subtitle('7.6 Tipos (types/index.ts)');
body('Interfaces TypeScript que definen la estructura de datos:');
code('Proyecto     { id, titulo, descripcion, imagen, github, demo,');
code('               tecnologias[], estado, fecha, destacado }');
code('Habilidad    { id, nombre, icono, categoria }');
code('Mensaje      { id, nombre, email, asunto, mensaje, leido }');
code('UserProfile  { id, email, role, full_name, created_at }');
code('UserRole     = "admin" | "authorized" | "guest"');
newPage();

// ════════════════════════════════════════════════════════════════
// 8. FLUJO DE DATOS
// ════════════════════════════════════════════════════════════════
title('8. Flujo de Datos Completo');
subtitle('8.1 Flujo: Crear un Proyecto desde Admin');
code('1. AdminPage carga -> useEffect llama ProjectService.getAll()');
code('2. ProjectService -> apiClient.get("/projects")');
code('3. apiClient -> fetch("http://localhost:3000/api/projects")');
code('4. Backend: GET /api/projects -> collection.find().toArray()');
code('5. Devuelve JSON con todos los proyectos');
code('6. AdminPage renderiza la tabla con projects.map()');
code('');
code('7. Usuario hace click "Nuevo Proyecto" -> abre ProjectModal');
code('8. Llena el formulario y hace submit');
code('9. ProjectModal -> StorageService.uploadImage(file) si hay imagen');
code('10. ProjectModal -> ProjectService.create(data)');
code('11. ProjectService -> apiClient.post("/projects", data)');
code('12. Backend: POST /api/projects -> collection.insertOne(data)');
code('13. Devuelve el proyecto creado con _id');
code('14. AdminPage recarga datos con loadData()');
doc.moveDown(0.3);

subtitle('8.2 Flujo: Login y Acceso Admin');
code('1. Usuario ingresa en /login');
code('2. LoginPage -> AuthContext.signIn(email, password)');
code('3. AuthContext -> apiClient.post("/auth/login", { email, password })');
code('4. Backend: POST /api/auth/login');
code('   a. Busca usuario por email en coleccion "usuarios"');
code('   b. Hashea password con SHA-256 y compara');
code('   c. Si coincide: genera token, devuelve { user, token }');
code('5. AuthContext guarda user y token en localStorage');
code('6. AuthContext verifica: email === "admin@lotr.com" ?');
code('7. Si es admin: setProfile({ role: "admin" }) directamente');
code('8. LoginPage redirige a /admin');
code('9. AdminPage verifica isAdmin -> renderiza panel');
newPage();

// ════════════════════════════════════════════════════════════════
// 9. CONFIGURACION
// ════════════════════════════════════════════════════════════════
title('9. Configuracion y Variables de Entorno');
subtitle('9.1 backend/.env');
code('MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio_lotr');
code('MONGODB_DB=portfolio_lotr');
code('SEED_SECRET=tu-secreto-seguro');
code('PORT=3000');
doc.moveDown(0.3);

subtitle('9.2 frontend/.env');
code('VITE_API_URL=http://localhost:3000/api   (desarrollo)');
code('VITE_API_URL=https://tu-backend.vercel.app/api   (produccion)');
code('VITE_GITHUB_USERNAME=luisfetrabajo');
doc.moveDown(0.3);

subtitle('9.3 Scripts Disponibles');
code('Desde la raiz:');
code('  npm run dev              Arranca backend + frontend');
code('  npm run dev:backend      Solo backend (Express :3000)');
code('  npm run dev:frontend     Solo frontend (Vite :5173)');
code('  npm run install:all      Instalar dependencias de ambos');
code('  npm run seed             Poblar base de datos');
code('');
code('Desde backend/:');
code('  npm run dev              tsx server.ts');
code('  npm run build            tsc (compila a ./dist/)');
code('  npm run start            node dist/server.js');
code('');
code('Desde frontend/:');
code('  npm run dev              vite dev server');
code('  npm run build            tsc && vite build');
newPage();

// ════════════════════════════════════════════════════════════════
// 10. DESPLIEGUE
// ════════════════════════════════════════════════════════════════
title('10. Guia de Despliegue');
subtitle('10.1 Frontend en Vercel');
bullet('El vercel.json esta configurado en la raiz del monorepo');
bullet('buildCommand: cd frontend && npm install && npm run build');
bullet('outputDirectory: frontend/dist');
bullet('Rewrites: todas las rutas van a index.html (SPA)');
doc.moveDown(0.3);

subtitle('10.2 Backend (Hosting Separado)');
body('Express no puede desplegarse en Vercel (es serverless). Opciones:');
bullet('Railway.app - Gratis, soporta Node.js, despliegue automatico');
bullet('Render.com - Gratis tier, escala automatica');
bullet('Fly.io - Contenedores Docker, gratis tier generoso');
bullet('Cualquier VPS (DigitalOcean, AWS EC2, etc.)');
doc.moveDown(0.3);

subtitle('10.3 Pasos para Desplegar');
code('1. Clonar repositorio');
code('2. Configurar backend/.env con URI real de MongoDB Atlas');
code('3. Ejecutar npm run seed para datos iniciales');
code('4. Desplegar backend en Railway/Render');
code('5. Actualizar frontend/.env con URL del backend desplegado');
code('6. Desplegar frontend en Vercel');
code('7. Probar login en https://tu-frontend.vercel.app/login');
newPage();

// ════════════════════════════════════════════════════════════════
// 11. MEJORAS
// ════════════════════════════════════════════════════════════════
title('11. Posibles Mejoras');
subtitle('11.1 Seguridad (Prioridad Alta)');
bullet('JWT (JSON Web Tokens) en vez de tokens aleatorios en localStorage');
bullet('Middleware de autenticacion para proteger rutas PUT/DELETE');
bullet('Rate limiting para prevenir abuso de la API');
bullet('Validacion de inputs con zod o joi');
bullet('Helmet.js para headers de seguridad HTTP');
bullet('HTTPS obligatorio en produccion');
doc.moveDown(0.3);

subtitle('11.2 Backend (Prioridad Media)');
bullet('Separar rutas en archivos individuales (routes/projects.ts, etc.)');
bullet('Crear modelos Mongoose con schemas definidos (en vez de collection directa)');
bullet('Manejo de errores centralizado con middleware de error');
bullet('Logging con Winston o Pino');
bullet('Tests unitarios y de integracion con Jest/Vitest');
bullet('Documentacion de API con Swagger/OpenAPI');
bullet('Paginacion en endpoints GET que devuelven muchos datos');
doc.moveDown(0.3);

subtitle('11.3 Frontend (Prioridad Media)');
bullet('Zustand o Redux Toolkit para estado global (en vez de multiples useState)');
bullet('React Query/TanStack Query para cache de datos y revalidacion');
bullet('Formulario con react-hook-form + validacion con zod');
bullet('Lazy loading de paginas con React.lazy + Suspense');
bullet('PWA (Progressive Web App) para funcionar offline');
bullet('Storybook para documentar componentes aislados');
doc.moveDown(0.3);

subtitle('11.4 Admin Panel (Prioridad Media)');
bullet(' drag & drop para reordenar proyectos/habilidades');
bullet('Editor de texto enriquecido (TipTap, Slate) para descripciones');
bullet('Preview de imagen antes de subir');
bullet('Confirmacion con toast en vez de confirm() nativo');
bullet('Paginacion en la tabla de mensajes');
bullet('Busqueda y filtros avanzados en todas las tablas');
bullet('Exportar datos a CSV/Excel');
doc.moveDown(0.3);

subtitle('11.5 Infraestructura (Prioridad Baja)');
bullet('CI/CD con GitHub Actions (lint, test, build automatico)');
bullet('Docker para desarrollo y despliegue consistente');
bullet('Monorepo con Turborepo o Nx para gestion de dependencias');
bullet('MongoDB con Mongoose schemas e indices compuestos');
bullet('CDN para imagenes (Cloudinary, S3)');
bullet('Monitorizacion con Sentry o LogRocket');
newPage();

// ════════════════════════════════════════════════════════════════
// 12. SOLUCION DE PROBLEMAS
// ════════════════════════════════════════════════════════════════
title('12. Solucion de Problemas');
subtitle('Problema: "Acceso Denegado" despues de login');
bullet('Verificar que el email sea exactamente admin@lotr.com');
bullet('Limpiar localStorage del navegador (F12 > Application > localStorage)');
bullet('Verificar que el backend este corriendo en :3000');
bullet('Verificar que VITE_API_URL apunte al backend correcto');
doc.moveDown(0.3);

subtitle('Problema: "Error de conexion a MongoDB"');
bullet('Verificar que MONGODB_URI en backend/.env sea correcto');
bullet('Verificar que MongoDB Atlas permita conexiones desde tu IP');
bullet('Verificar que el usuario de BD tenga permisos de lectura/escritura');
bullet('Probar con: npm run test-db');
doc.moveDown(0.3);

subtitle('Problema: CORS errors en el navegador');
bullet('Verificar que el backend tenga cors() habilitado');
bullet('Verificar que el frontend apunte al puerto correcto del backend');
bullet('En desarrollo, backend debe estar en :3000 y frontend en :5173');
doc.moveDown(0.3);

subtitle('Problema: "Port already in use"');
bullet('Matar el proceso que usa el puerto: netstat -ano | findstr :3000');
bullet('O usar otro puerto: PORT=3001 npm run dev');
doc.moveDown(1);

// ════════════════════════════════════════════════════════════════
// CIERRE
// ════════════════════════════════════════════════════════════════
divider();
doc.moveDown(1);
doc.fontSize(12).fillColor(gold).font('Helvetica-Bold').text('Fin del Documento', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(9).fillColor(lightGray).font('Helvetica').text('Generado automaticamente | Portfolio LOTR v1.0.0', { align: 'center' });

doc.end();
console.log(`PDF generado: ${outputPath}`);
