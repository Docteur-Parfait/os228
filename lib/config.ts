// Configuration centralisée pour OS228
export const config = {
  // URLs de la plateforme
  platform: {
    github: "https://github.com/Docteur-Parfait/os228",
    // Ajoutez ici l'URL de production quand vous déployez
    // production: "https://os228.vercel.app",
    // ou tout autre domaine que vous utiliserez
  },

  // Métadonnées de partage
  sharing: {
    platformName: "OS228 - OpenSource 228",
    platformDescription:
      "Plateforme qui regroupe les projets open source du Togo pour le Hacktoberfest 2025. Découvrez et contribuez aux projets de la communauté tech togolaise !",
    hashtags: "#OS228 #OpenSource #Togo #Hacktoberfest2025",
    country: "🇹🇬",
  },

  // Configuration GitHub
  github: {
    owner: "Docteur-Parfait",
    repo: "os228",
  },
};

// Fonction utilitaire pour obtenir l'URL de partage de la plateforme
export function getPlatformUrl(): string {
  // En production, utilisez l'URL de production
  // En développement, utilisez GitHub
  if (
    typeof window !== "undefined" &&
    window.location.origin.includes("localhost")
  ) {
    return config.platform.github;
  }

  // TODO: Remplacez par votre URL de production une fois déployée
  // return config.platform.production || config.platform.github;
  return config.platform.github;
}

// Fonction pour générer le texte de partage d'un projet
export function generateShareText(
  projectName: string,
  projectDescription: string
): string {
  return `Découvrez ${projectName} - ${projectDescription} ${config.sharing.country} ${config.sharing.hashtags}`;
}

// Fonction pour générer le texte de partage de la plateforme
export function generatePlatformShareText(): string {
  return `${config.sharing.platformDescription} ${config.sharing.country} ${config.sharing.hashtags}`;
}
