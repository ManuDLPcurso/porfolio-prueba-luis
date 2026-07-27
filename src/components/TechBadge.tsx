import { useEffect, useState } from "react";

interface TechBadgeProps {
  name: string;
  icon?: string;
  size?: "sm" | "md" | "lg";
}

const techClasses: Record<string, string> = {
  React: "tech-badge--react",
  Ionic: "tech-badge--ionic",
  Angular: "tech-badge--angular",
  "MongoDB": "tech-badge--mongodb",
  Supabase: "tech-badge--supabase",
  GitHub: "tech-badge--github",
  TypeScript: "tech-badge--react",
  JavaScript: "tech-badge--github",
};

const techIcons: Record<string, string> = {
  React: "⚛️",
  Ionic: "💠",
  Angular: "🅰️",
  MongoDB: "🍃",
  Supabase: "⚡",
  GitHub: "🐙",
  TypeScript: "📘",
  JavaScript: "📒",
};

const TechBadge: React.FC<TechBadgeProps> = ({ name, icon, size = "md" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), Math.random() * 400);
    return () => clearTimeout(timer);
  }, []);

  const sizeMap = { sm: "0.7rem", md: "0.8rem", lg: "0.9rem" };
  const paddingMap = { sm: "4px 10px", md: "6px 14px", lg: "8px 18px" };

  return (
    <span
      className={`tech-badge ${techClasses[name] || "tech-badge--github"}`}
      style={{
        fontSize: sizeMap[size],
        padding: paddingMap[size],
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "all 0.5s ease",
      }}
    >
      <span>{icon || techIcons[name] || "🔧"}</span>
      {name}
    </span>
  );
};

export default TechBadge;
