import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, Mail } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import portfolioConfig from '@/config/portfolio';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayushjaipuriyar.com';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Resume of ${portfolioConfig.personal.name} - ${portfolioConfig.personal.tagline}.`,
  alternates: {
    canonical: `${siteUrl}/resume`,
  },
  openGraph: {
    title: `Resume | ${portfolioConfig.personal.name}`,
    description: portfolioConfig.personal.bio,
    url: `${siteUrl}/resume`,
    type: 'profile',
  },
};

export default function ResumePage() {
  const { personal, experience, education, skills } = portfolioConfig;

  return (
    <main className="min-h-screen px-4 py-16 sm:px-6 md:px-12 lg:px-24">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <section className="border-border bg-card rounded-2xl border p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">{personal.name}</h1>
              <p className="text-muted-foreground mt-2 text-lg">{personal.tagline}</p>
              <p className="text-muted-foreground mt-2 text-sm">{personal.location}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <a href="/api/resume" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              </Button>
              <Button asChild>
                <a href={`mailto:${personal.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {personal.email}
                </a>
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground mt-6 text-base">{personal.bio}</p>
        </section>

        <section className="border-border bg-card rounded-2xl border p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Experience</h2>
          <div className="mt-6 space-y-6">
            {experience.map((role) => (
              <div key={role.id} className="border-border border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{role.position}</h3>
                    <p className="text-muted-foreground text-sm">{role.company}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {role.startDate} – {role.current ? 'Present' : role.endDate}
                  </p>
                </div>
                <p className="text-muted-foreground mt-3 text-sm">{role.description}</p>
                <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm">
                  {role.achievements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {role.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="px-2 py-1">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-border bg-card rounded-2xl border p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Education</h2>
          <div className="mt-6 space-y-6">
            {education.map((item) => (
              <div key={item.id} className="border-border border-b pb-6 last:border-b-0 last:pb-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.degree} in {item.field}
                    </h3>
                    <p className="text-muted-foreground text-sm">{item.institution}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {item.startDate} – {item.current ? 'Present' : item.endDate}
                  </p>
                </div>
                {item.description && (
                  <p className="text-muted-foreground mt-3 text-sm">{item.description}</p>
                )}
                {item.achievements && (
                  <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm">
                    {item.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="border-border bg-card rounded-2xl border p-6 sm:p-8">
          <h2 className="text-2xl font-semibold">Skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill.name} variant="secondary" className="px-2 py-1">
                {skill.name}
              </Badge>
            ))}
          </div>
        </section>

        <section className="text-muted-foreground text-center text-sm">
          <p>
            Prefer a concise view? See the PDF resume via the button above or on the{' '}
            <Link href="/" className="underline">
              homepage
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
