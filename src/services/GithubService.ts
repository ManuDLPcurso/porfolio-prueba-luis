const USERNAME = import.meta.env.VITE_GITHUB_USERNAME || "luisfetrabajo";
const API_BASE = "https://api.github.com";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  license: { spdx_id: string; name: string } | null;
}

export interface GithubUser {
  login: string;
  name: string;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
}

export class GithubService {
  static async getRepos(): Promise<GithubRepo[]> {
    const res = await fetch(
      `${API_BASE}/users/${USERNAME}/repos?sort=updated&per_page=30`
    );
    if (!res.ok) throw new Error("Error fetching repos");
    const repos: GithubRepo[] = await res.json();
    return repos.filter((r) => !r.fork);
  }

  static async getUser(): Promise<GithubUser> {
    const res = await fetch(`${API_BASE}/users/${USERNAME}`);
    if (!res.ok) throw new Error("Error fetching user");
    return res.json();
  }

  static getLanguageColor(lang: string | null): string {
    const colors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#3178c6",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      Java: "#b07219",
      "C++": "#f34b7d",
      PHP: "#4F5D95",
      Dart: "#00B4AB",
      Shell: "#89e051",
      JSON: "#292929",
    };
    return colors[lang || ""] || "#8b8b8b";
  }
}
