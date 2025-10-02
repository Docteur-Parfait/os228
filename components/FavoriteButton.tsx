"use client";

import { motion } from "framer-motion";
import { useFavorites } from "../hooks/useFavorites";
import { ProjectWithStats } from "../data/projects";

interface FavoriteButtonProps {
  project: ProjectWithStats;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function FavoriteButton({
  project,
  size = "md",
  showLabel = false,
}: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite, mounted } = useFavorites();

  const isProjectFavorite = mounted ? isFavorite(project.id) : false;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    toggleFavorite({
      id: project.id,
      name: project.name,
      description: project.description,
      link: project.link,
      author: project.author,
      language: project.language,
      technologies: project.technologies,
      category: project.category,
    });
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizeClasses = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3",
  };

  // Animation du cœur qui bat
  const heartVariants = {
    unfavorited: {
      scale: 1,
      fill: "none",
      stroke: "currentColor",
    },
    favorited: {
      scale: [1, 1.3, 1],
      fill: "#ef4444", // red-500
      stroke: "#ef4444",
    },
    hover: {
      scale: 1.1,
    },
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  };

  if (!mounted) {
    return (
      <div className={`${buttonSizeClasses[size]} opacity-50`}>
        <div
          className={`${sizeClasses[size]} bg-gray-300 rounded animate-pulse`}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleToggleFavorite}
        className={`
          ${buttonSizeClasses[size]}
          rounded-full 
          transition-colors 
          duration-200
          hover:bg-red-50 
          dark:hover:bg-red-950/20
          focus:outline-none 
          focus:ring-2 
          focus:ring-red-500/50
          ${
            isProjectFavorite
              ? "text-red-500"
              : "text-gray-400 hover:text-red-400"
          }
        `}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        title={
          isProjectFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
        }
      >
        <motion.svg
          className={sizeClasses[size]}
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={heartVariants}
          animate={isProjectFavorite ? "favorited" : "unfavorited"}
          whileHover="hover"
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>
      </motion.button>

      {showLabel && (
        <motion.span
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isProjectFavorite ? "Favoris" : "Ajouter"}
        </motion.span>
      )}
    </div>
  );
}
