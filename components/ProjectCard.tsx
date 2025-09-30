import { Project } from "../data/projects";
import { useGitHubStats } from "../hooks/useGitHubStats";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { stats, loading } = useGitHubStats(project.link);

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-card-foreground mb-2">
          {project.name}
        </h3>
        <div className="flex items-center gap-3 text-muted-foreground text-sm">
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span>Chargement...</span>
            </div>
          ) : stats ? (
            <>
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span className="font-medium">{stats.stars}</span>
              </div>
              <div className="flex items-center gap-1">
                {/* Icône fork GitHub (revu) */}
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6 3a3 3 0 1 0 2.83 4H9v4.18A3.001 3.001 0 0 0 11 14.83V17a3 3 0 1 0 2 0v-2.17A3.001 3.001 0 0 0 15 11.18V7.83A3.001 3.001 0 1 0 13 3v4.18A3.001 3.001 0 0 0 9 7.83V7a3 3 0 0 0-3-3zm0 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm12 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-6 12a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
                <span className="font-medium">{stats.forks}</span>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Stats non disponibles</span>
            </div>
          )}
        </div>
      </div>

      <p className="text-muted-foreground mb-4 leading-relaxed overflow-hidden max-h-[4.5rem] text-ellipsis" 
         style={{
           display: '-webkit-box',
           WebkitLineClamp: 3,
           WebkitBoxOrient: 'vertical'
         }}>
        {project.description}
      </p>

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

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          <span className="font-medium">Auteur:</span> {project.author}
        </div>
        <div>
          <span className="font-medium">Langage:</span> {project.language}
        </div>
      </div>

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
