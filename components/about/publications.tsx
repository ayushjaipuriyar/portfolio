'use client';

import { ExternalLink, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Particles } from '@/components/ui/shadcn-io/particles/index';

export function Publications() {
  const publications = [
    {
      id: 'pub-1',
      title: 'A Lossless Image Encryption Technique using Chaotic Map and DNA Encoding',
      authors: 'A. Jaipuriyar, A. Yadav, S. Roy, and U. Rawat',
      journal: 'Multimedia Tools and Applications',
      date: 'April 2025',
      year: '2025',
      status: 'Published',
      description:
        'Research on advanced image encryption techniques combining chaotic maps and DNA encoding for secure data transmission.',
      doi: '10.1007/s11042-025-20851-w',
      link: 'https://doi.org/10.1007/s11042-025-20851-w',
    },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-8 text-center text-xl font-bold md:text-2xl">Publications & Research</h2>

        <div className="space-y-6">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="group relative overflow-hidden rounded-lg border-2 border-border bg-card p-6 transition-all duration-300 hover:shadow-lg"
            >
              {/* Interactive particles */}
              <Particles
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                quantity={60}
                ease={80}
                staticity={50}
                color="#8b5cf6" // purple for research/academic
                size={0.6}
              />

              <div className="relative z-10 flex items-start gap-4">
                <div className="rounded-lg bg-primary/10 p-2">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="text-base font-bold leading-tight">{pub.title}</h3>
                    <Badge className="shrink-0 bg-green-500 text-xs hover:bg-green-600">
                      {pub.status}
                    </Badge>
                  </div>
                  <p className="mb-2 text-sm text-muted-foreground">{pub.authors}</p>
                  <p className="mb-2 text-sm font-semibold text-primary">{pub.journal}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{pub.date}</p>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {pub.description}
                  </p>
                  {pub.doi && (
                    <p className="mb-3 text-xs text-muted-foreground">
                      DOI:{' '}
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {pub.doi}
                      </a>
                    </p>
                  )}
                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      <span>View Publication</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
