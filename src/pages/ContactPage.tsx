import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { MessageService } from '../services/MessageService';

export default function ContactPage() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    
    try {
      await MessageService.send(form);
      setSent(true);
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch {
      setError('Error al enviar el mensaje. Inténtalo de nuevo.');
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <section className="lotr-section" style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
          <CheckCircle size={64} color="var(--lotr-gold)" style={{ marginBottom: '20px' }} />
          <h2 className="lotr-title" style={{ fontSize: '1.8rem', marginBottom: '12px' }}>¡Mensaje Enviado!</h2>
          <p className="lotr-text" style={{ marginBottom: '30px' }}>Tu palantír ha sido enviado correctamente. Te responderé pronto.</p>
          <button onClick={() => setSent(false)} className="lotr-btn">Enviar otro mensaje</button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="lotr-section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <motion.h2 className="lotr-title lotr-section-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Enviar un Palantír
      </motion.h2>
      <div className="lotr-divider" />
      <p className="lotr-section-subtitle">Contacta conmigo a través de este formulario</p>

      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && <div className="login-error">{error}</div>}

        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-input" required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Tu nombre" />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com" />
        </div>

        <div className="form-group">
          <label className="form-label">Asunto</label>
          <input type="text" className="form-input" required value={form.asunto} onChange={e => setForm({ ...form, asunto: e.target.value })} placeholder="Asunto del mensaje" />
        </div>

        <div className="form-group">
          <label className="form-label">Mensaje</label>
          <textarea className="form-textarea" required value={form.mensaje} onChange={e => setForm({ ...form, mensaje: e.target.value })} placeholder="Escribe tu mensaje aquí..." />
        </div>

        <button type="submit" className="lotr-btn lotr-btn--primary" disabled={sending} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {sending ? 'Enviando...' : <><Send size={16} /> Enviar Mensaje</>}
        </button>
      </motion.form>
    </section>
  );
}
