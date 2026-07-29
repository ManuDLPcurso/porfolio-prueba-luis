# Guía de Configuración - MongoDB Atlas

## Paso 1: Crear Cuenta

1. Ir a [cloud.mongodb.com](https://cloud.mongodb.com)
2. Crear cuenta gratuita
3. Verificar email

## Paso 2: Crear Cluster

1. Click "Build a Database"
2. Seleccionar **M0 FREE** (tier gratuito)
3. Elegir región más cercana (ej: South America o US East)
4. Click "Create"

## Paso 3: Crear Usuario

1. Ir a "Database Access" (menú izquierdo)
2. Click "Add New Database User"
3. Authentication Method: **Password**
4. Username: `lotr_admin` (o el que prefieras)
5. Password: Generar una contraseña segura (guardarla)
6. Database User Privileges: **Read and write to any database**
7. Click "Add User"

## Paso 4: Configurar IP Access

1. Ir a "Network Access" (menú izquierdo)
2. Click "Add IP Address"
3. Para desarrollo: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Para producción: Agregar IPs específicas de Vercel
5. Click "Confirm"

## Paso 5: Obtener Connection String

1. Ir a "Database" (menú izquierdo)
2. Click "Connect" en tu cluster
3. Seleccionar "Connect your application"
4. Driver: **Node.js**
5. Version: **4.1 or later**
6. Copiar el connection string
7. Reemplazar `<password>` con la contraseña del usuario

Ejemplo:
```
mongodb+srv://lotr_admin:TU_CONTRASEÑA@cluster0.xxxxx.mongodb.net/portfolio_lotr?retryWrites=true&w=majority
```

## Paso 6: Configurar Backend

1. Crear archivo `backend/.env`:
```env
MONGODB_URI=mongodb+srv://lotr_admin:TU_CONTRASEÑA@cluster0.xxxxx.mongodb.net/portfolio_lotr?retryWrites=true&w=majority
MONGODB_DB=portfolio_lotr
SEED_SECRET=un-secreto-seguro-para-seed
```

## Paso 7: Ejecutar Seed

Una vez desplegado el backend, hacer POST a:
```bash
curl -X POST https://tu-backend.vercel.app/api/seed \
  -H "Content-Type: application/json" \
  -d '{"secret": "tu-secreto-seguro-para-seed"}'
```

Esto creará:
- Usuario admin: `admin@lotr.com` / `admin123`
- Habilidades iniciales
- Profile por defecto
- Índices optimizados

## Paso 8: Verificar

1. Ir a "Database" → "Browse Collections"
2. Verificar que se crearon las colecciones:
   - `usuarios`
   - `proyectos`
   - `habilidades`
   - `mensajes`
   - `profiles`

## Seguridad

- Nunca commitear el archivo `.env`
- Usar variables de entorno en Vercel
- Cambiar contraseñas periódicamente
- Revisar logs de acceso en Atlas
