import { GithubRepo, GithubService } from "../services/GithubService";

interface ProjectCardProps {
  repo: GithubRepo;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ repo }) => {
  const langColor = GithubService.getLanguageColor(repo.language);

  return (
    <div className="repo-card">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "1.2rem" }}>📜</span>
        <span className="repo-card__name">{repo.name}</span>
      </div>

      <p className="repo-card__desc">
        {repo.description || "Sin descripción — un misterio de la Tierra Media."}
      </p>

      {repo.topics && repo.topics.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              style={{
                fontSize: "0.65rem",
                padding: "2px 8px",
                borderRadius: "10px",
                background: "rgba(201, 162, 39, 0.08)",
                border: "1px solid rgba(201, 162, 39, 0.15)",
                color: "var(--lotr-gold)",
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="repo-card__meta">
        {repo.language && (
          <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span className="repo-card__lang-dot" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}

        {repo.stargazers_count > 0 && (
          <span className="repo-card__stars">
            ★ {repo.stargazers_count}
          </span>
        )}

        {repo.license && (
          <span style={{ opacity: 0.6 }}>{repo.license.spdx_id}</span>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="lotr-btn"
          style={{ fontSize: "0.75rem", padding: "8px 16px", textAlign: "center", flex: 1 }}
        >
          Ver en GitHub →
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="lotr-btn lotr-btn--primary"
            style={{ fontSize: "0.75rem", padding: "8px 16px", textAlign: "center", flex: 1 }}
          >
            Demo ↗
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
