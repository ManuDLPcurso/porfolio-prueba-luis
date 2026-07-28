import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/admin/AdminPage';

import './theme/variables.css';
import './styles/lotr-theme.css';
import './styles/animations.css';

const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/habilidades" component={SkillsPage} />
          <Route exact path="/proyectos" component={ProjectsPage} />
          <Route exact path="/sobre-mi" component={AboutPage} />
          <Route exact path="/contacto" component={ContactPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
        </Switch>
      </MainLayout>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
