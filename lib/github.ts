import { graphql } from '@octokit/graphql';
import { slugify } from '@/lib/utils';

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
            updatedAt
            stargazerCount
            owner {
              login
            }
            previewImage: object(expression: "HEAD:assets/preview.png") {
              ... on Blob {
                oid
              }
            }
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

const allReposQuery = `
  query($login: String!, $n: Int!) {
    user(login: $login) {
      repositories(first: $n, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
        nodes {
          name
          description
          url
          homepageUrl
          isFork
          updatedAt
          stargazerCount
          owner {
            login
          }
          previewImage: object(expression: "HEAD:assets/preview.png") {
            ... on Blob {
              oid
            }
          }
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
`;

interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  isFork: boolean;
  updatedAt: string;
  stargazerCount: number;
  owner: {
    login: string;
  };
  previewImage: {
    oid: string;
  } | null;
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

interface AllReposResponse {
  user: {
    repositories: {
      nodes: GitHubRepo[];
    };
  };
}

export interface Project {
  id: string;
  slug: string;
  owner: string;
  repoName: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  updatedAt?: string;
  stargazerCount?: number;
}

const DEFAULT_PROJECT_IMAGE = '/images/projects/default.webp';

function formatTitle(repoName: string): string {
  return repoName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getRepoImageUrl(owner: string, repoName: string, hasPreview: boolean): string {
  if (hasPreview) {
    return `https://raw.githubusercontent.com/${owner}/${repoName}/main/assets/preview.png`;
  }
  return DEFAULT_PROJECT_IMAGE;
}

async function graphqlWithAuth() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return null;
  }

  return graphql.defaults({
    headers: {
      authorization: `token ${token}`,
    },
  });
}

export async function fetchGitHubReadme(owner: string, repoName: string): Promise<string | null> {
  const client = await graphqlWithAuth();

  if (!client) {
    console.warn('⚠️  No GITHUB_TOKEN found. Skipping README fetch.');
    return null;
  }

  const readmeQuery = `
    query($owner: String!, $name: String!, $expression: String!) {
      repository(owner: $owner, name: $name) {
        readme: object(expression: $expression) {
          ... on Blob {
            text
          }
        }
      }
    }
  `;

  const expressions = ['HEAD:README.md', 'HEAD:README.mdx', 'HEAD:readme.md'];

  for (const expression of expressions) {
    try {
      const response = await client<{
        repository: { readme: { text: string } | null };
      }>(readmeQuery, {
        owner,
        name: repoName,
        expression,
      });

      if (response.repository.readme?.text) {
        return response.repository.readme.text;
      }
    } catch (error) {
      console.error('Error fetching README:', error);
      return null;
    }
  }

  return null;
}

export async function fetchGitHubProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'ayushjaipuriyar';
  const limit = parseInt(process.env.PROJECTS_LIMIT || '6', 10);

  if (!token) {
    console.warn('⚠️  No GITHUB_TOKEN found. Using fallback projects.');
    return [];
  }

  try {
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });

    const response = await graphqlWithAuth<GitHubResponse>(gqlQuery, {
      login: username,
      n: limit,
    });

    const repos = response.user.pinnedItems.nodes.filter((repo) => !repo.isFork);

    const projects: Project[] = repos.map((repo, index) => {
      const technologies = repo.languages.nodes.map((lang) => lang.name);
      const tags = repo.repositoryTopics.nodes.map((t) => t.topic.name);
      const hasPreview = repo.previewImage !== null;
      const title = formatTitle(repo.name);

      return {
        id: `${repo.owner.login}/${repo.name}`,
        slug: slugify(repo.name),
        owner: repo.owner.login,
        repoName: repo.name,
        title,
        description: repo.description || 'No description available',
        image: getRepoImageUrl(repo.owner.login, repo.name, hasPreview),
        technologies: technologies.slice(0, 5),
        tags: tags,
        liveUrl: repo.homepageUrl || undefined,
        githubUrl: repo.url,
        featured: index < 3,
        updatedAt: repo.updatedAt,
        stargazerCount: repo.stargazerCount,
      };
    });

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

export async function fetchAllGitHubProjects(): Promise<Project[]> {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'ayushjaipuriyar';
  const limit = 100; // Fetch up to 100 repos

  if (!token) {
    console.warn('⚠️  No GITHUB_TOKEN found. Using fallback projects.');
    return [];
  }

  try {
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `token ${token}`,
      },
    });

    const response = await graphqlWithAuth<AllReposResponse>(allReposQuery, {
      login: username,
      n: limit,
    });

    const repos = response.user.repositories.nodes.filter((repo) => !repo.isFork);

    const projects: Project[] = repos.map((repo) => {
      const technologies = repo.languages.nodes.map((lang) => lang.name);
      const tags = repo.repositoryTopics.nodes.map((t) => t.topic.name);
      const hasPreview = repo.previewImage !== null;
      const title = formatTitle(repo.name);

      return {
        id: `${repo.owner.login}/${repo.name}`,
        slug: slugify(repo.name),
        owner: repo.owner.login,
        repoName: repo.name,
        title,
        description: repo.description || 'No description available',
        image: getRepoImageUrl(repo.owner.login, repo.name, hasPreview),
        technologies: technologies,
        tags: tags,
        liveUrl: repo.homepageUrl || undefined,
        githubUrl: repo.url,
        featured: false,
        updatedAt: repo.updatedAt,
        stargazerCount: repo.stargazerCount,
      };
    });

    return projects;
  } catch (error) {
    console.error('Error fetching all GitHub projects:', error);
    return [];
  }
}

export async function fetchGitHubProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await fetchAllGitHubProjects();
  if (projects.length === 0) {
    return null;
  }

  return (
    projects.find((project) => project.slug === slug) ||
    projects.find((project) => slugify(project.repoName) === slug) ||
    null
  );
}
