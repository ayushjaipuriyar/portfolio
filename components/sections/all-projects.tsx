'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckIcon, ExternalLink, Github, Search, Star, X } from 'lucide-react';
import { OpenToWorkBadge } from '@/components/open-to-work-badge';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Tags,
  TagsEmpty,
  TagsGroup,
  TagsInput,
  TagsItem,
  TagsList,
} from '@/components/ui/shadcn-io/tags';
import { TechnologyBadge } from '@/components/ui/technology-badge';

interface Project {
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

interface AllProjectsViewProps {
  projects: Project[];
}

// Simple fuzzy search implementation
function fuzzyMatch(text: string, search: string): boolean {
  const searchLower = search.toLowerCase();
  const textLower = text.toLowerCase();

  // Direct substring match
  if (textLower.includes(searchLower)) return true;

  // Fuzzy character-by-character match
  let searchIndex = 0;
  for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
    if (textLower[i] === searchLower[searchIndex]) {
      searchIndex++;
    }
  }
  return searchIndex === searchLower.length;
}

export function AllProjectsView({ projects }: AllProjectsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  // Extract unique technologies and tags
  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => tagSet.add(tech));
      project.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet)
      .sort()
      .map((tag) => ({ id: tag, label: tag }));
  }, [projects]);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Apply tag/technology filter
    if (selected.length > 0) {
      result = result.filter((project) =>
        selected.some((tag) => project.technologies.includes(tag) || project.tags?.includes(tag))
      );
    }

    // Apply fuzzy search
    if (searchQuery.trim()) {
      result = result.filter((project) => {
        const searchableText = [
          project.title,
          project.description,
          ...project.technologies,
          ...(project.tags || []),
        ].join(' ');

        return fuzzyMatch(searchableText, searchQuery);
      });
    }

    return result;
  }, [projects, selected, searchQuery]);

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
    <>
      <OpenToWorkBadge />
      <div className="px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-24">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="mb-4 text-4xl font-bold sm:text-5xl">All Projects</h1>
            <p className="text-lg text-muted-foreground">
              Explore all {projects.length} projects sorted by recently updated
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects (fuzzy search enabled)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mb-8">
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

          {/* Results Count */}
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.05, 0.3),
                  }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center"
            >
              <p className="mb-2 text-lg text-muted-foreground">No projects found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          width={600}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Links */}
        <div
          className={`absolute right-3 top-3 flex gap-2 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
          }`}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110"
            >
              <Github className="h-5 w-5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-lg backdrop-blur-sm transition-all hover:scale-110"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
        </div>

        {/* Star Count */}
        {project.stargazerCount !== undefined && project.stargazerCount > 0 && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs backdrop-blur-sm">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{project.stargazerCount}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardHeader className="flex-grow p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
        <CardDescription className="line-clamp-3 text-sm">{project.description}</CardDescription>
        {project.updatedAt && (
          <p className="mt-2 text-xs text-muted-foreground">
            Updated: {new Date(project.updatedAt).toLocaleDateString()}
          </p>
        )}
      </CardHeader>

      {/* Technology and Tag Badges */}
      <CardFooter className="p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <TechnologyBadge key={tech} technology={tech} />
          ))}
          {project.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="px-2 py-1 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
