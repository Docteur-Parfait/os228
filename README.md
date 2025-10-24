# OS228 - OpenSource 228

![OS228 Logo](https://img.shields.io/badge/OS228-OpenSource%20228-green?style=for-the-badge&logo=github)
![Hacktoberfest 2025](https://img.shields.io/badge/Hacktoberfest-2025-orange?style=for-the-badge&logo=digitalocean)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

**OS228** est une plateforme qui regroupe les projets open source du Togo dans le cadre du **Hacktoberfest 2025**. Cette initiative vise à promouvoir l'écosystème technologique togolais et à encourager la contribution aux projets open source.

## 🌟 À propos

OS228 (OpenSource 228) est une plateforme communautaire qui met en avant les projets open source développés par la communauté tech du Togo. Le "228" fait référence à l'indicatif téléphonique du Togo, symbolisant notre attachement à notre pays.

## 🚀 Fonctionnalités

- 📋 **Liste des projets** : Découvrez tous les projets open source du Togo
- 🎨 **Interface moderne** : Design responsive avec thème vert sombre (open source)
- 🔄 **Facilité de contribution** : Ajout simple de nouveaux projets
- 🌐 **Multilingue** : Interface en français
- 📱 **Responsive** : Compatible mobile, tablette et desktop
- 🔐 **Authentification GitHub** : Connectez-vous pour voir vos contributions
- 📊 **Profil utilisateur** : Statistiques de contributions et repositories
- 🎯 **Suivi des contributions** : Visualisez vos contributions récentes

## 🛠️ Technologies utilisées

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS
- **React 19** - Bibliothèque UI
- **NextAuth.js v5** - Authentification OAuth
- **Framer Motion** - Animations
- **GitHub API** - Statistiques de contributions

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+
- npm, yarn, pnpm ou bun

### Installation

1. **Cloner le repository**

   ```bash
   git clone https://github.com/Docteur-Parfait/os228.git
   cd os228
   ```

2. **Installer les dépendances**

   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   # ou
   bun install
   ```

3. **Lancer le serveur de développement**

   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   # ou
   bun dev
   ```

4. **Ouvrir dans le navigateur**

   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🔐 Configuration de l'authentification GitHub (Optionnel)

Pour activer la fonctionnalité de profil et contributions :

1. **Créez une GitHub OAuth App** : Suivez le guide détaillé dans [SETUP_GITHUB_AUTH.md](SETUP_GITHUB_AUTH.md)

2. **Configurez les variables d'environnement** :
   ```bash
   # Créez un fichier .env.local à la racine
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=votre-secret-aleatoire
   GITHUB_CLIENT_ID=votre-client-id
   GITHUB_CLIENT_SECRET=votre-client-secret
   ```

3. **Redémarrez le serveur** pour appliquer les changements

Pour plus de détails, consultez la [documentation complète](SETUP_GITHUB_AUTH.md).

## 🤝 Comment contribuer

Nous accueillons toutes les contributions ! Voici comment vous pouvez participer :

### 1. Contribuer au code

1. **Fork** le repository
2. **Créer une branche** pour votre fonctionnalité
   ```bash
   git checkout -b feature/nom-de-votre-fonctionnalite
   ```
3. **Faire vos modifications** et les commiter
   ```bash
   git commit -m "Ajout: description de votre modification"
   ```
4. **Pousser** vers votre fork
   ```bash
   git push origin feature/nom-de-votre-fonctionnalite
   ```
5. **Créer une Pull Request**

### 2. Ajouter un projet open source

Pour ajouter votre projet à la liste :

1. **Modifier le fichier** `data/projects.json`
2. **Ajouter votre projet** avec la structure suivante :

```json
{
  "id": 4,
  "name": "Nom de votre projet",
  "description": "Description détaillée de votre projet",
  "link": "https://github.com/votre-username/votre-projet",
  "technologies": ["React", "Node.js", "MongoDB"],
  "category": "Web Development",
  "author": "Votre nom d'utilisateur",
  "language": "TypeScript",
  "date_added": "YYYY-MM-DD"
}
```

3. **Créer une Pull Request** avec vos modifications

> **Note** : Le fichier `projects.ts` lit automatiquement les données depuis `projects.json`, donc vous n'avez besoin de modifier que le fichier JSON !

### 3. Signaler un bug

- Utilisez les **Issues** GitHub pour signaler des bugs
- Décrivez clairement le problème et les étapes pour le reproduire

### 4. Proposer une amélioration

- Créez une **Issue** avec le label "enhancement"
- Décrivez votre idée d'amélioration

## 📋 Structure du projet

```
os228/
├── app/                    # Pages Next.js
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── Navbar.tsx        # Barre de navigation
│   └── ProjectCard.tsx   # Carte de projet
├── data/                 # Données
│   └── projects.json     # Liste des projets
├── public/               # Assets statiques
└── README.md            # Documentation
```

## 🎯 Hacktoberfest 2025

Ce projet participe au **Hacktoberfest 2025** !

- ✅ **Issues** étiquetées `hacktoberfest` sont prêtes pour les contributions
- 🏷️ **Labels** : `good first issue`, `help wanted`, `hacktoberfest`
- 🎁 **Récompenses** : Une prière tech

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Auteurs

- **Docteur-Parfait** - _Créateur initial_ - [@Docteur-Parfait](https://github.com/Docteur-Parfait)

## 🙏 Remerciements

- La communauté tech du Togo
- Les organisateurs du Hacktoberfest
- Tous les contributeurs open source

## 📞 Contact

- **GitHub** : [@Docteur-Parfait](https://github.com/Docteur-Parfait)
- **Repository** : [os228](https://github.com/Docteur-Parfait/os228)

---

**Fait avec ❤️ par la communauté tech du Togo 🇹🇬**
