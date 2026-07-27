import { IonContent, IonPage } from "@ionic/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import TechTree from "../components/TechTree";
import GithubRepos from "../components/GithubRepos";
import { IonButton } from "@ionic/react";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <HeroSection />

        {/* Tecnologías destacadas */}
        <section className="lotr-section">
          <h2 className="lotr-title lotr-section-title">Las Armas del Developer</h2>
          <div className="lotr-divider" />
          <p className="lotr-section-subtitle">Herramientas forjadas en los mejores talleres</p>
          <TechTree />
        </section>

        {/* Últimos proyectos */}
        <section className="lotr-section" style={{ paddingBottom: "20px" }}>
          <h2 className="lotr-title lotr-section-title">Últimas Crónicas</h2>
          <div className="lotr-divider" />
          <p className="lotr-section-subtitle">Los scrolls más recientes de la comunidad</p>
          <GithubRepos limit={3} />
          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <IonButton routerLink="/projects" className="lotr-btn" style={{ textDecoration: "none" }}>
              Ver Todos los Proyectos →
            </IonButton>
          </div>
        </section>

        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
