import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SortAsc } from 'lucide-react';
import { ProjectService } from '../services/ProjectService';
import { Proyecto } from '../types';
import { PROJECT_STATUS_LABELS, PROJECT_STATUS_COLORS } from '../types';
import { useDebounce } from '../hooks';

type SortOption = 'fecha' | 'titulo' | 'tecnologia';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterTech, setFilterTech] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('fecha');

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    ProjectService.getAll()
      .then(setProjects)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allTechs = useMemo(() => {
    const techs = new Set<string>();
    projects.forEach(p => p.tecnologias?.forEach(t => techs.add(t)));
    return ['all', ...Array.from(techs)];
  }, [projects]);

  const filtered = useMemo(() => {
    let result = [...projects];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(p =>
        p.titulo.toLowerCase().includes(q) ||
        p.descripcion?.toLowerCase().includes(q)
      );
    }

    if (filterTech !== 'all') {
      result = result.filter(p => p.tecnologias?.includes(filterTech));
    }

    if (filterStatus !== 'all') {
      result = result.filter(p => p.estado === filterStatus);
    }

    switch (sortBy) {
      case 'titulo':
        result.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'tecnologia':
        result.sort((a, b) => (a.tecnologias?.[0] || '').localeCompare(b.tecnologias?.[0] || ''));
        break;
      case 'fecha':
      default:
        result.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    }

    return result;
  }, [projects, debouncedSearch, filterTech, filterStatus, sortBy]);

  if (loading) {
    return (
      <section className="lotr-section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <div className="projects-grid">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton skeleton-card" />)}
        </div>
      </section>
    );
  }

  return (
    <section className="lotr-section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <motion.h2 className="lotr-title lotr-section-title" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Los Anillos de Poder del Desarrollo
      </motion.h2>
      <div className="lotr-divider" />
      <p className="lotr-section-subtitle">Cada proyecto, una obra forjada en el fuego del código</p>

      {/* SEARCH & FILTERS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', marginBottom: '30px' }}>
        <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '40px' }}
          />
        </div>

        <select value={filterTech} onChange={e => setFilterTech(e.target.value)} className="form-select" style={{ flex: '0 0 auto', width: 'auto', minWidth: '140px' }}>
          <option value="all">Todas las techs</option>
          {allTechs.filter(t => t !== 'all').map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="form-select" style={{ flex: '0 0 auto', width: 'auto', minWidth: '140px' }}>
          <option value="all">Todos los estados</option>
          <option value="finalizado">Finalizado</option>
          <option value="en_desarrollo">En Desarrollo</option>
          <option value="archivado">Archivado</option>
        </select>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <SortAsc size={16} style={{ color: '#666' }} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value as SortOption)} className="form-select" style={{ width: 'auto', minWidth: '130px' }}>
            <option value="fecha">Por fecha</option>
            <option value="titulo">Por nombre</option>
            <option value="tecnologia">Por tecnología</option>
          </select>
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="projects-grid">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            className="lotr-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
          >
            {project.imagen && (
              <img src={project.imagen} alt={project.titulo} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '12px' }} loading="lazy" />
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", color: 'var(--lotr-gold)', margin: 0, fontSize: '1.1rem' }}>{project.titulo}</h3>
              {project.destacado && <span style={{ color: 'var(--lotr-gold)', fontSize: '1.2rem' }}>&#9733;</span>}
            </div>
            <p style={{ color: '#a0a0b0', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '12px' }}>{project.descripcion}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
              {project.tecnologias?.map(t => (
                <span key={t} className="tech-badge tech-badge--react" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className={`status-badge status-badge--${project.estado}`}>{PROJECT_STATUS_LABELS[project.estado]}</span>
              <span style={{ color: '#666', fontSize: '0.75rem' }}>{new Date(project.fecha).toLocaleDateString('es-ES')}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="lotr-btn" style={{ fontSize: '0.75rem', padding: '8px 14px', flex: 1, textAlign: 'center', textDecoration: 'none' }}>
                  GitHub &rarr;
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="lotr-btn lotr-btn--primary" style={{ fontSize: '0.75rem', padding: '8px 14px', flex: 1, textAlign: 'center', textDecoration: 'none' }}>
                  Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
          <p>No se encontraron proyectos que coincidan con la búsqueda.</p>
        </div>
      )}
    </section>
  );
}
