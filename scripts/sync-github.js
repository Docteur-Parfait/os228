const fs = require('fs');
const path = require('path');

const PROJECTS_FILE = path.join(__dirname, '../data/projects.json');

async function fetchGitHubData(owner, repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OS228-Platform'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repoData = await response.json();

    // Récupérer les topics
    const topicsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/topics`, {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json',
        'User-Agent': 'OS228-Platform'
      }
    });

    let topics = [];
    if (topicsResponse.ok) {
      const topicsData = await topicsResponse.json();
      topics = topicsData.names || [];
    }

    return {
      name: repoData.name,
      description: repoData.description,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      language: repoData.language,
      avatar_url: repoData.owner.avatar_url,
      author: repoData.owner.login,
      topics: topics
    };
  } catch (error) {
    console.error(`Erreur pour ${owner}/${repo}:`, error.message);
    return null;
  }
}

function getCategory(language, topics) {
  const allText = `${language} ${topics.join(" ")}`.toLowerCase();
  
  if (allText.includes("web") || allText.includes("react") || allText.includes("vue") || allText.includes("angular")) {
    return "Web Development";
  }
  if (allText.includes("mobile") || allText.includes("flutter") || allText.includes("react-native") || allText.includes("swift") || allText.includes("kotlin")) {
    return "Mobile Development";
  }
  if (allText.includes("desktop") || allText.includes("electron") || allText.includes("qt")) {
    return "Desktop Application";
  }
  if (allText.includes("devops") || allText.includes("docker") || allText.includes("kubernetes") || allText.includes("ci/cd")) {
    return "DevOps";
  }
  if (allText.includes("data") || allText.includes("machine") || allText.includes("ai") || allText.includes("ml")) {
    return "Data Science";
  }
  if (allText.includes("tool") || allText.includes("cli") || allText.includes("utility")) {
    return "Developer Tools";
  }
  
  return "Open Source";
}

async function syncProjects() {
  try {
    console.log('🔄 Début de la synchronisation GitHub...');
    
    // Lire le fichier JSON existant
    const fileContent = fs.readFileSync(PROJECTS_FILE, 'utf8');
    const projects = JSON.parse(fileContent);
    
    const updatedProjects = [];
    const errors = [];
    
    for (const project of projects) {
      console.log(`\n📦 Traitement de: ${project.name}`);
      
      try {
        // Extraire owner et repo de l'URL GitHub
        const githubUrlRegex = /github\.com\/([^\/]+)\/([^\/]+)/;
        const match = project.link.match(githubUrlRegex);
        
        if (!match) {
          console.warn(`❌ URL GitHub invalide pour ${project.name}: ${project.link}`);
          updatedProjects.push(project);
          continue;
        }

        const [, owner, repo] = match;
        const cleanRepo = repo.replace(/\.git$/, "");
        
        console.log(`🔍 Récupération des données pour ${owner}/${cleanRepo}...`);
        
        const githubData = await fetchGitHubData(owner, cleanRepo);
        
        if (!githubData) {
          console.warn(`❌ Impossible de récupérer les données pour ${project.name}`);
          updatedProjects.push(project);
          continue;
        }
        
        // Mettre à jour le projet
        const updatedProject = {
          ...project,
          name: githubData.name,
          description: githubData.description || project.description,
          stars: githubData.stars,
          forks: githubData.forks,
          language: githubData.language || project.language,
          avatar_url: githubData.avatar_url,
          author: githubData.author,
          category: getCategory(githubData.language, githubData.topics),
          technologies: [
            githubData.language,
            ...githubData.topics.slice(0, 4)
          ].filter(Boolean)
        };
        
        updatedProjects.push(updatedProject);
        console.log(`✅ ${project.name} mis à jour - ⭐${githubData.stars} 🍴${githubData.forks}`);
        
        // Pause pour éviter de surcharger l'API GitHub
        await new Promise(resolve => setTimeout(resolve, 200));
        
      } catch (error) {
        console.error(`❌ Erreur pour ${project.name}:`, error.message);
        errors.push(`${project.name}: ${error.message}`);
        updatedProjects.push(project);
      }
    }
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(PROJECTS_FILE, JSON.stringify(updatedProjects, null, 2));
    
    console.log(`\n🎉 Synchronisation terminée !`);
    console.log(`📊 ${updatedProjects.length} projets traités`);
    
    if (errors.length > 0) {
      console.log(`\n⚠️ Erreurs rencontrées:`);
      errors.forEach(error => console.log(`   - ${error}`));
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
  }
}

// Exécuter la synchronisation
syncProjects();
