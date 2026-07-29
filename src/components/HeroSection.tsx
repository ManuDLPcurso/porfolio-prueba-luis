import { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import TechBadge from "./TechBadge";

const HeroSection: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,162,39,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Ring icon */}
      <div
        className="animate-ring-float animate-ring-glow"
        style={{
          fontSize: "4rem",
          marginBottom: "20px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        💍
      </div>

      {/* Title */}
      <h1
        className="lotr-title animate-fade-up"
        style={{
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          marginBottom: "8px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.2s",
        }}
      >
        El Reto de Luis
      </h1>

      {/* Subtitle */}
      <p
        className="lotr-subtitle animate-fade-up"
        style={{
          fontSize: "clamp(0.8rem, 2vw, 1rem)",
          marginBottom: "16px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.4s",
        }}
      >
        Full Stack Developer
      </p>

      <div className="lotr-divider animate-fade-up" style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.5s" }} />

      {/* Description */}
      <p
        className="lotr-text animate-fade-up"
        style={{
          maxWidth: "600px",
          fontSize: "1rem",
          marginBottom: "30px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.6s",
        }}
      >
        Forjando aplicaciones modernas con las herramientas más poderosas del reino.
        Cada proyecto es una nueva aventura en el mundo del desarrollo.
      </p>

      {/* Tech badges */}
      <div
        className="animate-fade-up"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "40px",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.8s",
        }}
      >
        <TechBadge name="React" />
        <TechBadge name="Ionic" />
        <TechBadge name="Angular" />
        <TechBadge name="MongoDB" />
        <TechBadge name="Supabase" />
        <TechBadge name="GitHub" />
      </div>

      {/* CTA buttons */}
      <div
        className="animate-fade-up"
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          justifyContent: "center",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 1s",
        }}
      >
        <IonButton routerLink="/projects" className="lotr-btn lotr-btn--primary" style={{ textDecoration: "none" }}>
          Explorar Creaciones
        </IonButton>
        <IonButton routerLink="/about" className="lotr-btn" style={{ textDecoration: "none" }}>
          Conocer al Hobbit
        </IonButton>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "ring-float 2s ease-in-out infinite",
          opacity: 0.5,
          fontSize: "1.5rem",
        }}
      >
        ⌄
      </div>
    </div>
  );
};

export default HeroSection;
