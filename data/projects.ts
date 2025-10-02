import projectsJson from "./projects.json";

export interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  technologies: string[];
  category: string;
  author: string;
  language: string;
  fallbackStats?: {
    stars: number;
    forks: number;
  };
}

export interface ProjectWithStats extends Project {
  githubStats?: {
    stars: number;
    forks: number;
    lastUpdated: string;
  };
  isLoadingStats?: boolean;
}

// Lire les données depuis le fichier JSON et les trier par ID décroissant (dernier ajouté en premier)
export const projectsData: Project[] = (projectsJson as Project[]).sort(
  (a, b) => b.id - a.id
);

export function getPaginatedProjects(
  page: number,
  itemsPerPage: number,
  filteredProjects: Project[] = projectsData
) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
  const totalProjects = filteredProjects.length;
  return { paginatedProjects, totalProjects };
}
