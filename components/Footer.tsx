"use client";


const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Docteur-Parfait/os228",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        className="bi bi-github"
        viewBox="0 0 16 16"
      >
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M18.244 2.25h.077C18.852 2.25 19.3 2.7 19.3 3.25l-.008.223.008.224v2.4h.008c.552 0 1 .448 1 1s-.448 1-1 1h-.008v2.4h.008c.552 0 1 .448 1 1s-.448 1-1 1h-.008v2.4h.008c.552 0 1 .448 1 1s-.448 1-1 1h-.008v2.4h.008c.552 0 1 .448 1 1s-.448 1-1 1h-.008v.224l.008.223c0 .552-.448 1-1 1h-.077l-6.189-6.189L7.5 21.75H3.25c-.552 0-1-.448-1-1s.448-1 1-1h4.25l4.932-4.932L2.25 2.25zm-1.414 0L2.25 16.586 16.586 2.25z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 text-center">
            <p className="text-card-foreground">
              OS228 - OpenSource 228 | Hacktoberfest 2025
            </p>
            <p className="text-sm text-muted-foreground">
              Fait avec ❤️ par la communauté{" "}
              <a
                href="https://twitter.com/nightcoder228"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Night Coding
              </a>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="sr-only">{link.name}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
