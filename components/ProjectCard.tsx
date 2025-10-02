"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import type { ProjectWithStats } from "@/data/projects";
import FavoriteButton from "./FavoriteButton";
import ShareButtons from "./ShareButtons";

interface ProjectCardProps {
  project: ProjectWithStats;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const stats = project.githubStats;
  const loading = project.isLoadingStats || false;

  return (
    <div className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-border h-full flex flex-col">
      {/* Header avec titre et favori */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <h3 className="text-xl font-bold leading-tight text-card-foreground flex-1 min-w-0 break-words">
          {project.name}
        </h3>
        <div className="flex-shrink-0">
          <FavoriteButton project={project} size="md" />
        </div>
      </div>

      {/* Stats GitHub */}
      <div className="flex items-center gap-3 text-muted-foreground text-sm mb-4">
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
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H11v2.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V8.5zm5.5-2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              </svg>
              <span className="font-medium">{stats.forks}</span>
            </div>
          </>
        ) : project.fallbackStats ? (
          <>
            <div className="flex items-center gap-1">
              <span>⭐</span>
              <span className="font-medium">{project.fallbackStats.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM10 8.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H11v2.5a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V8.5zm5.5-2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
              </svg>
              <span className="font-medium">{project.fallbackStats.forks}</span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Stats non disponibles</span>
          </div>
        )}
      </div>

      {/* Description avec truncation */}
      <p className="text-muted-foreground mb-4 flex-1 text-sm leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-1 text-muted-foreground text-xs">
              +{project.technologies.length - 4} autres
            </span>
          )}
        </div>
      </div>

      {/* Auteur et langage */}
      <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
        <div className="truncate flex-1 min-w-0">
          <span className="font-medium">Auteur:</span> {project.author}
        </div>
        <div className="flex-shrink-0 ml-2">
          <span className="font-medium">Langage:</span> {project.language}
        </div>
      </div>

      {/* Footer avec actions */}
      <div className="mt-auto pt-4 border-t border-border">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-shrink-0">
            <ShareButtons project={project} size="sm" />
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors text-xs font-medium"
          >
            <ExternalLink className="w-3 h-3" />
            Voir sur GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
