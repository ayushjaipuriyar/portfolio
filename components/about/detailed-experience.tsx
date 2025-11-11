'use client';

import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Experience } from '@/config/portfolio';

interface DetailedExperienceProps {
  experience: Experience[];
}

export function DetailedExperience({ experience }: DetailedExperienceProps) {
  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const calculateDuration = (startDate: string, endDate: string, isCurrent?: boolean) => {
    const [startYear, startMonth] = startDate.split('-').map(Number);
    const start = new Date(startYear, startMonth - 1);

    const end = isCurrent
      ? new Date()
      : new Date(parseInt(endDate.split('-')[0]), parseInt(endDate.split('-')[1]) - 1);

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    } else if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    } else {
      return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    }
  };

  return (
    <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-12 text-center text-2xl font-bold md:text-3xl">Work Experience</h2>

        <div className="relative">
          {/* Timeline line - hidden on mobile */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-0.5 bg-border md:block" />

          {/* Timeline items */}
          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col gap-8 md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot - hidden on mobile */}
                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center justify-center md:flex">
                  <div className="h-4 w-4 rounded-full bg-primary ring-4 ring-background" />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}
                >
                  <div className="rounded-xl border-2 border-border bg-card p-6 transition-shadow duration-300 hover:shadow-lg">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="mb-2 flex flex-wrap items-start gap-2">
                        {exp.current && (
                          <Badge className="bg-green-500 hover:bg-green-600">Current</Badge>
                        )}
                        <Briefcase className="mt-0.5 h-5 w-5 text-primary" />
                      </div>
                      <h3 className="mb-1 text-lg font-bold">{exp.position}</h3>
                      <p className="mb-2 text-base font-semibold text-primary">{exp.company}</p>
                      <div className="mb-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formatDate(exp.startDate)} -{' '}
                            {exp.current ? 'Present' : formatDate(exp.endDate)}
                            {' · '}
                            {calculateDuration(exp.startDate, exp.endDate, exp.current)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mb-4 text-sm text-muted-foreground">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="mb-4 space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="mt-1 text-primary">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
