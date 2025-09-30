import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

interface ProjectData {
    name: string;
    description: string;
    link: string;
    technologies: string[];
    category: string;
    author: string;
    language: string;
}

interface Project extends ProjectData {
    id: number;
}

function validateProjectData(data: any): data is ProjectData {
    const requiredFields = ['name', 'description', 'link', 'technologies', 'category', 'author', 'language'];

    for (const field of requiredFields) {
        if (!data[field]) {
            return false;
        }
    }

    if (typeof data.name !== 'string' || data.name.length < 3) {
        return false;
    }

    if (typeof data.description !== 'string' || data.description.length < 10) {
        return false;
    }

    if (typeof data.link !== 'string' || !data.link.includes('github.com')) {
        return false;
    }

    if (!Array.isArray(data.technologies) || data.technologies.length === 0) {
        return false;
    }

    if (typeof data.category !== 'string' || data.category.length === 0) {
        return false;
    }

    if (typeof data.author !== 'string' || data.author.length < 2) {
        return false;
    }

    if (typeof data.language !== 'string' || data.language.length === 0) {
        return false;
    }

    return true;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!validateProjectData(body)) {
            return NextResponse.json(
                { error: "Données du projet invalides. Veuillez vérifier tous les champs." },
                { status: 400 }
            );
        }

        const projectsPath = path.join(process.cwd(), 'data', 'projects.json');

        let existingProjects: Project[] = [];
        try {
            const fileContent = await fs.readFile(projectsPath, 'utf-8');
            existingProjects = JSON.parse(fileContent);
        } catch (error) {
            existingProjects = [];
        }

        const existingProject = existingProjects.find(
            project =>
                project.name.toLowerCase() === body.name.toLowerCase() ||
                project.link === body.link
        );

        if (existingProject) {
            return NextResponse.json(
                { error: "Un projet avec ce nom ou ce lien GitHub existe déjà." },
                { status: 409 }
            );
        }

        const newId = existingProjects.length > 0
            ? Math.max(...existingProjects.map(p => p.id)) + 1
            : 1;

        const newProject: Project = {
            id: newId,
            name: body.name.trim(),
            description: body.description.trim(),
            link: body.link.trim(),
            technologies: body.technologies.map((tech: string) => tech.trim()),
            category: body.category.trim(),
            author: body.author.trim(),
            language: body.language.trim(),
        };

        existingProjects.push(newProject);

        existingProjects.sort((a, b) => b.id - a.id);

        await fs.writeFile(
            projectsPath,
            JSON.stringify(existingProjects, null, 4),
            'utf-8'
        );

        return NextResponse.json(
            {
                message: "Projet ajouté avec succès!",
                project: newProject
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Erreur lors de l\'ajout du projet:', error);
        return NextResponse.json(
            { error: "Erreur interne du serveur. Veuillez réessayer." },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const projectsPath = path.join(process.cwd(), 'data', 'projects.json');
        const fileContent = await fs.readFile(projectsPath, 'utf-8');
        const projects = JSON.parse(fileContent);

        return NextResponse.json(projects);
    } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        return NextResponse.json(
            { error: "Erreur lors de la récupération des projets" },
            { status: 500 }
        );
    }
}