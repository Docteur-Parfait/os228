"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ProjectWithStats } from "../data/projects";
import { generateShareText, getPlatformUrl } from "../lib/config";

interface ShareButtonsProps {
  project: ProjectWithStats;
  variant?: "horizontal" | "vertical" | "compact";
  size?: "sm" | "md" | "lg";
}

export default function ShareButtons({
  project,
  variant = "horizontal",
  size = "md",
}: ShareButtonsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-2 opacity-50">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Utiliser directement l'URL GitHub du projet pour le partage
  const projectUrl = project.link;
  const shareText = generateShareText(project.name, project.description);

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(projectUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      projectUrl
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      projectUrl
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${shareText} ${projectUrl}`
    )}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(
      projectUrl
    )}&text=${encodeURIComponent(shareText)}`,
  };

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const buttonSizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-2.5",
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} ${projectUrl}`);
      // Vous pouvez ajouter une notification toast ici
      console.log("Lien copié !");
    } catch (err) {
      console.error("Erreur lors de la copie:", err);
    }
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const shareButtons = [
    {
      name: "Twitter",
      icon: (
        <svg
          className={sizeClasses[size]}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      color: "hover:bg-blue-500/10 hover:text-blue-500",
      action: () => handleShare("twitter"),
    },
    {
      name: "LinkedIn",
      icon: (
        <svg
          className={sizeClasses[size]}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "hover:bg-blue-600/10 hover:text-blue-600",
      action: () => handleShare("linkedin"),
    },
    {
      name: "WhatsApp",
      icon: (
        <svg
          className={sizeClasses[size]}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
        </svg>
      ),
      color: "hover:bg-green-500/10 hover:text-green-500",
      action: () => handleShare("whatsapp"),
    },
    {
      name: "Telegram",
      icon: (
        <svg
          className={sizeClasses[size]}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      color: "hover:bg-blue-400/10 hover:text-blue-400",
      action: () => handleShare("telegram"),
    },
    {
      name: "Copier",
      icon: (
        <svg
          className={sizeClasses[size]}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
        </svg>
      ),
      color: "hover:bg-gray-500/10 hover:text-gray-500",
      action: copyToClipboard,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const containerClass =
    variant === "vertical"
      ? "flex flex-col gap-2"
      : variant === "compact"
      ? "flex gap-1"
      : "flex gap-2";

  return (
    <motion.div
      className={`${containerClass} ${
        variant === "compact" ? "justify-center" : ""
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {shareButtons.map((button) => (
        <motion.button
          key={button.name}
          onClick={button.action}
          className={`
            ${buttonSizeClasses[size]}
            rounded-full
            transition-all
            duration-200
            text-muted-foreground
            ${button.color}
            focus:outline-none
            focus:ring-2
            focus:ring-primary/50
          `}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          title={`Partager sur ${button.name}`}
        >
          {button.icon}
        </motion.button>
      ))}
    </motion.div>
  );
}
