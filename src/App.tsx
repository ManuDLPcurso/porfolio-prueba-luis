import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";

import "./theme/variables.css";
import "./styles/lotr-theme.css";
import "./styles/animations.css";

import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import SkillsPage from "./pages/SkillsPage";
import AboutPage from "./pages/AboutPage";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/projects" component={ProjectsPage} />
        <Route exact path="/skills" component={SkillsPage} />
        <Route exact path="/about" component={AboutPage} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
) as React.JSX.Element;

export default App;
