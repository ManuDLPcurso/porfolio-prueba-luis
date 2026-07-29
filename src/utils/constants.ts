export const SITE_CONFIG = {
  name: 'Luis F. - Portfolio',
  title: 'Luis F. - Full Stack Developer | El Señor de los Anillos',
  description: 'Portfolio de Luis F. - Full Stack Developer. Forjado con React, Ionic, TypeScript, Supabase y GitHub.',
  url: 'https://luisf.dev',
  github: 'https://github.com/luisfetrabajo',
  linkedin: 'https://www.linkedin.com/in/',
  email: 'luisfetrabajo@gmail.com',
};

export const NAV_LINKS = [
  { path: '/', label: 'Inicio' },
  { path: '/habilidades', label: 'Habilidades' },
  { path: '/proyectos', label: 'Proyectos' },
  { path: '/sobre-mi', label: 'Sobre Mí' },
  { path: '/contacto', label: 'Contacto' },
];

export const TECH_CATEGORIES = {
  frontend: 'Frontend',
  backend: 'Backend',
  herramientas: 'Herramientas',
} as const;

export const SUPABASE_TABLES = {
  proyectos: 'proyectos',
  habilidades: 'habilidades',
  experiencia: 'experiencia',
  certificados: 'certificados',
  mensajes: 'mensajes',
  usuarios: 'usuarios',
} as const;
