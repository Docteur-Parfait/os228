"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Plus } from "lucide-react";

const projectSchema = z.object({
    name: z.string().min(1, "Le nom du projet est requis").min(3, "Le nom doit contenir au moins 3 caractères"),
    description: z.string().min(1, "La description est requise").min(10, "La description doit contenir au moins 10 caractères"),
    link: z.string().min(1, "Le lien GitHub est requis").url("Le lien doit être une URL valide").refine(
        (url) => url.includes("github.com"),
        "Le lien doit être un lien GitHub valide"
    ),
    technologies: z.string().min(1, "Au moins une technologie est requise"),
    category: z.string().min(1, "La catégorie est requise"),
    author: z.string().min(1, "L'auteur est requis").min(2, "Le nom de l'auteur doit contenir au moins 2 caractères"),
    language: z.string().min(1, "Le langage principal est requis"),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface AddProjectModalProps {
    onProjectAdded?: () => void;
}

const categories = [
    "Web Development",
    "Mobile Development",
    "Desktop Application",
    "Developer Tools",
    "AI/Machine Learning",
    "Data Science",
    "DevOps",
    "Game Development",
    "Open Source",
    "Library/Framework",
    "API/Backend",
    "Frontend",
    "Full Stack",
    "Other"
];

const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "C++",
    "C",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "Dart",
    "HTML/CSS",
    "Shell",
    "Other"
];

export default function AddProjectModal({ onProjectAdded }: AddProjectModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
            link: "",
            technologies: "",
            category: "",
            author: "",
            language: "",
        },
    });

    const onSubmit = async (data: ProjectFormData) => {
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            // Convertir les technologies en tableau
            const technologiesArray = data.technologies
                .split(",")
                .map(tech => tech.trim())
                .filter(tech => tech.length > 0);

            const projectData = {
                ...data,
                technologies: technologiesArray,
            };

            const response = await fetch("/api/projects/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Erreur lors de l'ajout du projet");
            }

            setSubmitSuccess(true);
            form.reset();
            setTimeout(() => {
                setIsOpen(false);
                setSubmitSuccess(false);
                onProjectAdded?.();
            }, 2000);

        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Une erreur inconnue s'est produite");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            form.reset();
            setSubmitError(null);
            setSubmitSuccess(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Ajouter un projet
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Ajouter un nouveau projet</DialogTitle>
                </DialogHeader>

                {submitSuccess && (
                    <Alert className="border-green-200 bg-green-50 text-green-800">
                        <AlertDescription>
                            ✅ Projet ajouté avec succès ! Le modal va se fermer automatiquement.
                        </AlertDescription>
                    </Alert>
                )}

                {submitError && (
                    <Alert className="border-red-200 bg-red-50 text-red-800">
                        <AlertDescription>
                            ❌ {submitError}
                        </AlertDescription>
                    </Alert>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Nom du projet */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nom du projet *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="ex: Mon Super Projet"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Décrivez votre projet en quelques phrases..."
                                            className="min-h-[100px]"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Lien GitHub */}
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lien GitHub *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://github.com/username/repository"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Technologies */}
                        <FormField
                            control={form.control}
                            name="technologies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Technologies *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="React, TypeScript, Node.js (séparées par des virgules)"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Catégorie */}
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Catégorie *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isSubmitting}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner une catégorie" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Langage principal */}
                            <FormField
                                control={form.control}
                                name="language"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Langage principal *</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            disabled={isSubmitting}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Sélectionner un langage" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {languages.map((language) => (
                                                    <SelectItem key={language} value={language}>
                                                        {language}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Auteur */}
                        <FormField
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Auteur *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Votre nom d'utilisateur GitHub"
                                            {...field}
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Boutons */}
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsOpen(false)}
                                disabled={isSubmitting}
                            >
                                Annuler
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting || submitSuccess}
                                className="min-w-[120px]"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Ajout...
                                    </>
                                ) : submitSuccess ? (
                                    "✅ Ajouté"
                                ) : (
                                    "Ajouter le projet"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}