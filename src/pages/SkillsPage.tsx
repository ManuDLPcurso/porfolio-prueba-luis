import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SkillService } from '../services/SkillService';
import { Habilidad } from '../types';
import { TECH_CATEGORIES } from '../utils/constants';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Habilidad[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    SkillService.getAll()
      .then(setSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(skills.map(s => s.categoria))];
  const filtered = activeCategory === 'all' ? skills : skills.filter(s => s.categoria === activeCategory);

  if (loading) {
    return (
      <section className="lotr-section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton skeleton-card" />)}
        </div>
      </section>
    );
  }

  return (
    <section className="lotr-section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <motion.h2 className="lotr-title lotr-section-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        El Mapa de las Tierras
      </motion.h2>
      <div className="lotr-divider" />
      <p className="lotr-section-subtitle">Las habilidades acumuladas en el largo camino del desarrollo</p>

      <div className="filter-pills">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-pill ${activeCategory === cat ? 'filter-pill--active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat === 'all' ? 'Todas' : TECH_CATEGORIES[cat as keyof typeof TECH_CATEGORIES] || cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.id}
            className="lotr-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(201, 162, 39, 0.08)', border: '1px solid rgba(201, 162, 39, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                {skill.icono || '&#128295;'}
              </div>
              <div>
                <h3 style={{ fontFamily: "'Cinzel', serif", color: 'var(--lotr-gold)', margin: 0, fontSize: '1.1rem' }}>{skill.nombre}</h3>
                <span style={{ fontFamily: "'Cinzel', serif", color: 'var(--lotr-mithril)', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'capitalize' }}>
                  {TECH_CATEGORIES[skill.categoria as keyof typeof TECH_CATEGORIES] || skill.categoria}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
          <p>No se encontraron habilidades en esta región.</p>
        </div>
      )}
    </section>
  );
}
