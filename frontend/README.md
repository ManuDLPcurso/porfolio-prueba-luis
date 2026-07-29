# Portfolio LOTR - Arquitectura

## Estructura

```
portfolio-lotr/
├── frontend/          # Aplicación React + Ionic
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vercel.json
│
├── backend/           # API Serverless (Vercel Functions)
│   ├── api/
│   ├── package.json
│   ├── mongodb-schema.js
│   └── vercel.json
│
└── README.md
```

## Despliegue

### Backend (Vercel)
1. Ir a [vercel.com/new](https://vercel.com/new)
2. Importar el repositorio
3. En "Root Directory", seleccionar `backend`
4. Configurar variable de entorno: `MONGODB_URI`
5. Deploy

### Frontend (Vercel)
1. Ir a [vercel.com/new](https://vercel.com/new)
2. Importar el repositorio
3. En "Root Directory", seleccionar `frontend`
4. Configurar variable de entorno: `VITE_API_URL` (URL del backend)
5. Deploy

## Variables de Entorno

### Backend
- `MONGODB_URI` - Connection string de MongoDB Atlas
- `MONGODB_DB` - Nombre de la base de datos

### Frontend
- `VITE_API_URL` - URL del backend API (ej: `https://api-tu-proyecto.vercel.app/api`)
- `VITE_GITHUB_USERNAME` - Tu usuario de GitHub
