import { Suspense } from 'react';
import { AllProjectsView } from '@/components/sections/all-projects';
import portfolioConfig from '@/config/portfolio';
import { fetchAllGitHubProjects } from '@/lib/github';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayushjaipuriyar.com';

export const metadata = {
  title: 'Projects',
  description:
    'Browse all projects by Ayush Jaipuriyar - Full Stack Software Engineer. Explore projects in distributed systems, microservices, machine learning, and cloud infrastructure.',
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: 'Projects | Ayush Jaipuriyar',
    description: 'Browse all projects by Ayush Jaipuriyar - Full Stack Software Engineer',
    url: `${siteUrl}/projects`,
    type: 'website',
  },
};

export default async function ProjectsPage() {
  // Fetch all projects from GitHub
  const githubProjects = await fetchAllGitHubProjects();

  // Use GitHub projects if available, otherwise fallback to config
  const projects = githubProjects.length > 0 ? githubProjects : portfolioConfig.projects;

  // Sort by recently updated
  const sortedProjects = [...projects].sort((a, b) => {
    if (!a.updatedAt || !b.updatedAt) return 0;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <AllProjectsView projects={sortedProjects} />
      </Suspense>
    </main>
  );
}
