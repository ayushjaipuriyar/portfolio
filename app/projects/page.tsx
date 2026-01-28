import { Suspense } from 'react';
import { AllProjectsView } from '@/components/sections/all-projects';
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

  // Sort by recently updated
  const sortedProjects = [...githubProjects].sort((a, b) => {
    const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    return bTime - aTime;
  });

  return (
    <main className="min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        {sortedProjects.length > 0 ? (
          <AllProjectsView projects={sortedProjects} />
        ) : (
          <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-3xl font-semibold">Projects unavailable</h1>
            <p className="text-muted-foreground">
              This page pulls live project data from GitHub. Set <strong>GITHUB_TOKEN</strong> (and
              optionally <strong>GITHUB_USERNAME</strong>) to enable fetching.
            </p>
            <p className="text-muted-foreground text-sm">
              Once the token is configured, reload this page to see GitHub projects.
            </p>
          </section>
        )}
      </Suspense>
    </main>
  );
}
