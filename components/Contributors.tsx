"use client";

import { useEffect, useState } from "react";

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

// Contributeurs de fallback en cas d'échec de l'API
const fallbackContributors: Contributor[] = [
  {
    id: 77333941,
    login: "Docteur-Parfait",
    avatar_url: "https://avatars.githubusercontent.com/u/77333941?v=4",
    html_url: "https://github.com/Docteur-Parfait",
    contributions: 25,
  },
  {
    id: 2,
    login: "Community",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/Docteur-Parfait/os228/graphs/contributors",
    contributions: 1,
  },
];

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchContributors = async () => {
      try {
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "OS228-Platform",
        };

        // Ajouter le token GitHub si disponible
        const token =
          process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        console.log("🔍 Tentative de récupération des contributeurs...");

        const response = await fetch(
          "https://api.github.com/repos/Docteur-Parfait/os228/contributors",
          { headers }
        );

        console.log(
          `📊 Réponse API contributeurs: ${response.status} ${response.statusText}`
        );

        if (!response.ok) {
          if (response.status === 403) {
            console.warn(
              "🚫 Rate limit atteint pour les contributeurs. Utilisation des contributeurs de fallback."
            );
            setUsingFallback(true);
            setContributors(fallbackContributors);
            return;
          }
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Contributeurs récupérés:", data);
        setContributors(data);
      } catch (err) {
        console.error("❌ Erreur lors du chargement des contributeurs:", err);
        console.log("📊 Utilisation des contributeurs de fallback");
        setUsingFallback(true);
        setContributors(fallbackContributors);
      } finally {
        setLoading(false);
      }
    };

    fetchContributors();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-muted-foreground">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Chargement des contributeurs...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">
        Nos Incroyables Contributeurs
        {usingFallback && (
          <span className="text-xs text-muted-foreground ml-2">
            (données locales)
          </span>
        )}
      </h3>

      {contributors.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-3">
          {contributors.map((contributor) => (
            <a
              key={contributor.id}
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative hover:z-10"
              title={`${contributor.login} - ${
                contributor.contributions
              } contribution${contributor.contributions > 1 ? "s" : ""}`}
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-12 h-12 rounded-full border-2 border-border hover:border-primary transition-all duration-200 group-hover:scale-110"
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    contributor.login
                  )}&background=16a34a&color=fff&size=48`;
                }}
              />
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Aucun contributeur trouvé pour le moment.</p>
          <p className="text-xs mt-2">
            Soyez le premier à contribuer au projet OS228 ! 🚀
          </p>
        </div>
      )}

      {usingFallback && (
        <p className="text-xs text-muted-foreground mt-3">
          💡 Les données en temps réel nécessitent un token GitHub pour éviter
          les limites de l'API.
        </p>
      )}
    </div>
  );
}
