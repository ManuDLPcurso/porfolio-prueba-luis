// ============================================
// PORTFOLIO LOTR - MongoDB Schema
// Ejecutar en: MongoDB Compass o mongosh
// ============================================

// Colección: usuarios
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password", "role"],
      properties: {
        email: { bsonType: "string" },
        password: { bsonType: "string" },
        role: {
          bsonType: "string",
          enum: ["admin", "authorized", "guest"],
          description: "Debe ser 'admin', 'authorized' o 'guest'"
        },
        full_name: { bsonType: "string" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

// Colección: proyectos
db.createCollection("proyectos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["titulo"],
      properties: {
        titulo: { bsonType: "string" },
        descripcion: { bsonType: "string" },
        imagen: { bsonType: "string" },
        github: { bsonType: "string" },
        demo: { bsonType: "string" },
        tecnologias: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        estado: {
          bsonType: "string",
          enum: ["en_desarrollo", "finalizado", "archivado"],
          description: "Debe ser 'en_desarrollo', 'finalizado' o 'archivado'"
        },
        fecha: { bsonType: "date" },
        destacado: { bsonType: "bool" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

// Colección: habilidades
db.createCollection("habilidades", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "categoria"],
      properties: {
        nombre: { bsonType: "string" },
        icono: { bsonType: "string" },
        categoria: {
          bsonType: "string",
          enum: ["frontend", "backend", "herramientas"],
          description: "Debe ser 'frontend', 'backend' o 'herramientas'"
        }
      }
    }
  }
});

// Colección: experiencia
db.createCollection("experiencia", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["empresa", "cargo", "fecha_inicio"],
      properties: {
        empresa: { bsonType: "string" },
        cargo: { bsonType: "string" },
        descripcion: { bsonType: "string" },
        fecha_inicio: { bsonType: "date" },
        fecha_fin: { bsonType: "date" }
      }
    }
  }
});

// Colección: certificados
db.createCollection("certificados", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["titulo", "institucion"],
      properties: {
        titulo: { bsonType: "string" },
        institucion: { bsonType: "string" },
        url: { bsonType: "string" },
        imagen: { bsonType: "string" }
      }
    }
  }
});

// Colección: mensajes
db.createCollection("mensajes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nombre", "email", "asunto", "mensaje"],
      properties: {
        nombre: { bsonType: "string" },
        email: { bsonType: "string" },
        asunto: { bsonType: "string" },
        mensaje: { bsonType: "string" },
        leido: { bsonType: "bool" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

// Colección: profiles
db.createCollection("profiles", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      properties: {
        bio: { bsonType: "string" },
        avatar_url: { bsonType: "string" },
        location: { bsonType: "string" },
        title: { bsonType: "string" },
        updated_at: { bsonType: "date" }
      }
    }
  }
});

// ============================================
// DATOS INICIALES (habilidades)
// ============================================
db.habilidades.insertMany([
  { nombre: "React", icono: "⚛️", categoria: "frontend" },
  { nombre: "Ionic", icono: "💠", categoria: "frontend" },
  { nombre: "TypeScript", icono: "📘", categoria: "frontend" },
  { nombre: "HTML", icono: "🌐", categoria: "frontend" },
  { nombre: "CSS", icono: "🎨", categoria: "frontend" },
  { nombre: "Tailwind", icono: "💨", categoria: "frontend" },
  { nombre: "MongoDB", icono: "🍃", categoria: "backend" },
  { nombre: "Node.js", icono: "🟢", categoria: "backend" },
  { nombre: "Git", icono: "📂", categoria: "herramientas" },
  { nombre: "GitHub", icono: "🐙", categoria: "herramientas" },
  { nombre: "Vercel", icono: "▲", categoria: "herramientas" },
  { nombre: "Figma", icono: "🎨", categoria: "herramientas" },
  { nombre: "VSCode", icono: "💙", categoria: "herramientas" }
]);

// ============================================
// ÍNDICES
// ============================================
db.proyectos.createIndex({ destacado: 1 });
db.proyectos.createIndex({ fecha: -1 });
db.habilidades.createIndex({ categoria: 1 });
db.mensajes.createIndex({ leido: 1 });
db.usuarios.createIndex({ email: 1 }, { unique: true });
