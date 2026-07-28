import { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await signIn(email, password);
    if (authError) {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    } else {
      history.push('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <motion.div className="login-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="login-icon">&#9876;</div>
        <h1 className="login-title">Acceso Privado</h1>
        <p className="login-subtitle">Solo para los elegidos</p>

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-input" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button type="submit" className="lotr-btn lotr-btn--primary" disabled={loading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {loading ? 'Entrando...' : <><LogIn size={16} /> Entrar</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
