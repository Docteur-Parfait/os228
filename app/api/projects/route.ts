import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Project } from "../../../data/projects";

const PROJECTS_FILE = path.join(process.cwd(), "data", "projects.json");

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation des données
    const { name, description, link, technologies, category, author, language } = body;
    
    if (!name || !description || !link || !technologies || !category || !author || !language) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Validation du lien GitHub
    if (!link.includes("github.com")) {
      return NextResponse.json(
        { error: "Le lien doit être un lien GitHub valide" },
        { status: 400 }
      );
    }

    // Lire le fichier JSON existant
    const fileContent = await fs.readFile(PROJECTS_FILE, "utf8");
    const projects: Project[] = JSON.parse(fileContent);
    
    // Générer un nouvel ID (plus grand que tous les IDs existants)
    const maxId = Math.max(...projects.map(p => p.id), 0);
    const newId = maxId + 1;
    
    // Créer le nouveau projet
    const newProject: Project = {
      id: newId,
      name: name.trim(),
      description: description.trim(),
      link: link.trim(),
      technologies: Array.isArray(technologies) ? technologies : technologies.split(",").map(tech => tech.trim()),
      category: category.trim(),
      author: author.trim(),
      stars: 0,
      language: language.trim()
    };
    
    // Ajouter le nouveau projet au début du tableau
    const updatedProjects = [newProject, ...projects];
    
    // Écrire le fichier mis à jour
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(updatedProjects, null, 2));
    
    return NextResponse.json(newProject, { status: 201 });
    
  } catch (error) {
    console.error("Erreur lors de l'ajout du projet:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const fileContent = await fs.readFile(PROJECTS_FILE, "utf8");
    const projects: Project[] = JSON.parse(fileContent);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Erreur lors de la lecture des projets:", error);
    return NextResponse.json(
      { error: "Erreur lors de la lecture des projets" },
      { status: 500 }
    );
  }
}
