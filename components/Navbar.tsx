"use client";

import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";
import { useFavorites } from "../hooks/useFavorites";
import { motion } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { favoritesCount, mounted } = useFavorites();

  const scrollToFavorites = () => {
    const favoritesSection = document.getElementById("favorites-section");
    if (favoritesSection) {
      favoritesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky md:top-4 top-0 z-50 w-full ">
      <div className=" max-w-6xl backdrop-blur border border-border md:rounded-2xl px-4 mx-auto flex h-16 items-center justify-between">
        {/* Logo et nom */}
        <div className="flex items-center">
          <Image
            src="/tg.png"
            alt="Drapeau du Togo"
            width={24}
            height={24}
            className=" object-contain w-7 mr-2"
          />
          <h1 className="text-xl font-bold text-foreground">OS228</h1>
        </div>

        {/* Navigation items */}
        <div className="flex items-center space-x-4">
          {/* Indicateur de favoris */}
          {mounted && (
            <motion.button
              onClick={scrollToFavorites}
              className="relative p-2 text-foreground hover:text-primary transition-colors duration-200 rounded-md hover:bg-primary/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={`${favoritesCount} favori${favoritesCount > 1 ? "s" : ""}`}
            >
              <svg
                className="w-5 h-5"
                fill={favoritesCount > 0 ? "#ef4444" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>

              {favoritesCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                >
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </motion.span>
              )}
            </motion.button>
          )}

          {/* Bouton Contribute avec logo GitHub */}
          <a
            href="https://github.com/Docteur-Parfait/os228"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Contribuer
          </a>

          {/* Switch de thème amélioré */}
          <motion.button
            onClick={toggleTheme}
            className="relative inline-flex h-8 w-16 items-center rounded-full bg-secondary/50 backdrop-blur transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 hover:bg-secondary/70"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`Passer en mode ${theme === "dark" ? "clair" : "sombre"}`}
          >
            {/* Icône Soleil */}
            <motion.div
              className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full ${
                theme === "light"
                  ? "bg-yellow-500 text-white"
                  : "bg-transparent text-muted-foreground"
              }`}
              animate={{
                scale: theme === "light" ? 1 : 0.8,
                opacity: theme === "light" ? 1 : 0.5,
              }}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
            </motion.div>

            {/* Icône Lune */}
            <motion.div
              className={`absolute right-1 flex h-6 w-6 items-center justify-center rounded-full ${
                theme === "dark"
                  ? "bg-blue-600 text-white"
                  : "bg-transparent text-muted-foreground"
              }`}
              animate={{
                scale: theme === "dark" ? 1 : 0.8,
                opacity: theme === "dark" ? 1 : 0.5,
              }}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </nav>
  );
}
