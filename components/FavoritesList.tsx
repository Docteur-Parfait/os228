"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "../hooks/useFavorites";
import ProjectCard from "./ProjectCard";
import { ProjectWithStats } from "../data/projects";

export default function FavoritesList() {
  const { getFavoritesSorted, favoritesCount, clearFavorites, mounted } =
    useFavorites();

  if (!mounted) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-300 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const favorites = getFavoritesSorted();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100, transition: { duration: 0.3 } },
  };

  if (favoritesCount === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="max-w-md mx-auto">
          {/* Icône cœur vide */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            className="mb-6"
          >
            <svg
              className="w-24 h-24 mx-auto text-gray-300 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              />
            </svg>
          </motion.div>

          <h3 className="text-2xl font-bold text-foreground mb-3">
            Aucun favori pour le moment
          </h3>
          <p className="text-muted-foreground mb-6">
            Découvrez les projets open source togolais et ajoutez vos favoris en
            cliquant sur le cœur ❤️
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Découvrir les projets</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 17l9.2-9.2M17 17H7V7"
              />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-foreground">Mes Favoris</h2>
          <p className="text-muted-foreground">
            {favoritesCount} projet{favoritesCount > 1 ? "s" : ""} sélectionné
            {favoritesCount > 1 ? "s" : ""}
          </p>
        </div>

        {favoritesCount > 0 && (
          <motion.button
            onClick={() => {
              if (
                confirm("Êtes-vous sûr de vouloir vider tous vos favoris ?")
              ) {
                clearFavorites();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Vider</span>
          </motion.button>
        )}
      </motion.div>

      {/* Grille des favoris */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {favorites.map((favorite) => {
            // Convertir le favori en ProjectWithStats pour ProjectCard
            const projectWithStats: ProjectWithStats = {
              ...favorite,
              githubStats: undefined,
              isLoadingStats: false,
            };

            return (
              <motion.div
                key={favorite.id}
                variants={itemVariants}
                layout
                exit="exit"
              >
                <ProjectCard project={projectWithStats} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
