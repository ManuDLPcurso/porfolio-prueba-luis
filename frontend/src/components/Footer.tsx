const Footer: React.FC = () => {
  return (
    <footer className="lotr-footer">
      <div className="lotr-divider" style={{ marginBottom: "20px" }} />
      <p
        className="lotr-subtitle"
        style={{ fontSize: "0.75rem", letterSpacing: "3px", marginBottom: "12px" }}
      >
        Forjado con pasión por Luis F.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "16px" }}>
        <a href="https://github.com/luisfetrabajo" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="mailto:luisfetrabajo@gmail.com">Contacto</a>
      </div>
      <p style={{ color: "#555", fontSize: "0.7rem", fontFamily: "'Cinzel', serif" }}>
        "No todos los que vagan se pierden." — J.R.R. Tolkien
      </p>
    </footer>
  );
};

export default Footer;
