import projectsJson from './projects.json';

export interface Project {
    id: number;
    name: string;
    description: string;
    link: string;
    technologies: string[];
    category: string;
    author: string;
    stars: number;
    forks?: number;
    language: string;
    avatar_url?: string;
}

// Lire les données depuis le fichier JSON et les trier par ID décroissant (dernier ajouté en premier)
export const projectsData: Project[] = (projectsJson as Project[]).sort((a, b) => b.id - a.id);
