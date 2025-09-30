"use client";

interface GitHubIntegrationGuideProps {
  onClose: () => void;
}

export default function GitHubIntegrationGuide({ onClose }: GitHubIntegrationGuideProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-card border border-border rounded-lg max-w-lg w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-card-foreground">
              🚀 Auto-remplissage GitHub
            </h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4 text-sm text-card-foreground">
            <div className="bg-secondary/50 border border-border rounded-lg p-4">
              <h3 className="font-medium mb-2">✨ Comment ça marche ?</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Collez l'URL de votre repository GitHub</li>
                <li>Cliquez sur "Auto-remplir"</li>
                <li>Les informations sont automatiquement récupérées</li>
                <li>Modifiez si nécessaire et validez</li>
              </ol>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">📋 Données récupérées automatiquement :</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li><strong>Nom du projet</strong> - Titre du repository</li>
                <li><strong>Description</strong> - Description GitHub</li>
                <li><strong>Auteur</strong> - Propriétaire du repository</li>
                <li><strong>Langage principal</strong> - Langage détecté par GitHub</li>
                <li><strong>Technologies</strong> - Topics et langages</li>
                <li><strong>Catégorie</strong> - Détectée automatiquement</li>
                <li><strong>Étoiles</strong> - Nombre d'étoiles actuelles</li>
              </ul>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
              <p className="text-primary font-medium">💡 Astuce</p>
              <p className="text-sm text-muted-foreground mt-1">
                Vous pouvez toujours modifier les informations récupérées avant de valider le formulaire.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <button
                onClick={onClose}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
