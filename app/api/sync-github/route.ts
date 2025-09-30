import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Project } from "../../../data/projects";

const PROJECTS_FILE = path.join(process.cwd(), "data", "projects.json");

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

export async function POST(request: NextRequest) {
  try {
    // Lire le fichier JSON existant
    const fileContent = await fs.readFile(PROJECTS_FILE, "utf8");
    const projects: Project[] = JSON.parse(fileContent);
    
    const updatedProjects: Project[] = [];
    const errors: string[] = [];
    
    for (const project of projects) {
      try {
        // Extraire owner et repo de l'URL GitHub
        const githubUrlRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = project.link.match(githubUrlRegex);
        
        if (!match) {
          console.warn(`URL GitHub invalide pour le projet ${project.name}: ${project.link}`);
          updatedProjects.push(project);
          continue;
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
            errors.push(`Repository GitHub non trouvé pour ${project.name}: ${project.link}`);
            updatedProjects.push(project);
            continue;
          }
          errors.push(`Erreur GitHub API pour ${project.name}: ${response.status}`);
          updatedProjects.push(project);
          continue;
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

        // Mettre à jour le projet avec les données GitHub
        const updatedProject: Project = {
          ...project,
          name: repoData.name,
          description: repoData.description || project.description,
          stars: repoData.stargazers_count,
          forks: repoData.forks_count,
          language: repoData.language || project.language,
          avatar_url: repoData.owner.avatar_url,
          author: repoData.owner.login,
          category: getCategory(repoData.language, topics),
          technologies: [
            repoData.language,
            ...topics.slice(0, 4)
          ].filter(Boolean)
        };

        updatedProjects.push(updatedProject);
        
        // Petite pause pour éviter de surcharger l'API GitHub
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Erreur lors de la synchronisation de ${project.name}:`, error);
        errors.push(`Erreur pour ${project.name}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
        updatedProjects.push(project);
      }
    }
    
    // Écrire le fichier mis à jour
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(updatedProjects, null, 2));
    
    return NextResponse.json({
      success: true,
      message: `Synchronisation terminée. ${updatedProjects.length} projets traités.`,
      errors: errors,
      updatedCount: updatedProjects.length
    });
    
  } catch (error) {
    console.error("Erreur lors de la synchronisation:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Erreur interne du serveur",
        details: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Utilisez POST pour synchroniser les projets avec GitHub",
    endpoint: "/api/sync-github",
    method: "POST"
  });
}
