"use client";

import { useState, useEffect } from "react";

export interface FavoriteProject {
  id: number;
  name: string;
  description: string;
  link: string;
  author: string;
  language: string;
  technologies: string[];
  category: string;
  addedAt: number; // timestamp
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteProject[]>([]);
  const [mounted, setMounted] = useState(false);

  // Charger les favoris depuis localStorage au montage
  useEffect(() => {
    setMounted(true);
    const savedFavorites = localStorage.getItem("os228-favorites");
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites);
        setFavorites(parsed);
      } catch (error) {
        console.error("Erreur lors du chargement des favoris:", error);
        setFavorites([]);
      }
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("os228-favorites", JSON.stringify(favorites));
    }
  }, [favorites, mounted]);

  // Ajouter un projet aux favoris
  const addToFavorites = (project: Omit<FavoriteProject, "addedAt">) => {
    const newFavorite: FavoriteProject = {
      ...project,
      addedAt: Date.now(),
    };

    setFavorites((prev) => {
      // Éviter les doublons
      const exists = prev.some((fav) => fav.id === project.id);
      if (exists) return prev;

      return [...prev, newFavorite];
    });
  };

  // Retirer un projet des favoris
  const removeFromFavorites = (projectId: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== projectId));
  };

  // Basculer le statut favori d'un projet
  const toggleFavorite = (project: Omit<FavoriteProject, "addedAt">) => {
    const isFavorite = favorites.some((fav) => fav.id === project.id);

    if (isFavorite) {
      removeFromFavorites(project.id);
    } else {
      addToFavorites(project);
    }
  };

  // Vérifier si un projet est en favori
  const isFavorite = (projectId: number): boolean => {
    return favorites.some((fav) => fav.id === projectId);
  };

  // Obtenir les favoris triés par date d'ajout (plus récent en premier)
  const getFavoritesSorted = (): FavoriteProject[] => {
    return [...favorites].sort((a, b) => b.addedAt - a.addedAt);
  };

  // Vider tous les favoris
  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavoritesSorted,
    clearFavorites,
    favoritesCount: favorites.length,
    mounted,
  };
}
