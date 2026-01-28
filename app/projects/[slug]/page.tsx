import ReactMarkdown from 'react-markdown';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import remarkGfm from 'remark-gfm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fetchGitHubProjectBySlug, fetchGitHubReadme } from '@/lib/github';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayushjaipuriyar.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchGitHubProjectBySlug(slug);

  if (!project) {
    return {};
  }

  const description = project.description;

  return {
    title: `${project.title}`,
    description,
    alternates: {
      canonical: `${siteUrl}/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title}`,
      description,
      url: `${siteUrl}/projects/${project.slug}`,
      type: 'article',
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: `${project.title} preview`,
            },
          ]
        : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await fetchGitHubProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const readme = await fetchGitHubReadme(project.owner, project.repoName);

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/projects" aria-label="Back to projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="border-border bg-muted relative overflow-hidden rounded-2xl border">
            <Image
              src={project.image}
              alt={`${project.title} project preview`}
              width={1200}
              height={800}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">{project.title}</h1>
              <p className="text-muted-foreground mt-4 text-base sm:text-lg">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="px-2 py-1">
                  {tech}
                </Badge>
              ))}
              {project.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="px-2 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button asChild variant="outline">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View GitHub
                  </a>
                </Button>
              )}
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {readme && (
          <section className="border-border bg-card rounded-2xl border p-6 sm:p-8">
            <h2 className="text-2xl font-semibold">README</h2>
            <div className="text-muted-foreground mt-4 text-sm leading-relaxed">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: (props) => <h3 className="mt-6 text-xl font-semibold" {...props} />,
                  h2: (props) => <h4 className="mt-5 text-lg font-semibold" {...props} />,
                  h3: (props) => <h5 className="mt-4 text-base font-semibold" {...props} />,
                  p: (props) => <p className="mt-3" {...props} />,
                  ul: (props) => <ul className="mt-3 list-disc space-y-1 pl-5" {...props} />,
                  ol: (props) => <ol className="mt-3 list-decimal space-y-1 pl-5" {...props} />,
                  code: (props) => (
                    <code className="bg-muted rounded px-1 py-0.5 text-xs" {...props} />
                  ),
                  pre: (props) => (
                    <pre className="bg-muted mt-3 overflow-auto rounded p-3 text-xs" {...props} />
                  ),
                  a: (props) => (
                    <a className="text-primary underline-offset-4 hover:underline" {...props} />
                  ),
                }}
              >
                {readme}
              </ReactMarkdown>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
