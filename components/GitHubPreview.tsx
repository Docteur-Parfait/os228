"use client";

interface GitHubPreviewProps {
  data: {
    name: string;
    description: string;
    author: string;
    stars: number;
    language: string;
    technologies: string[];
    avatar_url?: string;
  };
  onClose: () => void;
}

export default function GitHubPreview({ data, onClose }: GitHubPreviewProps) {
  return (
    <div className="bg-secondary/50 border border-border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-card-foreground flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          Données GitHub récupérées
        </h3>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {data.avatar_url && (
            <img 
              src={data.avatar_url} 
              alt={data.author}
              className="w-6 h-6 rounded-full"
            />
          )}
          <span className="text-sm font-medium text-card-foreground">{data.name}</span>
          <span className="text-xs text-muted-foreground">par {data.author}</span>
        </div>
        
        <p className="text-sm text-muted-foreground">{data.description}</p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span>⭐</span>
            {data.stars} étoiles
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            {data.language}
          </span>
        </div>
        
        {data.technologies.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {data.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
