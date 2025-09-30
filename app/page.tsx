
"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { projectsData } from "../data/projects";
import AnimatedSection from "../components/AnimatedSection";

export default function Home() {
  const featuredProjects = projectsData.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Section Hero */}
        <div className="relative h-[60vh] min-h-[400px] w-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521185496955-15097b20c5fe?q=80&w=1950&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-4 fade-in-up">
              OpenSource 
              <span className="text-red-500">2</span>
              <span className="text-primary">2</span>
              <span className="text-yellow-500">8</span>
            </h1>
            <h3 className="text-2xl md:text-4xl text-gray-200 fade-in-up" style={{ animationDelay: '0.5s' }}>
              Pour les togolais par les Togolais
            </h3>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Section Description */}
          <AnimatedSection id="description" className="mb-16 scroll-m-20">
            <h2 className="text-3xl font-bold text-left text-foreground mb-8">
              Qu'est-ce que OS
              <span className="text-red-500">2</span>
              <span className="text-primary">2</span>
              <span className="text-yellow-500">8</span> ?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed text-left">
              OS228 (OpenSource 228) est une initiative communautaire visant à promouvoir et à valoriser les projets open source développés par la communauté technologique du Togo. Le "228" est l'indicatif téléphonique du Togo, un symbole de notre identité nationale.
            </p>
          </AnimatedSection>

          {/* Section Vision */}
          <AnimatedSection id="vision" className="mb-16 scroll-m-20">
            <h2 className="text-3xl font-bold text-left text-foreground mb-8">Notre Vision</h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed text-left">
              Nous aspirons à créer un écosystème open source dynamique et collaboratif au Togo, où chaque développeur, qu'il soit débutant ou expert, peut contribuer, apprendre et innover. Nous voulons mettre en lumière le talent local et connecter le Togo à la communauté mondiale de l'open source.
            </p>
          </AnimatedSection>

          {/* Section Objectifs */}
          <AnimatedSection id="objectifs" className="mb-16 scroll-m-20">
            <h2 className="text-3xl font-bold text-left text-foreground mb-8">Nos Objectifs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-primary">Promouvoir</h3>
                <p className="text-muted-foreground">Mettre en avant les projets et les talents togolais.</p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-yellow-500">Fédérer</h3>
                <p className="text-muted-foreground">Rassembler la communauté des développeurs autour de projets communs.</p>
              </div>
              <div className="bg-card p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-red-500">Former</h3>
                <p className="text-muted-foreground">Offrir une plateforme d'apprentissage par la contribution.</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Section des projets */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-left text-foreground mb-8">Quelques projets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="text-left mt-8">
              <Link href="/projects" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Voir tous les projets
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mb-4 text-card-foreground">
              OS228 - OpenSource 228 | Hacktoberfest 2025
            </p>
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://linkedin.com/company/Night-Coding/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.433-9.886-9.888-9.886-5.448 0-9.886 4.434-9.889 9.885.002 2.024.63 3.965 1.739 5.62l-1.155 4.224 4.272-1.124z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Fait avec ❤️ par la communauté Night Coding
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
