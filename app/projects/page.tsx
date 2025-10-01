'use client';

import { useMemo, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import ProjectFilters from "../../components/ProjectFilters";
import { projectsData } from "../../data/projects";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "stars" | "id">("id");

  // Filtrer et trier les projets
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projectsData;

    // Filtrage par nom
    if (searchQuery) {
      filtered = projectsData.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Tri
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name, "fr");
        case "stars":
          // Tri par popularité (ID décroissant comme proxy)
          return b.id - a.id;
        case "id":
        default:
          return b.id - a.id;
      }
    });
  }, [searchQuery, sortBy]);
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Projets Open Source du Togo
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez, contribuez et participez à l'écosystème technologique togolais.
          </p>
        </div>

        {/* Section des projets */}
        <section className="mb-16">
          {/* Filtres et recherche */}
          <ProjectFilters
            onSearch={setSearchQuery}
            onSort={setSortBy}
            searchQuery={searchQuery}
            sortBy={sortBy}
          />

          {/* Liste des projets */}
          {filteredAndSortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? `Aucun projet ne correspond à "${searchQuery}"`
                  : "Aucun projet disponible pour le moment"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  Effacer la recherche
                </button>
              )}
            </div>
          )}
        </section>

        {/* Section d'appel à l'action */}
        <section className="text-center bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">
            Rejoignez la communauté !
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Vous avez un projet open source ou vous souhaitez contribuer ?
            Ajoutez votre projet à notre plateforme et participez au
            Hacktoberfest 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/Docteur-Parfait/os228"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Contribuer au projet
            </a>
            <a
              href="https://github.com/Docteur-Parfait/os228/blob/main/data/projects.json"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border text-foreground hover:bg-secondary px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Ajouter un projet
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
