import { useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TechBadge from "../components/TechBadge";
import { GithubService, GithubUser } from "../services/GithubService";

const AboutPage: React.FC = () => {
  const [user, setUser] = useState<GithubUser | null>(null);

  useEffect(() => {
    GithubService.getUser().then(setUser).catch(console.error);
  }, []);

  return (
    <IonPage>
      <Header />
      <IonContent>
        <section
          className="lotr-section"
          style={{ paddingTop: "100px", minHeight: "100vh" }}
        >
          <h2 className="lotr-title lotr-section-title">El Hobbit</h2>
          <div className="lotr-divider" />
          <p className="lotr-section-subtitle">Conoce al viajero detrás del código</p>

          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Avatar */}
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <img
                src={user?.avatar_url || "https://github.githubassets.com/images/modules/logos_page/Octocat.png"}
                alt="Luis F."
                className="lotr-avatar animate-scale-in"
              />
            </div>

            {/* Name & Title */}
            <h2
              className="lotr-title"
              style={{ fontSize: "1.8rem", marginBottom: "4px" }}
            >
              {user?.name || "Luis F."}
            </h2>
            <p
              className="lotr-subtitle"
              style={{ fontSize: "0.85rem", marginBottom: "20px" }}
            >
              Full Stack Developer
            </p>

            {/* Bio */}
            <p
              className="lotr-text"
              style={{
                textAlign: "center",
                maxWidth: "550px",
                fontSize: "1rem",
                marginBottom: "30px",
              }}
            >
              {user?.bio ||
                "Desarrollador apasionado por crear aplicaciones increíbles. Cada línea de código es un paso en la travesía. Equipped con React, Ionic, Angular, MongoDB, Supabase y GitHub."}
            </p>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                width: "100%",
                maxWidth: "400px",
                marginBottom: "30px",
              }}
            >
              <div className="lotr-stat">
                <span className="lotr-stat__number">
                  {user?.public_repos || "?"}
                </span>
                <span className="lotr-stat__label">Repos</span>
              </div>
              <div className="lotr-stat">
                <span className="lotr-stat__number">
                  {user?.followers || "?"}
                </span>
                <span className="lotr-stat__label">Seguidores</span>
              </div>
              <div className="lotr-stat">
                <span className="lotr-stat__number">
                  {user?.following || "?"}
                </span>
                <span className="lotr-stat__label">Siguiendo</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div style={{ textAlign: "center", marginBottom: "30px" }}>
              <p
                className="lotr-subtitle"
                style={{ fontSize: "0.8rem", marginBottom: "12px" }}
              >
                Armas del Arsenal
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
                <TechBadge name="React" size="lg" />
                <TechBadge name="Ionic" size="lg" />
                <TechBadge name="Angular" size="lg" />
                <TechBadge name="MongoDB" size="lg" />
                <TechBadge name="Supabase" size="lg" />
                <TechBadge name="GitHub" size="lg" />
              </div>
            </div>

            {/* Links */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
              <a
                href={user?.html_url || "https://github.com/luisfetrabajo"}
                target="_blank"
                rel="noopener noreferrer"
                className="lotr-btn lotr-btn--primary"
                style={{ textDecoration: "none" }}
              >
                Ver GitHub →
              </a>
              <a
                href="mailto:luisfetrabajo@gmail.com"
                className="lotr-btn"
                style={{ textDecoration: "none" }}
              >
                Enviar Palantír 📩
              </a>
            </div>

            {/* Quote */}
            <div
              style={{
                marginTop: "50px",
                padding: "30px",
                borderLeft: "3px solid var(--lotr-gold)",
                background: "rgba(201, 162, 39, 0.03)",
                borderRadius: "0 8px 8px 0",
                maxWidth: "500px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "var(--lotr-silver)",
                  fontStyle: "italic",
                  fontSize: "0.95rem",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                "Even the smallest person can change the course of the future."
              </p>
              <p
                style={{
                  fontFamily: "'Cinzel', serif",
                  color: "var(--lotr-gold)",
                  fontSize: "0.75rem",
                  marginTop: "8px",
                  opacity: 0.7,
                }}
              >
                — Galadriel
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
