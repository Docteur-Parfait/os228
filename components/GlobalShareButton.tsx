"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ShareButtons from "./ShareButtons";
import { config } from "../lib/config";

export default function GlobalShareButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const platformProject = {
    id: 0,
    name: config.sharing.platformName,
    description: config.sharing.platformDescription,
    link: config.platform.github,
    author: "Communauté OS228",
    language: "TypeScript",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web Development",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 bg-card border border-border rounded-lg p-4 shadow-xl backdrop-blur"
          >
            <div className="mb-3">
              <h4 className="font-semibold text-foreground mb-1">
                Partager OS228
              </h4>
              <p className="text-sm text-muted-foreground">
                Aidez-nous à faire connaître les projets togolais !
              </p>
            </div>
            <ShareButtons
              project={platformProject}
              variant="vertical"
              size="md"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full shadow-lg backdrop-blur border border-border
          flex items-center justify-center transition-all duration-200
          ${
            isOpen
              ? "bg-primary text-primary-foreground"
              : "bg-card hover:bg-primary/10 text-foreground hover:text-primary"
          }
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Partager OS228"
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}
