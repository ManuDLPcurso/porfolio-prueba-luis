import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

import './theme/variables.css';
import './styles/lotr-theme.css';
import './styles/animations.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));

const App: React.FC = () => (
  <AuthProvider>
    <MainLayout>
      <Suspense fallback={<div className="loading-ring" />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/habilidades" component={SkillsPage} />
          <Route exact path="/proyectos" component={ProjectsPage} />
          <Route exact path="/sobre-mi" component={AboutPage} />
          <Route exact path="/contacto" component={ContactPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
        </Switch>
      </Suspense>
    </MainLayout>
  </AuthProvider>
);

export default App;
