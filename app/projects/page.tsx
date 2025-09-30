
"use client";

import { useMemo, useState } from "react";
import Navbar from "../../components/Navbar";
import ProjectCard from "../../components/ProjectCard";
import ProjectFilters from "../../components/ProjectFilters";
import { projectsData } from "../../data/projects";

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "stars" | "id">("id");

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projectsData;

    if (searchQuery) {
      filtered = projectsData.filter(
        (project) =>
          project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name, "fr");
        case "stars":
          return b.id - a.id;
        case "id":
        default:
          return b.id - a.id;
      }
    });
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Tous les projets
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explorez tous les projets open source du Togo. Filtrez par technologie, nom ou description.
          </p>
        </div>

        <section className="mb-16">
          <ProjectFilters
            onSearch={setSearchQuery}
            onSort={setSortBy}
            searchQuery={searchQuery}
            sortBy={sortBy}
          />

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
        <section className="text-center bg-card border border-border rounded-lg p-8 mt-16">
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
