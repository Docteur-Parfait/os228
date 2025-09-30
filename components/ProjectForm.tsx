"use client";

import { useState } from "react";
import { Project } from "../data/projects";
import Alert from "./Alert";
import GitHubPreview from "./GitHubPreview";
import GitHubIntegrationGuide from "./GitHubIntegrationGuide";

interface ProjectFormProps {
  onProjectAdded: (project: Project) => void;
  onClose: () => void;
}

export default function ProjectForm({ onProjectAdded, onClose }: ProjectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    technologies: "",
    category: "",
    author: "",
    language: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingGitHub, setIsLoadingGitHub] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error" | "info"; message: string; show: boolean }>({
    type: "info",
    message: "",
    show: false
  });
  const [githubData, setGitHubData] = useState<any>(null);
  const [showGuide, setShowGuide] = useState(false);

  const categories = [
    "Web Development",
    "Mobile Development", 
    "Desktop Application",
    "Developer Tools",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "Open Source",
    "Other"
  ];

  const languages = [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Dart",
    "Other"
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Le nom du projet est requis";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
    } else if (formData.description.length < 10) {
      newErrors.description = "La description doit contenir au moins 10 caractères";
    }

    if (!formData.link.trim()) {
      newErrors.link = "Le lien GitHub est requis";
    } else if (!formData.link.includes("github.com")) {
      newErrors.link = "Le lien doit être un lien GitHub valide";
    }

    if (!formData.technologies.trim()) {
      newErrors.technologies = "Au moins une technologie est requise";
    }

    if (!formData.category) {
      newErrors.category = "La catégorie est requise";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Le nom de l'auteur est requis";
    }

    if (!formData.language) {
      newErrors.language = "Le langage principal est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Générer un nouvel ID (plus grand que tous les IDs existants)
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          technologies: formData.technologies.split(",").map(tech => tech.trim()),
          stars: githubData?.stars || 0,
          forks: githubData?.forks || 0,
          avatar_url: githubData?.avatar_url || undefined
        }),
      });

      if (response.ok) {
        const newProject = await response.json();
        onProjectAdded(newProject);
        setAlert({
          type: "success",
          message: "Projet ajouté avec succès !",
          show: true
        });
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de l'ajout du projet");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setAlert({
        type: "error",
        message: error instanceof Error ? error.message : "Erreur lors de l'ajout du projet. Veuillez réessayer.",
        show: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fonction pour récupérer les données GitHub
  const fetchGitHubData = async (url: string) => {
    if (!url.includes("github.com")) return;
    
    setIsLoadingGitHub(true);
    try {
      const response = await fetch(`/api/github?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      
      if (response.ok) {
        setGitHubData(data);
        setFormData(prev => ({
          ...prev,
          name: data.name || prev.name,
          description: data.description || prev.description,
          technologies: data.technologies ? data.technologies.join(", ") : prev.technologies,
          category: data.category || prev.category,
          author: data.author || prev.author,
          language: data.language || prev.language,
        }));
        
        setAlert({
          type: "success",
          message: "Données GitHub récupérées avec succès !",
          show: true
        });
      } else {
        setAlert({
          type: "error",
          message: data.error || "Erreur lors de la récupération des données GitHub",
          show: true
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        message: "Erreur lors de la récupération des données GitHub",
        show: true
      });
    } finally {
      setIsLoadingGitHub(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Fonction pour gérer le changement du lien GitHub
  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, link: value }));
    
    // Effacer l'erreur pour ce champ
    if (errors.link) {
      setErrors(prev => ({ ...prev, link: "" }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-card-foreground">
                Ajouter un nouveau projet
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Remplissez le formulaire ou utilisez l'auto-remplissage GitHub
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Aperçu des données GitHub */}
          {githubData && (
            <GitHubPreview
              data={githubData}
              onClose={() => setGitHubData(null)}
            />
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom du projet */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-card-foreground mb-2">
                Nom du projet *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-border"
                }`}
                placeholder="Ex: Mon Super Projet"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-card-foreground mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.description ? "border-red-500" : "border-border"
                }`}
                placeholder="Décrivez votre projet en quelques phrases..."
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Lien GitHub */}
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-card-foreground mb-2">
                Lien GitHub *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  id="link"
                  name="link"
                  value={formData.link}
                  onChange={handleLinkChange}
                  className={`flex-1 px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.link ? "border-red-500" : "border-border"
                  }`}
                  placeholder="https://github.com/username/project"
                />
                <button
                  type="button"
                  onClick={() => fetchGitHubData(formData.link)}
                  disabled={!formData.link.includes("github.com") || isLoadingGitHub}
                  className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoadingGitHub ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Chargement...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      Auto-remplir
                    </>
                  )}
                </button>
              </div>
              {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">
                  💡 Collez l'URL GitHub et cliquez sur "Auto-remplir" pour récupérer automatiquement les informations
                </p>
                <button
                  type="button"
                  onClick={() => setShowGuide(true)}
                  className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Aide
                </button>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <label htmlFor="technologies" className="block text-sm font-medium text-card-foreground mb-2">
                Technologies *
              </label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.technologies ? "border-red-500" : "border-border"
                }`}
                placeholder="React, Node.js, MongoDB (séparées par des virgules)"
              />
              {errors.technologies && <p className="text-red-500 text-sm mt-1">{errors.technologies}</p>}
              {formData.technologies && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.technologies.split(",").map((tech, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Catégorie et Langage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-card-foreground mb-2">
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.category ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-card-foreground mb-2">
                  Langage principal *
                </label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                    errors.language ? "border-red-500" : "border-border"
                  }`}
                >
                  <option value="">Sélectionner un langage</option>
                  {languages.map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
                {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
              </div>
            </div>

            {/* Auteur */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-card-foreground mb-2">
                Auteur *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.author ? "border-red-500" : "border-border"
                }`}
                placeholder="Votre nom d'utilisateur GitHub"
              />
              {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
            </div>

            {/* Boutons */}
            <div className="flex justify-end gap-4 pt-4 border-t border-border">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                disabled={isSubmitting}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Ajout en cours..." : "Ajouter le projet"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Alert */}
      <Alert
        type={alert.type}
        message={alert.message}
        show={alert.show}
        onClose={() => setAlert(prev => ({ ...prev, show: false }))}
      />

      {/* Guide d'intégration GitHub */}
      {showGuide && (
        <GitHubIntegrationGuide
          onClose={() => setShowGuide(false)}
        />
      )}
    </div>
  );
}
