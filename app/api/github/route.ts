import { NextRequest, NextResponse } from "next/server";

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const repoUrl = searchParams.get("url");

  if (!repoUrl) {
    return NextResponse.json(
      { error: "URL du repository GitHub requis" },
      { status: 400 }
    );
  }

  try {
    // Extraire owner et repo de l'URL GitHub
    const githubUrlRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
    const match = repoUrl.match(githubUrlRegex);
    
    if (!match) {
      return NextResponse.json(
        { error: "URL GitHub invalide" },
        { status: 400 }
      );
    }

    const [, owner, repo] = match;
    const cleanRepo = repo.replace(/\.git$/, ""); // Enlever .git si présent

    // Appel à l'API GitHub
    const githubApiUrl = `https://api.github.com/repos/${owner}/${cleanRepo}`;
    
    const response = await fetch(githubApiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OS228-Platform'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Repository GitHub non trouvé" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Erreur lors de la récupération des données GitHub" },
        { status: response.status }
      );
    }

    const repoData: GitHubRepo = await response.json();

    // Récupérer les topics (technologies) du repository
    const topicsResponse = await fetch(`https://api.github.com/repos/${owner}/${cleanRepo}/topics`, {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json',
        'User-Agent': 'OS228-Platform'
      }
    });

    let topics: string[] = [];
    if (topicsResponse.ok) {
      const topicsData = await topicsResponse.json();
      topics = topicsData.names || [];
    }

    // Déterminer la catégorie basée sur le langage principal et les topics
    const getCategory = (language: string, topics: string[]): string => {
      const allText = `${language} ${topics.join(" ")}`.toLowerCase();
      
      if (allText.includes("web") || allText.includes("react") || allText.includes("vue") || allText.includes("angular")) {
        return "Web Development";
      }
      if (allText.includes("mobile") || allText.includes("flutter") || allText.includes("react-native") || allText.includes("swift") || allText.includes("kotlin")) {
        return "Mobile Development";
      }
      if (allText.includes("desktop") || allText.includes("electron") || allText.includes("qt")) {
        return "Desktop Application";
      }
      if (allText.includes("devops") || allText.includes("docker") || allText.includes("kubernetes") || allText.includes("ci/cd")) {
        return "DevOps";
      }
      if (allText.includes("data") || allText.includes("machine") || allText.includes("ai") || allText.includes("ml")) {
        return "Data Science";
      }
      if (allText.includes("tool") || allText.includes("cli") || allText.includes("utility")) {
        return "Developer Tools";
      }
      
      return "Open Source";
    };

    // Préparer les données formatées
    const formattedData = {
      name: repoData.name,
      description: repoData.description || "Aucune description disponible",
      link: repoData.html_url,
      technologies: [
        repoData.language,
        ...topics.slice(0, 4) // Limiter à 5 technologies max
      ].filter(Boolean), // Enlever les valeurs vides
      category: getCategory(repoData.language, topics),
      author: repoData.owner.login,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      language: repoData.language || "Other",
      avatar_url: repoData.owner.avatar_url,
      created_at: repoData.created_at,
      updated_at: repoData.updated_at
    };

    return NextResponse.json(formattedData);

  } catch (error) {
    console.error("Erreur GitHub API:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des données GitHub" },
      { status: 500 }
    );
  }
}
