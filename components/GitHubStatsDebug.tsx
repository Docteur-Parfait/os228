"use client";

import { useState } from "react";
import { getGitHubStats, extractGitHubInfo } from "../lib/github";

export default function GitHubStatsDebug() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testGitHubAPI = async () => {
    setTesting(true);
    setResult(null);

    try {
      console.log("🔍 Test de l'API GitHub...");

      // Test avec un repo simple
      const testRepo = "https://github.com/Docteur-Parfait/os228";
      const githubInfo = extractGitHubInfo(testRepo);

      console.log("📋 Info extraite:", githubInfo);

      if (githubInfo) {
        const stats = await getGitHubStats(githubInfo.owner, githubInfo.repo);
        console.log("📊 Stats récupérées:", stats);
        setResult({ githubInfo, stats, success: true });
      } else {
        setResult({
          error: "Impossible d'extraire les infos GitHub",
          success: false,
        });
      }
    } catch (error) {
      console.error("❌ Erreur:", error);
      setResult({ error: String(error), success: false });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-card border border-border rounded-lg p-4 max-w-sm">
      <h3 className="font-bold mb-2">🔧 Debug GitHub Stats</h3>

      <button
        onClick={testGitHubAPI}
        disabled={testing}
        className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm disabled:opacity-50"
      >
        {testing ? "Test en cours..." : "Tester API GitHub"}
      </button>

      {result && (
        <div className="mt-3 text-xs">
          <div
            className={`p-2 rounded ${
              result.success
                ? "bg-green-100 dark:bg-green-900"
                : "bg-red-100 dark:bg-red-900"
            }`}
          >
            {result.success ? (
              <div>
                <div>✅ Succès!</div>
                <div>Owner: {result.githubInfo?.owner}</div>
                <div>Repo: {result.githubInfo?.repo}</div>
                <div>Stars: {result.stats?.stars}</div>
                <div>Forks: {result.stats?.forks}</div>
              </div>
            ) : (
              <div>❌ Erreur: {result.error}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
