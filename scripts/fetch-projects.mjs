import { graphql } from '@octokit/graphql';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const gqlQuery = `
  query($login: String!, $n: Int!) {
    user(login: $login) {
      pinnedItems(first: $n, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            isFork
            languages(first: 20) {
              nodes {
                name
              }
            }
            repositoryTopics(first: 20) {
              nodes {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchGitHubProjects(login, token) {
  try {
    const graphqlWithAuth = graphql.defaults({
      headers: token ? {
        authorization: `token ${token}`,
      } : {},
    });

    const response = await graphqlWithAuth(gqlQuery, {
      login,
      n: projectsLimit,
    });

    const repos = response.user.pinnedItems.nodes.filter(repo => !repo.isFork);

    const projects = repos.map((repo, index) => {
      const technologies = repo.languages.nodes.map(lang => lang.name);

      return {
        id: `project-${index + 1}`,
        title: formatTitle(repo.name),
        description: repo.description || 'No description available',
        image: `/images/projects/${repo.name.toLowerCase()}.jpg`,
        technologies: technologies.slice(0, 5),
        liveUrl: repo.homepageUrl || undefined,
        githubUrl: repo.url,
        featured: index < 3,
      };
    });

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    throw error;
  }
}

function formatTitle(repoName) {
  return repoName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Main execution
const login = process.argv[2] || process.env.GITHUB_USERNAME || 'ayushjaipuriyar';
const token = process.env.GITHUB_TOKEN;
const projectsLimit = parseInt(process.env.PROJECTS_LIMIT || '6', 10);

if (!token) {
  console.warn('⚠️  No GITHUB_TOKEN found. API rate limits will be lower.');
  console.warn('   Set GITHUB_TOKEN in .env.local for higher rate limits.');
  console.warn('   See .env.example for setup instructions.');
}

console.log(`\n🔍 Fetching pinned repositories for: ${login}`);

try {
  const projects = await fetchGitHubProjects(login, token);

  console.log('\n📦 Fetched Projects:');
  console.log(JSON.stringify(projects, null, 2));

  console.log('\n✅ Successfully fetched projects!');
  console.log(`📝 Found ${projects.length} pinned repositories`);

  // Write to a JSON file for easy import
  const outputPath = path.join(__dirname, '..', 'github-projects.json');
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  console.log(`💾 Saved to: github-projects.json`);

} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
