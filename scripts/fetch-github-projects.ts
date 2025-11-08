import { graphql } from '@octokit/graphql';
import fs from 'fs';
import path from 'path';

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

interface GitHubRepo {
    name: string;
    description: string;
    url: string;
    homepageUrl: string | null;
    isFork: boolean;
    languages: {
        nodes: Array<{ name: string }>;
    };
    repositoryTopics: {
        nodes: Array<{ topic: { name: string } }>;
    };
}

interface GitHubResponse {
    user: {
        pinnedItems: {
            nodes: GitHubRepo[];
        };
    };
}

async function fetchGitHubProjects(login: string, token?: string) {
    try {
        const graphqlWithAuth = graphql.defaults({
            headers: token ? {
                authorization: `token ${token}`,
            } : {},
        });

        const response = await graphqlWithAuth<GitHubResponse>(gqlQuery, {
            login,
            n: 6,
        });

        const repos = response.user.pinnedItems.nodes.filter(repo => !repo.isFork);

        const projects = repos.map((repo, index) => {
            const technologies = repo.languages.nodes.map(lang => lang.name);
            const topics = repo.repositoryTopics.nodes.map(t => t.topic.name);

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

function formatTitle(repoName: string): string {
    return repoName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

async function updatePortfolioConfig(login: string, token?: string) {
    const projects = await fetchGitHubProjects(login, token);

    console.log('\n📦 Fetched Projects:');
    console.log(JSON.stringify(projects, null, 2));

    const configPath = path.join(process.cwd(), 'config', 'portfolio.ts');
    let configContent = fs.readFileSync(configPath, 'utf-8');

    // Find the projects array and replace it
    const projectsStart = configContent.indexOf('projects: [');
    const projectsEnd = configContent.indexOf('],', projectsStart) + 2;

    if (projectsStart === -1 || projectsEnd === -1) {
        throw new Error('Could not find projects array in portfolio.ts');
    }

    const newProjectsSection = `projects: ${JSON.stringify(projects, null, 8).replace(/"([^"]+)":/g, '$1:')},`;

    configContent = configContent.substring(0, projectsStart) + newProjectsSection + configContent.substring(projectsEnd);

    fs.writeFileSync(configPath, configContent, 'utf-8');

    console.log('\n✅ Portfolio config updated successfully!');
    console.log(`📝 Updated ${projects.length} projects in config/portfolio.ts`);
}

// Main execution
const login = process.argv[2] || 'ayushjaipuriyar';
const token = process.env.GITHUB_TOKEN;

if (!token) {
    console.warn('⚠️  No GITHUB_TOKEN found. API rate limits will be lower.');
    console.warn('   Set GITHUB_TOKEN environment variable for higher rate limits.');
}

console.log(`\n🔍 Fetching pinned repositories for: ${login}`);

updatePortfolioConfig(login, token)
    .then(() => {
        console.log('\n🎉 Done!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    });
