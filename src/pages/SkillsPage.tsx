import { IonContent, IonPage } from "@ionic/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TechTree from "../components/TechTree";

const SkillsPage: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent>
        <section className="lotr-section" style={{ paddingTop: "100px", minHeight: "100vh" }}>
          <h2 className="lotr-title lotr-section-title">El Mapa de las Tierras</h2>
          <div className="lotr-divider" />
          <p className="lotr-section-subtitle">
            Las habilidades acumuladas en el largo camino del desarrollo
          </p>
          <TechTree />
        </section>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default SkillsPage;
