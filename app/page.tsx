'use client';

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Hero Section */}
        <section className="relative text-center py-20 md:py-32 flex items-center justify-center">
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="https://bugfender.com/wp-content/uploads/2022/09/Screenshot_2022-09-27_at_6.58.35_PM.png"
              alt="Abstract technology background"
              layout="fill"
              objectFit="cover"
              className="opacity-60 blur-sm"
            />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              OpenSource
              <span className="text-red-500">2</span>
              <span className="text-primary">2</span>
              <span className="text-yellow-500">8</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-3xl mx-auto">
              OS228 est une plateforme qui regroupe les projets open source du Togo dans le cadre du Hacktoberfest 2025. Cette initiative vise à promouvoir l'écosystème technologique togolais et à encourager la contribution aux projets open source.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/projects"
                  className="bg-primary text-primary-foreground hover:bg-yellow-500 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Explorer les projets
                </Link>
                <a
                  href="https://github.com/Docteur-Parfait/os228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-border text-foreground hover:bg-green-500 hover:text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Contribuer sur GitHub
                </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-card">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Fonctionnalités
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Liste des projets</h3>
                <p className="text-muted-foreground">
                  Découvrez tous les projets open source du Togo.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Interface moderne</h3>
                <p className="text-muted-foreground">
                  Design responsive avec thème vert sombre (open source).
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Facilité de contribution</h3>
                <p className="text-muted-foreground">
                  Ajout simple de nouveaux projets via un fichier JSON.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Technologies utilisées</h2>
                <div className="flex justify-center items-center gap-8">
                    <div className="flex flex-col items-center">
                        <span className="text-4xl">Next.js</span>
                        <span className="text-muted-foreground">Framework React</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl">TypeScript</span>
                        <span className="text-muted-foreground">Typage statique</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-4xl">Tailwind CSS</span>
                        <span className="text-muted-foreground">Framework CSS</span>
                    </div>
                </div>
            </div>
        </section>

        {/* How to contribute Section */}
        <section className="py-16 bg-card">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Comment contribuer</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <h3 className="text-xl font-semibold mb-2">Contribuer au code</h3>
                        <p className="text-muted-foreground">
                            Fork le repository, créer une branche pour votre fonctionnalité, faire vos modifications et créer une Pull Request.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <h3 className="text-xl font-semibold mb-2">Ajouter un projet</h3>
                        <p className="text-muted-foreground">
                            Modifier le fichier `data/projects.json` et ajouter votre projet en suivant la structure existante.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* Hacktoberfest Section */}
        <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Hacktoberfest 2025</h2>
                <p className="text-lg text-muted-foreground mb-8">
                    Ce projet participe au Hacktoberfest 2025 ! Les issues étiquetées `hacktoberfest` sont prêtes pour les contributions.
                </p>
                <Link
                  href="https://github.com/Docteur-Parfait/os228/issues"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Voir les issues
                </Link>
            </div>
        </section>
      </main>
    </div>
  );
}