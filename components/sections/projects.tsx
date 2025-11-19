'use client';

import { Suspense, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, CheckIcon, ExternalLink, Github, X } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RippleButton } from '@/components/ui/ripple-button';
import {
  Tags,
  TagsContent,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
  TagsTrigger,
  TagsValue,
} from '@/components/ui/shadcn-io/tags';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  updatedAt?: string;
  stargazerCount?: number;
}

interface ProjectsProps {
  projects: Project[];
  showViewAll?: boolean;
  limit?: number;
}

export function Projects({ projects, showViewAll = false, limit }: ProjectsProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Limit projects if specified
  const displayProjects = limit ? projects.slice(0, limit) : projects;

  // Extract unique technologies and tags from all projects
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    displayProjects.forEach((project) => {
      project.technologies.forEach((tech) => tagSet.add(tech));
      project.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet)
      .sort()
      .map((tag) => ({ id: tag, label: tag }));
  }, [displayProjects]);

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selected.length === 0) {
      return displayProjects;
    }
    return displayProjects.filter((project) =>
      selected.some((tag) => project.technologies.includes(tag) || project.tags?.includes(tag))
    );
  }, [displayProjects, selected]);

  const handleRemove = (value: string) => {
    if (!selected.includes(value)) {
      return;
    }
    setSelected((prev) => prev.filter((v) => v !== value));
  };

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleRemove(value);
      return;
    }
    setSelected((prev) => [...prev, value]);
  };

  return (
    <section id="projects" className="px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-6 text-center text-3xl font-bold sm:mb-8 sm:text-4xl md:text-4xl lg:text-5xl">
            Projects
          </h2>
        </ScrollReveal>

        {/* Tags Filter */}
        <div className="mb-8 flex justify-center sm:mb-12">
          <div className="relative w-full max-w-2xl">
            <div
              onClick={() => setOpen(!open)}
              className="flex min-h-10 w-full cursor-pointer items-center gap-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background hover:bg-accent"
            >
              {selected.length === 0 ? (
                <span className="text-muted-foreground">Select technologies or tags...</span>
              ) : (
                selected.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                    <span>{tags.find((t) => t.id === tag)?.label}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(tag);
                      }}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </Badge>
                ))
              )}
            </div>
            {open && (
              <div className="absolute z-50 mt-2 w-full rounded-md border bg-popover p-2 text-popover-foreground shadow-md">
                <Tags>
                  <TagsInput placeholder="Search tag..." />
                  <TagsList>
                    <TagsEmpty />
                    <TagsGroup>
                      {tags.map((tag) => (
                        <TagsItem
                          key={tag.id}
                          onSelect={(value) => {
                            handleSelect(value);
                          }}
                          value={tag.id}
                        >
                          {tag.label}
                          {selected.includes(tag.id) && (
                            <CheckIcon className="text-muted-foreground" size={14} />
                          )}
                        </TagsItem>
                      ))}
                    </TagsGroup>
                  </TagsList>
                </Tags>
              </div>
            )}
          </div>
        </div>

        {/* Projects Grid with Fade Transition */}
        <Suspense fallback={<ProjectsGridSkeleton />}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                  style={{ willChange: 'transform, opacity' }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Suspense>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center text-muted-foreground"
          >
            <p className="text-base sm:text-lg">No projects found with this technology.</p>
          </motion.div>
        )}

        {/* View All Projects Button */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link href="/projects">
              <RippleButton size="lg" className="group">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </RippleButton>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ willChange: 'transform' }}
      role="article"
      aria-label={`Project: ${project.title}`}
    >
      {/* Project Image with Zoom Effect */}
      <div className="relative h-44 w-full overflow-hidden bg-muted sm:h-48">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title} project`}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjwvc3ZnPg=="
          style={{ willChange: 'transform' }}
        />

        {/* Overlay Gradient on Hover */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-background/90 via-background/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* External Links on Hover */}
        <div
          className={`absolute right-3 top-3 flex gap-2 transition-all duration-300 sm:right-4 sm:top-4 ${
            isHovered ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-background sm:h-10 sm:w-10"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-background sm:h-10 sm:w-10"
              aria-label={`View ${project.title} live demo`}
            >
              <ExternalLink className="h-5 w-5" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm sm:text-base">
          {project.description}
        </CardDescription>
      </CardHeader>

      {/* Technology and Tag Badges */}
      <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
        <div
          className="flex flex-wrap gap-1.5 sm:gap-2"
          role="list"
          aria-label="Technologies and tags"
        >
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="px-2 py-1 text-xs" role="listitem">
              {tech}
            </Badge>
          ))}
          {project.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="px-2 py-1 text-xs" role="listitem">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

// Loading skeleton for projects grid
function ProjectsGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="overflow-hidden">
          <div className="h-44 w-full animate-pulse bg-muted sm:h-48" />
          <CardHeader className="p-4 sm:p-6">
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded bg-muted" />
              <div className="h-6 w-16 animate-pulse rounded bg-muted" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
