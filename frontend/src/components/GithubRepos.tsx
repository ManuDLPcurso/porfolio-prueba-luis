import { useEffect, useState } from "react";
import { GithubRepo, GithubService } from "../services/GithubService";
import ProjectCard from "./ProjectCard";

interface GithubReposProps {
  limit?: number;
}

const GithubRepos: React.FC<GithubReposProps> = ({ limit }) => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    loadRepos();
  }, []);

  const loadRepos = async () => {
    try {
      const data = await GithubService.getRepos();
      setRepos(data);
    } catch (err) {
      setError("Error al cargar los repositorios de la Comunidad.");
    } finally {
      setLoading(false);
    }
  };

  const languages = [
    "all",
    ...new Set(repos.map((r) => r.language).filter(Boolean) as string[]),
  ];

  const filteredRepos =
    filter === "all" ? repos : repos.filter((r) => r.language === filter);

  const displayRepos = limit ? filteredRepos.slice(0, limit) : filteredRepos;

  if (loading) {
    return <div className="loading-ring" />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#8b0000" }}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {!limit && languages.length > 1 && (
        <div className="filter-pills">
          {languages.map((lang) => (
            <button
              key={lang}
              className={`filter-pill ${filter === lang ? "filter-pill--active" : ""}`}
              onClick={() => setFilter(lang)}
            >
              {lang === "all" ? "Todos" : lang}
            </button>
          ))}
        </div>
      )}

      <div className="projects-grid">
        {displayRepos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>

      {displayRepos.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "40px", color: "#666" }}>
          <p>No se encontraron repositorios en esta región de la Tierra Media.</p>
        </div>
      )}
    </div>
  );
};

export default GithubRepos;
