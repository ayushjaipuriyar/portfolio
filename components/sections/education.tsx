'use client';

import { Calendar, GraduationCap, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Education } from '@/config/portfolio';

interface EducationProps {
  education: Education[];
}

export function Education({ education }: EducationProps) {
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
    <section id="education" className="bg-muted/20 px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl md:text-4xl lg:text-5xl">
          Education
        </h2>

        <div className="space-y-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-start gap-3">
                    <GraduationCap className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <div>
                      <h3 className="mb-1 text-xl font-bold">
                        {edu.degree} in {edu.field}
                      </h3>
                      <p className="text-lg font-semibold text-primary">{edu.institution}</p>
                    </div>
                  </div>
                  <div className="ml-9 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(edu.startDate)} -{' '}
                        {edu.current ? 'Present' : formatDate(edu.endDate)}
                        {' · '}
                        {calculateDuration(edu.startDate, edu.endDate, edu.current)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                </div>
                {edu.current && (
                  <Badge className="flex-shrink-0 bg-green-500 hover:bg-green-600">Current</Badge>
                )}
              </div>

              {/* Description */}
              {edu.description && (
                <p className="mb-4 ml-9 text-muted-foreground">{edu.description}</p>
              )}

              {/* Achievements */}
              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="ml-9 space-y-2">
                  {edu.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1 text-primary">▸</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
