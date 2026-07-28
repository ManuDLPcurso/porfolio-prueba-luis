-- ============================================
-- PORTFOLIO LOTR - Supabase Schema
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ============================================

-- 1. TABLA: usuarios (gestionada por Supabase Auth)
CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'guest' CHECK (role IN ('admin', 'authorized', 'guest')),
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para crear perfil automáticamente al registrar usuario
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO usuarios (id, email, role, full_name)
  VALUES (NEW.id, NEW.email, 'guest', NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. TABLA: proyectos
CREATE TABLE IF NOT EXISTS proyectos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  imagen TEXT,
  github TEXT,
  demo TEXT,
  tecnologias TEXT[] DEFAULT '{}',
  estado TEXT NOT NULL DEFAULT 'en_desarrollo' CHECK (estado IN ('en_desarrollo', 'finalizado', 'archivado')),
  fecha DATE DEFAULT CURRENT_DATE,
  destacado BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: habilidades
CREATE TABLE IF NOT EXISTS habilidades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  icono TEXT DEFAULT '🔧',
  categoria TEXT NOT NULL DEFAULT 'frontend' CHECK (categoria IN ('frontend', 'backend', 'herramientas'))
);

-- 4. TABLA: experiencia
CREATE TABLE IF NOT EXISTS experiencia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa TEXT NOT NULL,
  cargo TEXT NOT NULL,
  descripcion TEXT,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE
);

-- 5. TABLA: certificados
CREATE TABLE IF NOT EXISTS certificados (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  institucion TEXT NOT NULL,
  url TEXT,
  imagen TEXT
);

-- 6. TABLA: mensajes (contacto)
CREATE TABLE IF NOT EXISTS mensajes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  asunto TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  leido BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Proyectos: todos pueden leer, solo admin escribe
ALTER TABLE proyectos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "proyectos_select_public" ON proyectos
  FOR SELECT USING (true);

CREATE POLICY "proyectos_insert_admin" ON proyectos
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "proyectos_update_admin" ON proyectos
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "proyectos_delete_admin" ON proyectos
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

-- Habilidades: todos pueden leer, solo admin escribe
ALTER TABLE habilidades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "habilidades_select_public" ON habilidades
  FOR SELECT USING (true);

CREATE POLICY "habilidades_insert_admin" ON habilidades
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "habilidades_update_admin" ON habilidades
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "habilidades_delete_admin" ON habilidades
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

-- Experiencia: admin y authorized pueden leer, solo admin escribe
ALTER TABLE experiencia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "experiencia_select_auth" ON experiencia
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role IN ('admin', 'authorized'))
  );

CREATE POLICY "experiencia_insert_admin" ON experiencia
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "experiencia_update_admin" ON experiencia
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "experiencia_delete_admin" ON experiencia
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

-- Certificados: admin y authorized pueden leer, solo admin escribe
ALTER TABLE certificados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "certificados_select_auth" ON certificados
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role IN ('admin', 'authorized'))
  );

CREATE POLICY "certificados_insert_admin" ON certificados
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "certificados_update_admin" ON certificados
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "certificados_delete_admin" ON certificados
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

-- Mensajes: cualquiera puede insertar, solo admin lee/borra
ALTER TABLE mensajes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "mensajes_insert_anyone" ON mensajes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "mensajes_select_admin" ON mensajes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "mensajes_update_admin" ON mensajes
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "mensajes_delete_admin" ON mensajes
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

-- Usuarios: cada usuario lee su propio perfil, admin lee todos
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "usuarios_select_own" ON usuarios
  FOR SELECT USING (id = auth.uid());

CREATE POLICY "usuarios_select_admin" ON usuarios
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "usuarios_update_admin" ON usuarios
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- STORAGE BUCKET
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "storage_select_public" ON storage.objects
  FOR SELECT USING (bucket_id = 'projects');

CREATE POLICY "storage_insert_admin" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'projects'
    AND EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "storage_delete_admin" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'projects'
    AND EXISTS (SELECT 1 FROM usuarios WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- DATOS INICIALES (habilidades)
-- ============================================
INSERT INTO habilidades (nombre, icono, categoria) VALUES
  ('React', '⚛️', 'frontend'),
  ('Ionic', '💠', 'frontend'),
  ('TypeScript', '📘', 'frontend'),
  ('HTML', '🌐', 'frontend'),
  ('CSS', '🎨', 'frontend'),
  ('Tailwind', '💨', 'frontend'),
  ('Supabase', '⚡', 'backend'),
  ('PostgreSQL', '🐘', 'backend'),
  ('Node.js', '🟢', 'backend'),
  ('Git', '📂', 'herramientas'),
  ('GitHub', '🐙', 'herramientas'),
  ('Vercel', '▲', 'herramientas'),
  ('Figma', '🎨', 'herramientas'),
  ('VSCode', '💙', 'herramientas')
ON CONFLICT DO NOTHING;
