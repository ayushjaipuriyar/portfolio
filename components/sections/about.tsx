'use client';

import Link from 'next/link';
import 'devicon/devicon.min.css';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal, ScrollRevealItem } from '@/components/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { RippleButton } from '@/components/ui/ripple-button';

interface Skill {
  name: string;
  category: string;
  icon?: string;
}

interface AboutProps {
  bio: string;
  skills: Skill[];
  image?: string;
}

export function About({ bio, skills }: AboutProps) {
  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <h2 className="mb-8 text-center text-3xl font-bold sm:mb-12 sm:text-4xl md:text-4xl lg:text-5xl">
            About Me
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 sm:gap-12 md:grid-cols-2 md:items-center">
          {/* Bio Text */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg md:text-lg">
                {bio}
              </p>

              {/* Fun Facts / Quick Stats */}
              <div className="grid grid-cols-2 gap-4 rounded-lg border bg-card p-4">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">10,000+</p>
                  <p className="text-xs text-muted-foreground">Daily Users Served</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">38%</p>
                  <p className="text-xs text-muted-foreground">API Latency Reduction</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">99.9%</p>
                  <p className="text-xs text-muted-foreground">System Uptime</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">70%</p>
                  <p className="text-xs text-muted-foreground">DB Load Reduction</p>
                </div>
              </div>

              <Link href="/about">
                <RippleButton variant="outline" className="group">
                  Learn more about me
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </RippleButton>
              </Link>
            </div>
          </ScrollReveal>

          {/* What I'm Up To / Current Focus */}
          <ScrollReveal delay={0.3}>
            <div className="space-y-4 rounded-lg border bg-gradient-to-br from-primary/5 to-primary/10 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                </span>
                What I&apos;m Up To
              </h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">🎓</span>
                  <span>Pursuing M.Sc. Computer Science at University of Glasgow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🔬</span>
                  <span>Research on ML-based network traffic detection in Open RAN systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">🚀</span>
                  <span>Building scalable microservices with NestJS and Kubernetes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">📚</span>
                  <span>Deep diving into distributed systems and cloud-native architecture</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Skills Section */}
        <ScrollReveal delay={0.4} className="mt-12 sm:mt-16">
          <h3 className="mb-6 text-center text-xl font-semibold sm:mb-8 sm:text-2xl md:text-3xl">
            Skills & Technologies
          </h3>

          <ScrollReveal stagger staggerDelay={0.1}>
            <div className="space-y-6 sm:space-y-8">
              {Object.entries(skillsByCategory).map(([category, skillList]) => (
                <ScrollRevealItem key={category}>
                  <div>
                    <h4 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground sm:text-sm">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <Badge
                          key={skill.name}
                          variant="secondary"
                          className="flex cursor-default items-center gap-2 px-3 py-1.5 text-sm transition-all duration-200 hover:scale-105 hover:shadow-md"
                          style={{ willChange: 'transform' }}
                        >
                          {skill.icon && (
                            <i
                              className={`devicon-${skill.icon}-plain colored text-lg`}
                              aria-hidden="true"
                            ></i>
                          )}
                          <span>{skill.name}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </ScrollRevealItem>
              ))}
            </div>
          </ScrollReveal>
        </ScrollReveal>
      </div>
    </section>
  );
}
