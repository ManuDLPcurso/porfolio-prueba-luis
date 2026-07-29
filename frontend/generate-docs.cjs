const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50, size: 'A4' });
const stream = fs.createWriteStream('Documentacion_Portfolio_LOTR.pdf');
doc.pipe(stream);

// Colores
const GOLD = '#c9a227';
const DARK = '#1a1a2e';
const GRAY = '#555555';
const LIGHT_GRAY = '#f0f0f0';

// Funciones auxiliares
function addTitle(text, size = 24) {
  doc.fontSize(size).fillColor(GOLD).text(text, { align: 'center' });
  doc.moveDown(0.5);
}

function addSubtitle(text, size = 16) {
  doc.fontSize(size).fillColor(DARK).text(text);
  doc.moveDown(0.3);
}

function addParagraph(text, size = 11) {
  doc.fontSize(size).fillColor(GRAY).text(text);
  doc.moveDown(0.3);
}

function addBullet(text) {
  doc.fontSize(10).fillColor(GRAY).text(`  •  ${text}`, { indent: 20 });
}

function addSeparator() {
  doc.moveDown(0.5);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(GOLD).lineWidth(1).stroke();
  doc.moveDown(0.5);
}

function checkPage(needed = 100) {
  if (doc.y > 700 - needed) {
    doc.addPage();
  }
}

// ============ PORTADA ============
doc.moveDown(6);
addTitle('Portfolio LOTR', 36);
doc.moveDown(0.3);
doc.fontSize(14).fillColor(GRAY).text('El Señor de los Anillos - Documentación Completa', { align: 'center' });
doc.moveDown(1);
doc.fontSize(12).fillColor(DARK).text('Autor: Luis F. (luisfetrabajo)', { align: 'center' });
doc.text('Versión: 1.0.0', { align: 'center' });
doc.text('Licencia: MIT', { align: 'center' });
doc.moveDown(2);
doc.fontSize(10).fillColor(GRAY).text('Generado: Julio 2026', { align: 'center' });

// ============ ÍNDICE ============
doc.addPage();
addTitle('Índice', 22);
doc.moveDown(0.5);
const index = [
  '1. Resumen del Proyecto',
  '2. Stack Tecnológico',
  '3. Estructura de Archivos',
  '4. Configuración de Supabase',
  '5. Base de Datos - Tablas',
  '6. Row Level Security (RLS)',
  '7. Sistema de Autenticación',
  '8. Roles de Usuario',
  '9. Páginas y Rutas',
  '10. Componentes',
  '11. Servicios (Capa de Datos)',
  '12. Hooks Personalizados',
  '13. Estilos y Tema LOTR',
  '14. CI/CD - Deploy',
  '15. Cómo Usar la Autenticación',
  '16. Guía de Administración',
];
index.forEach(item => {
  doc.fontSize(11).fillColor(DARK).text(item);
  doc.moveDown(0.2);
});

// ============ 1. RESUMEN ============
doc.addPage();
addTitle('1. Resumen del Proyecto');
addParagraph('Portfolio LOTR es una aplicación web profesional de tipo portfolio personal, construida con temática de El Señor de los Anillos. Permite al desarrollador展示 sus proyectos, habilidades, experiencia y recibir mensajes de contacto.');
addParagraph('La aplicación cuenta con un panel de administración completo (CRUD) para gestionar todo el contenido, protegido por autenticación con roles.');
addSeparator();
addSubtitle('Características principales:');
addBullet('Diseño temático LOTR con animaciones y transiciones');
addBullet('Panel de administración con CRUD completo');
addBullet('Autenticación por email/contraseña con roles (admin, authorized, guest)');
addBullet('Integración con API pública de GitHub para repositorios');
addBullet('Formulario de contacto con almacenamiento en base de datos');
addBullet('Tema oscuro/claro con persistencia en localStorage');
addBullet('Diseño responsive para móviles y escritorio');
addBullet('Soporte para Android via Capacitor');

// ============ 2. STACK TECNOLÓGICO ============
doc.addPage();
addTitle('2. Stack Tecnológico');

addSubtitle('Frontend:');
addBullet('React 19.0.0 - Framework de UI');
addBullet('Ionic React ^8.5.0 - Componentes UI + integración móvil');
addBullet('React Router DOM ^5.3.4 - Enrutamiento (v5 con Switch)');
addBullet('TypeScript ~5.9.0 - Tipado estático');
addBullet('Framer Motion ^12.43.0 - Animaciones declarativas');
addBullet('Ionicons ^7.4.0 - Iconos Ionic');
addBullet('Lucide React ^1.27.0 - Iconos modernos');

addSubtitle('Backend / BaaS:');
addBullet('Supabase ^2.110.2 - Backend-as-a-Service');
addBullet('Supabase Auth - Autenticación');
addBullet('Supabase Storage - Almacenamiento de imágenes');
addBullet('PostgreSQL - Base de datos relacional');

addSubtitle('Build / Tooling:');
addBullet('Vite ^5.0.0 - Bundler y dev server');
addBullet('@vitejs/plugin-react - Plugin React');
addBullet('@vitejs/plugin-legacy - Compatibilidad navegadores legacy');
addBullet('Capacitor ^8.4.2 - Empaquetado nativo Android');

addSubtitle('Fuentes:');
addBullet('Cinzel / Cinzel Decorative - Títulos');
addBullet('Inter - Cuerpo de texto');

// ============ 3. ESTRUCTURA ============
doc.addPage();
addTitle('3. Estructura de Archivos');
const structure = `portfolio-lotr/
├── .env                    # Variables de entorno (Supabase + GitHub)
├── capacitor.config.ts     # Config Capacitor (Android)
├── index.html              # Entry point HTML
├── ionic.config.json       # Config Ionic
├── package.json            # Dependencias
├── vite.config.ts          # Config Vite
├── tsconfig.json           # Config TypeScript
├── supabase/
│   └── schema.sql          # Schema completo BD
├── src/
│   ├── main.tsx            # Entry React
│   ├── App.tsx             # Router principal
│   ├── config/
│   │   └── supabase.ts     # Cliente Supabase
│   ├── context/
│   │   ├── AuthContext.tsx  # Autenticación
│   │   └── ThemeContext.tsx # Tema oscuro/claro
│   ├── hooks/              # Hooks custom
│   ├── layouts/
│   │   └── MainLayout.tsx  # Layout principal
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── SkillsPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── LoginPage.tsx
│   │   └── admin/AdminPage.tsx
│   ├── components/         # Componentes UI
│   ├── services/           # Capa de acceso a datos
│   ├── styles/             # CSS (lotr-theme, animations)
│   ├── types/              # Interfaces TypeScript
│   └── utils/              # Constantes`;

doc.fontSize(9).fillColor(GRAY).text(structure, { lineGap: 2 });

// ============ 4. SUPABASE ============
doc.addPage();
addTitle('4. Configuración de Supabase');
addParagraph('El cliente Supabase se inicializa en src/config/supabase.ts usando variables de entorno:');
addSeparator();
addSubtitle('Variables de entorno (.env):');
addBullet('VITE_SUPABASE_URL: URL del proyecto Supabase');
addBullet('VITE_SUPABASE_PUBLISHABLE_KEY: Clave pública (anon key)');
addBullet('VITE_GITHUB_USERNAME: Usuario de GitHub para la API');
addSeparator();
addSubtitle('Conexión:');
addParagraph('const url = import.meta.env.VITE_SUPABASE_URL;');
addParagraph('const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;');
addParagraph('export const supabase = createClient(url, key);');

// ============ 5. TABLAS ============
doc.addPage();
addTitle('5. Base de Datos - Tablas');

addSubtitle('5.1 usuarios');
addParagraph('Almacena perfiles de usuario vinculados a auth.users de Supabase.');
addBullet('id: UUID (PK, FK → auth.users.id)');
addBullet('email: TEXT NOT NULL');
addBullet('role: TEXT (admin | authorized | guest)');
addBullet('full_name: TEXT');
addBullet('created_at: TIMESTAMPTZ');
addParagraph('Trigger automático: Al crear usuario en auth.users, se inserta en usuarios con rol "guest".');

checkPage();
addSubtitle('5.2 proyectos');
addParagraph('Almacena los proyectos del portfolio.');
addBullet('id: UUID (PK)');
addBullet('titulo: TEXT NOT NULL');
addBullet('descripcion: TEXT');
addBullet('imagen: TEXT (URL de imagen)');
addBullet('github: TEXT (URL del repositorio)');
addBullet('demo: TEXT (URL de demo)');
addBullet('tecnologias: TEXT[] (array de tecnologías)');
addBullet('estado: TEXT (en_desarrollo | finalizado | archivado)');
addBullet('fecha: DATE');
addBullet('destacado: BOOLEAN');
addBullet('created_at: TIMESTAMPTZ');

checkPage();
addSubtitle('5.3 habilidades');
addBullet('id: UUID (PK)');
addBullet('nombre: TEXT NOT NULL');
addBullet('icono: TEXT (emoji por defecto 🔧)');
addBullet('categoria: TEXT (frontend | backend | herramientas)');

addSubtitle('5.4 experiencia');
addBullet('id: UUID (PK)');
addBullet('empresa: TEXT NOT NULL');
addBullet('cargo: TEXT NOT NULL');
addBullet('descripcion: TEXT');
addBullet('fecha_inicio: DATE NOT NULL');
addBullet('fecha_fin: DATE (NULL = presente)');

addSubtitle('5.5 certificados');
addBullet('id: UUID (PK)');
addBullet('titulo: TEXT NOT NULL');
addBullet('institucion: TEXT NOT NULL');
addBullet('url: TEXT');
addBullet('imagen: TEXT');

checkPage();
addSubtitle('5.6 mensajes');
addParagraph('Mensajes enviados desde el formulario de contacto.');
addBullet('id: UUID (PK)');
addBullet('nombre: TEXT NOT NULL');
addBullet('email: TEXT NOT NULL');
addBullet('asunto: TEXT NOT NULL');
addBullet('mensaje: TEXT NOT NULL');
addBullet('leido: BOOLEAN (default false)');
addBullet('created_at: TIMESTAMPTZ');

// ============ 6. RLS ============
doc.addPage();
addTitle('6. Row Level Security (RLS)');
addParagraph('Todas las tablas tienen RLS habilitado. Políticas por tabla:');
addSeparator();

addSubtitle('proyectos / habilidades:');
addBullet('SELECT: Público (cualquiera puede leer)');
addBullet('INSERT/UPDATE/DELETE: Solo admin');

addSubtitle('experiencia / certificados:');
addBullet('SELECT: Admin y authorized');
addBullet('INSERT/UPDATE/DELETE: Solo admin');

addSubtitle('mensajes:');
addBullet('INSERT: Público (cualquiera puede enviar)');
addBullet('SELECT/UPDATE/DELETE: Solo admin');

addSubtitle('usuarios:');
addBullet('SELECT: Cada usuario lee su propio perfil + admin lee todos');
addBullet('UPDATE: Solo admin');

addSubtitle('Storage (bucket "projects"):');
addBullet('SELECT: Público');
addBullet('INSERT/DELETE: Solo admin');

// ============ 7. AUTENTICACIÓN ============
doc.addPage();
addTitle('7. Sistema de Autenticación');
addParagraph('La autenticación está implementada con Supabase Auth usando email y contraseña.');
addSeparator();

addSubtitle('Flujo de autenticación:');
addParagraph('1. El usuario ingresa email y contraseña en /login');
addParagraph('2. Se llama a supabase.auth.signInWithPassword()');
addParagraph('3. Supabase valida las credenciales y retorna una sesión');
addParagraph('4. El AuthContext guarda el usuario y busca su perfil en "usuarios"');
addParagraph('5. Se determina el rol (admin, authorized, guest)');
addParagraph('6. Si es admin, se redirige a /admin');
addSeparator();

addSubtitle('Archivos clave:');
addBullet('src/config/supabase.ts - Cliente Supabase');
addBullet('src/context/AuthContext.tsx - Provider de autenticación');
addBullet('src/pages/LoginPage.tsx - Formulario de login');
addSeparator();

addSubtitle('AuthContext expone:');
addBullet('user: Objeto User de Supabase');
addBullet('profile: Perfil completo de la tabla usuarios');
addBullet('role: Rol del usuario (admin | authorized | guest)');
addBullet('loading: Estado de carga');
addBullet('signIn(email, password): Función para iniciar sesión');
addBullet('signOut(): Función para cerrar sesión');
addBullet('isAdmin: Boolean - es admin?');
addBullet('isAuthorized: Boolean - es admin o authorized?');

// ============ 8. ROLES ============
doc.addPage();
addTitle('8. Roles de Usuario');

addSubtitle('admin');
addBullet('Acceso total al panel de administración');
addBullet('CRUD completo: crear, editar, eliminar proyectos, habilidades, mensajes');
addBullet('Puede subir/eliminar imágenes en Storage');
addBullet('Puede ver y gestionar todos los mensajes');
addBullet('Puede ver experiencia y certificados');

addSubtitle('authorized');
addBullet('Puede ver experiencia y certificados');
addBullet('NO puede acceder al panel de administración');
addBullet('NO puede modificar contenido');

addSubtitle('guest');
addBullet('Solo puede ver contenido público');
addBullet('Proyectos, habilidades, página principal');
addBullet('NO ve experiencia ni certificados');
addBullet('Rol por defecto al registrarse');

addSeparator();
addSubtitle('Cambio de rol:');
addParagraph('Los roles se gestionan directamente en Supabase Dashboard > Table Editor > usuarios. Solo un admin puede cambiar el rol de otro usuario ejecutando SQL:');
addParagraph("UPDATE usuarios SET role = 'admin' WHERE email = 'usuario@email.com';");

// ============ 9. PÁGINAS ============
doc.addPage();
addTitle('9. Páginas y Rutas');

const routes = [
  ['/', 'HomePage', 'Hero animado, tech stack, proyectos destacados, repos de GitHub'],
  ['/habilidades', 'SkillsPage', 'Grid de habilidades con filtro por categoría'],
  ['/proyectos', 'ProjectsPage', 'Proyectos con búsqueda, filtros y ordenamiento'],
  ['/sobre-mi', 'AboutPage', 'Perfil de GitHub, stats del desarrollador'],
  ['/contacto', 'ContactPage', 'Formulario de contacto (envía a Supabase)'],
  ['/login', 'LoginPage', 'Login de administrador (email + contraseña)'],
  ['/admin', 'AdminPage', 'Panel de control con 4 tabs (solo admin)'],
];

routes.forEach(([path, comp, desc]) => {
  checkPage(60);
  addBullet(`${path} → ${comp}`);
  doc.fontSize(9).fillColor(GRAY).text(`     ${desc}`, { indent: 30 });
  doc.moveDown(0.2);
});

addSeparator();
addSubtitle('AdminPage - Tabs:');
addBullet('Dashboard: Estadísticas generales');
addBullet('Proyectos: CRUD de proyectos');
addBullet('Habilidades: CRUD de habilidades');
addBullet('Mensajes: Ver, marcar leído, eliminar mensajes');

// ============ 10. COMPONENTES ============
doc.addPage();
addTitle('10. Componentes');

const components = [
  ['HeroSection', 'Hero animado con icono de anillo, badges de tecnología, botones CTA'],
  ['Header', 'Barra de navegación con Ionic (IonHeader/IonToolbar)'],
  ['Footer', 'Pie de página con enlaces y easter egg (5 clics = confetti)'],
  ['ProjectCard', 'Tarjeta de repositorio GitHub con info detallada'],
  ['TechBadge', 'Badge animado con icono y nombre de tecnología'],
  ['TechTree', 'Grid de tecnologías con nivel y lore LOTR'],
  ['GithubRepos', 'Lista de repos con filtro por lenguaje'],
];

components.forEach(([name, desc]) => {
  checkPage(50);
  addBullet(`${name}: ${desc}`);
});

// ============ 11. SERVICIOS ============
doc.addPage();
addTitle('11. Servicios (Capa de Datos)');

const services = [
  ['ProjectService', 'proyectos', 'getAll, getFeatured, getById, create, update, delete, toggleFeatured'],
  ['SkillService', 'habilidades', 'getAll, getByCategory, create, update, delete'],
  ['MessageService', 'mensajes', 'getAll, getUnreadCount, send, markAsRead, delete'],
  ['GithubService', 'API GitHub', 'getRepos (filtrados, sin forks), getUser'],
  ['StorageService', 'Storage', 'uploadImage, deleteImage, getPublicUrl'],
  ['ProfileService', 'profiles', 'getProfile, updateProfile'],
];

services.forEach(([name, table, methods]) => {
  checkPage(50);
  addBullet(`${name} → Tabla: ${table}`);
  doc.fontSize(9).fillColor(GRAY).text(`     Métodos: ${methods}`, { indent: 30 });
  doc.moveDown(0.3);
});

// ============ 12. HOOKS ============
doc.addPage();
addTitle('12. Hooks Personalizados');

addBullet('useScrollReveal: Detecta visibilidad de elemento (IntersectionObserver)');
addBullet('useDebounce: Retrasa un valor por tiempo determinado');
addBullet('useLocalStorage: State sincronizado con localStorage');
addBullet('useClickCounter: Cuenta clics y ejecuta callback al alcanzar umbral (easter egg)');

// ============ 13. ESTILOS ============
doc.addPage();
addTitle('13. Estilos y Tema LOTR');

addSubtitle('Paleta de colores:');
addBullet('Dorado: #c9a227');
addBullet('Plata: #c0c0c0');
addBullet('Mithril: #b4c5d4');
addBullet('Fondo oscuro: #0f0f1a');
addBullet('Fondo claro: #f5f5f5');

addSeparator();
addSubtitle('Archivos CSS:');
addBullet('lotr-theme.css (~980 líneas) - Estilos principales');
addBullet('animations.css - Keyframes y clases utilitarias');
addBullet('variables.css - Variables CSS de Ionic + tema');

addSeparator();
addSubtitle('Características visuales:');
addBullet('Tema oscuro por defecto con toggle a claro');
addBullet('Persistencia del tema en localStorage');
addBullet('Animaciones: flotación del anillo, fade-up, shimmer dorado');
addBullet('Skeleton loaders para carga de datos');
addBullet('Tarjetas con gradientes y bordes dorados');
addBullet('Nombres temáticos LOTR en secciones');

// ============ 14. CI/CD ============
doc.addPage();
addTitle('14. CI/CD - Deploy');
addParagraph('GitHub Actions automatiza el build y deploy:');
addSeparator();
addSubtitle('Trigger:');
addBullet('Push a rama main');
addBullet('Ejecución manual (workflow_dispatch)');

addSubtitle('Pipeline:');
addBullet('1. Checkout del código');
addBullet('2. Setup Node.js 20');
addBullet('3. npm ci (instalación limpia)');
addBullet('4. npm run build con secrets de Supabase');
addBullet('5. Deploy a GitHub Pages');

addSeparator();
addSubtitle('Secrets requeridos:');
addBullet('VITE_SUPABASE_URL');
addBullet('VITE_SUPABASE_PUBLISHABLE_KEY');
addBullet('VITE_GITHUB_USERNAME');

// ============ 15. GUÍA AUTENTICACIÓN ============
doc.addPage();
addTitle('15. Cómo Usar la Autenticación');

addSubtitle('Paso 1: Crear usuario en Supabase');
addParagraph('Ve a Supabase Dashboard > Authentication > Users > Add User');
addBullet('Email: tu@email.com');
addBullet('Password: tu contraseña');
addBullet('Marca "Auto Confirm Email"');

addSeparator();
addSubtitle('Paso 2: Asignar rol de admin');
addParagraph('Ve a Supabase Dashboard > SQL Editor y ejecuta:');
addParagraph("UPDATE usuarios SET role = 'admin' WHERE email = 'tu@email.com';");
addParagraph('Esto cambia el rol del usuario de "guest" a "admin".');

addSeparator();
addSubtitle('Paso 3: Iniciar sesión');
addParagraph('1. Navega a /login');
addParagraph('2. Ingresa email y contraseña');
addParagraph('3. Si las credenciales son correctas, serás redirigido a /admin');
addParagraph('4. El navbar mostrará el link "Admin" solo si eres admin');

addSeparator();
addSubtitle('Paso 4: Gestionar contenido');
addParagraph('Desde /admin puedes:');
addBullet('Crear, editar y eliminar proyectos');
addBullet('Crear, editar y eliminar habilidades');
addBullet('Ver y gestionar mensajes de contacto');
addBullet('Ver estadísticas del dashboard');

// ============ 16. GUÍA ADMIN ============
doc.addPage();
addTitle('16. Guía de Administración');

addSubtitle('Crear proyecto:');
addParagraph('1. Ve a /admin > tab Proyectos');
addParagraph('2. Haz clic en "Nuevo Proyecto"');
addParagraph('3. Completa: título, descripción, GitHub URL, demo URL');
addParagraph('4. Selecciona tecnologías y estado');
addParagraph('5. Marca como destacado si quieres que aparezca en el首页');

addSeparator();
addSubtitle('Crear habilidad:');
addParagraph('1. Ve a /admin > tab Habilidades');
addParagraph('2. Haz clic en "Nueva Habilidad"');
addParagraph('3. Ingresa nombre, icono (emoji) y categoría');

addSeparator();
addSubtitle('Gestionar mensajes:');
addParagraph('1. Ve a /admin > tab Mensajes');
addParagraph('2. Los mensajes nuevos aparecen sin leer');
addParagraph('3. Haz clic en un mensaje para verlo completo');
addParagraph('4. Marca como leído o elimínalo');

addSeparator();
addSubtitle('Subir imágenes:');
addParagraph('Las imágenes de proyectos se suben a Supabase Storage bucket "projects".');
addParagraph('Solo los admin pueden subir/eliminar archivos.');

// ============ NOTA FINAL ============
doc.addPage();
doc.moveDown(8);
addTitle('¡Proyecto Listo!', 20);
doc.moveDown(0.5);
doc.fontSize(12).fillColor(GRAY).text('La autenticación ya está implementada y funcional.', { align: 'center' });
doc.text('Solo necesitas crear tu usuario en Supabase y asignar el rol de admin.', { align: 'center' });
doc.moveDown(1);
doc.fontSize(10).fillColor(GOLD).text('Luis F. - luisfetrabajo', { align: 'center' });
doc.text('https://luisf.dev', { align: 'center' });

// Finalizar
doc.end();

stream.on('finish', () => {
  console.log('PDF generado exitosamente: Documentacion_Portfolio_LOTR.pdf');
});

stream.on('error', (err) => {
  console.error('Error al generar PDF:', err);
});
