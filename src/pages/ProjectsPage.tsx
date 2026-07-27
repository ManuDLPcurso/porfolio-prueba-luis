import { IonContent, IonPage } from "@ionic/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GithubRepos from "../components/GithubRepos";

const ProjectsPage: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <section className="lotr-section" style={{ paddingTop: "100px", minHeight: "100vh" }}>
          <h2 className="lotr-title lotr-section-title">
            Los Anillos de Poder del Desarrollo
          </h2>
          <div className="lotr-divider" />
          <p className="lotr-section-subtitle">
            Cada proyecto, una obra forjada en el fuego del código
          </p>
          <GithubRepos />
        </section>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ProjectsPage;
