"use client";

interface GitHubStatsProps {
  stars: number;
  forks: number;
  language: string;
  avatar_url?: string;
  author: string;
}

export default function GitHubStats({ stars, forks, language, avatar_url, author }: GitHubStatsProps) {
  return (
    <div className="flex items-center justify-between text-sm">
      {/* Statistiques GitHub */}
      <div className="flex items-center gap-4 text-muted-foreground">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500">⭐</span>
          <span className="font-medium">{stars.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-gray-500">🍴</span>
          <span className="font-medium">{forks.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <span className="font-medium">{language}</span>
        </div>
      </div>

      {/* Auteur avec avatar */}
      <div className="flex items-center gap-2">
        {avatar_url && (
          <img 
            src={avatar_url} 
            alt={author}
            className="w-5 h-5 rounded-full border border-border"
          />
        )}
        <span className="text-muted-foreground">
          <span className="font-medium">{author}</span>
        </span>
      </div>
    </div>
  );
}
