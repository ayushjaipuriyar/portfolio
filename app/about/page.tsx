import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/about-hero';
import { AboutSkills } from '@/components/about/about-skills';
import { BackButton } from '@/components/about/back-button';
import { DetailedEducation } from '@/components/about/detailed-education';
import { DetailedExperience } from '@/components/about/detailed-experience';
import { Publications } from '@/components/about/publications';
import portfolioConfig from '@/config/portfolio';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ayushjaipuriyar.com';

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${portfolioConfig.personal.name} - ${portfolioConfig.personal.tagline}. Full Stack Software Engineer with expertise in distributed systems, microservices, and cloud infrastructure.`,
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: `About ${portfolioConfig.personal.name}`,
    description: `Learn more about ${portfolioConfig.personal.name} - ${portfolioConfig.personal.tagline}`,
    url: `${siteUrl}/about`,
    type: 'profile',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <BackButton />
      <AboutHero personalInfo={portfolioConfig.personal} />
      <DetailedExperience experience={portfolioConfig.experience} />
      <DetailedEducation education={portfolioConfig.education} />
      <AboutSkills skills={portfolioConfig.skills} />
      <Publications />
    </main>
  );
}
