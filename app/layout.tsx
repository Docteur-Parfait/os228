import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../contexts/ThemeContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OS228 - OpenSource 228 | Projets Open Source du Togo",
  description:
    "Plateforme regroupant les projets open source du Togo dans le cadre du Hacktoberfest 2025. Découvrez, contribuez et participez à l'écosystème technologique togolais.",
  keywords:
    "open source, togo, hacktoberfest, développement, technologie, communauté",
  authors: [{ name: "Docteur-Parfait" }],
  openGraph: {
    title: "OS228 - OpenSource 228",
    description:
      "Plateforme des projets open source du Togo pour le Hacktoberfest 2025",
    type: "website",
    url: "https://github.com/Docteur-Parfait/os228",
    images: [
      {
        url: "/seo.png",
        width: 1200,
        height: 630,
        alt: "OS228 - OpenSource 228 | Projets Open Source du Togo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OS228 - OpenSource 228",
    description:
      "Plateforme des projets open source du Togo pour le Hacktoberfest 2025",
    images: ["/seo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
