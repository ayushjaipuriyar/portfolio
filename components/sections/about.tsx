'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal, ScrollRevealItem } from '@/components/scroll-reveal';
import 'devicon/devicon.min.css';

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
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section
            id="about"
            className="px-4 py-16 sm:px-6 sm:py-20 md:px-12 lg:px-24"
        >
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
                            <a
                                href="/about"
                                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                            >
                                Learn more about me
                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </a>
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
                                                    className="cursor-default text-sm py-1.5 px-3 transition-all duration-200 hover:scale-105 hover:shadow-md flex items-center gap-2"
                                                    style={{ willChange: 'transform' }}
                                                >
                                                    {skill.icon && (
                                                        <i className={`devicon-${skill.icon}-plain colored text-lg`} aria-hidden="true"></i>
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
