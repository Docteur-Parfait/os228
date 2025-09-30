import { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
      {/* En-tête avec titre et statistiques GitHub */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-card-foreground mb-2">
          {project.name}
        </h3>
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span>{project.stars}</span>
          </div>
          {project.forks !== undefined && (
            <div className="flex items-center gap-1">
              <span className="text-gray-500">🍴</span>
              <span>{project.forks}</span>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Auteur et Langage */}
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          {project.avatar_url && (
            <img 
              src={project.avatar_url} 
              alt={project.author}
              className="w-5 h-5 rounded-full border border-border"
            />
          )}
          <span>
            <span className="font-medium">Auteur:</span> {project.author}
          </span>
        </div>
        <div>
          <span className="font-medium">Langage:</span> {project.language}
        </div>
      </div>

      {/* Lien GitHub */}
      <div className="mt-4 pt-4 border-t border-border">
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200"
        >
          Voir sur GitHub
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
