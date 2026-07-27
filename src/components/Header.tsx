import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonMenuButton } from "@ionic/react";
import { useLocation } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Inicio" },
  { path: "/projects", label: "Proyectos" },
  { path: "/skills", label: "Habilidades" },
  { path: "/about", label: "Sobre Mí" },
];

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <IonHeader className="lotr-header">
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton />
        </IonButtons>
        <IonTitle>
          <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: "1.1rem" }}>
            ⚔ Luis F.
          </span>
        </IonTitle>
        <IonButtons slot="end">
          {navLinks.map((link) => (
            <IonButton
              key={link.path}
              routerLink={link.path}
              className="lotr-nav-link"
              style={{
                color:
                  location.pathname === link.path
                    ? "var(--lotr-gold)"
                    : undefined,
              }}
            >
              {link.label}
            </IonButton>
          ))}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
