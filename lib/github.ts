export interface GitHubStats {
  stars: number;
  forks: number;
  lastUpdated: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string;
  html_url: string;
}

/**
 * Récupère les statistiques d'un repository GitHub
 */
export async function getGitHubStats(
  owner: string,
  repo: string
): Promise<GitHubStats | null> {
  try {
    const token =
      process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "OS228-Platform",
    };

    // Ajouter le token si disponible
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    console.log(
      `🔍 Tentative de récupération des stats pour ${owner}/${repo}${
        token ? " (avec token)" : " (sans token)"
      }`
    );

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers,
      }
    );

    // Logs pour le debugging
    console.log(`📊 Réponse API: ${response.status} ${response.statusText}`);

    if (response.headers.get("x-ratelimit-remaining")) {
      console.log(
        `⏱️ Rate limit restant: ${response.headers.get(
          "x-ratelimit-remaining"
        )}`
      );
    }

    if (!response.ok) {
      if (response.status === 403) {
        console.warn(
          `🚫 Rate limit atteint pour ${owner}/${repo}. Utilisez un token GitHub pour plus de requêtes.`
        );
      } else {
        console.warn(
          `⚠️ Impossible de récupérer les stats pour ${owner}/${repo}: ${response.status} - ${response.statusText}`
        );
      }
      return null;
    }

    const data: GitHubRepo = await response.json();

    const stats = {
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdated: data.updated_at,
    };

    console.log(`✅ Stats récupérées pour ${owner}/${repo}:`, stats);
    return stats;
  } catch (error) {
    console.error(
      `❌ Erreur lors de la récupération des stats pour ${owner}/${repo}:`,
      error
    );
    return null;
  }
}

/**
 * Extrait le owner et le repo d'une URL GitHub
 */
export function extractGitHubInfo(
  url: string
): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return {
      owner: match[1],
      repo: match[2].replace(/\.git$/, ""), // Enlever .git si présent
    };
  }
  return null;
}

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export async function getGitHubContributors(
  owner: string,
  repo: string
): Promise<GitHubContributor[] | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "OS228-Platform",
        },
      }
    );

    if (!response.ok) {
      console.warn(
        `Impossible de récupérer les contributeurs pour ${owner}/${repo}: ${response.status} - ${response.statusText}`
      );
      return null;
    }

    const data: GitHubContributor[] = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des contributeurs pour ${owner}/${repo}:`,
      error
    );
    return null;
  }
}
