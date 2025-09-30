"use client";

import { useState } from "react";
import Alert from "./Alert";

interface SyncGitHubButtonProps {
  onSyncComplete?: () => void;
}

export default function SyncGitHubButton({ onSyncComplete }: SyncGitHubButtonProps) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error" | "info"; message: string; show: boolean }>({
    type: "info",
    message: "",
    show: false
  });

  const handleSync = async () => {
    setIsSyncing(true);
    
    try {
      const response = await fetch("/api/sync-github", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setAlert({
          type: "success",
          message: `✅ Synchronisation réussie ! ${data.updatedCount} projets mis à jour.`,
          show: true
        });
        
        if (data.errors && data.errors.length > 0) {
          console.warn("Erreurs lors de la synchronisation:", data.errors);
        }
        
        if (onSyncComplete) {
          onSyncComplete();
        }
      } else {
        setAlert({
          type: "error",
          message: data.error || "Erreur lors de la synchronisation",
          show: true
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
      setAlert({
        type: "error",
        message: "Erreur lors de la synchronisation. Veuillez réessayer.",
        show: true
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSync}
        disabled={isSyncing}
        className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isSyncing ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Synchronisation...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Synchroniser avec GitHub
          </>
        )}
      </button>

      {/* Alert */}
      <Alert
        type={alert.type}
        message={alert.message}
        show={alert.show}
        onClose={() => setAlert(prev => ({ ...prev, show: false }))}
      />
    </>
  );
}
