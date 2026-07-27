import { IonIcon } from "@ionic/react";
import { codeSlash, phonePortrait, logoAngular, leaf, server, logoGithub } from "ionicons/icons";

interface TechItem {
  name: string;
  description: string;
  icon: string;
  lore: string;
  level: number;
  color: string;
}

const technologies: TechItem[] = [
  {
    name: "React",
    description: "Biblioteca para interfaces de usuario reactivas y componentes reutilizables.",
    icon: codeSlash,
    lore: "La Fuerza del Componente",
    level: 90,
    color: "#61dafb",
  },
  {
    name: "Ionic",
    description: "Framework híbrido para apps móviles, web y de escritorio con una sola base de código.",
    icon: phonePortrait,
    lore: "Las Herramientas de Rivendel",
    level: 88,
    color: "#3880ff",
  },
  {
    name: "Angular",
    description: "Framework completo para aplicaciones web escalables y robustas.",
    icon: logoAngular,
    lore: "Los Istari — Los Magos",
    level: 80,
    color: "#dd0031",
  },
  {
    name: "MongoDB",
    description: "Base de datos NoSQL flexible y escalable para aplicaciones modernas.",
    icon: leaf,
    lore: "Las Minas de Moria",
    level: 82,
    color: "#47a248",
  },
  {
    name: "Supabase",
    description: "Backend-as-a-Service con base de datos, auth, storage y APIs en tiempo real.",
    icon: server,
    lore: "El Palantír de Orthanc",
    level: 85,
    color: "#3ecf8e",
  },
  {
    name: "GitHub",
    description: "Plataforma de control de versiones y colaboración para desarrolladores.",
    icon: logoGithub,
    lore: "La Red del Ent",
    level: 92,
    color: "#e8e8e8",
  },
];

const TechTree: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "24px",
      }}
    >
      {technologies.map((tech, index) => (
        <div
          key={tech.name}
          className="lotr-card animate-fade-up"
          style={{ animationDelay: `${index * 0.1}s`, opacity: 0, animationFillMode: "forwards" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                background: `${tech.color}12`,
                border: `1px solid ${tech.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IonIcon icon={tech.icon} style={{ fontSize: "1.5rem", color: tech.color }} />
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "var(--lotr-gold)",
                  margin: 0,
                  fontSize: "1.1rem",
                }}
              >
                {tech.name}
              </h3>
              <span
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: tech.color,
                  fontSize: "0.7rem",
                  letterSpacing: "1px",
                  opacity: 0.8,
                }}
              >
                {tech.lore}
              </span>
            </div>
          </div>

          <p style={{ color: "#a0a0b0", fontSize: "0.85rem", lineHeight: "1.5", marginBottom: "14px" }}>
            {tech.description}
          </p>

          <div className="skill-bar">
            <div
              className="skill-bar-fill"
              style={{
                width: `${tech.level}%`,
                background: `linear-gradient(90deg, ${tech.color}60, ${tech.color})`,
              }}
            />
          </div>
          <div style={{ textAlign: "right", fontSize: "0.7rem", color: "#666", marginTop: "4px" }}>
            {tech.level}%
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechTree;
