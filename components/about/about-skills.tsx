"use client";

import { Badge } from "@/components/ui/badge";
import { Particles } from "@/components/ui/shadcn-io/particles/index";
import { Code2, Server, Database, Cloud, Wrench, GitBranch, BarChart3, Package } from "lucide-react";
import type { Skill } from "@/config/portfolio";
import "devicon/devicon.min.css";

interface AboutSkillsProps {
    skills: Skill[];
}

interface CategoryConfig {
    name: string;
    color: string;
    icon: React.ElementType;
    keywords: string[];
}

export function AboutSkills({ skills }: AboutSkillsProps) {
    const categories: Record<string, CategoryConfig> = {
        languages: {
            name: "Languages",
            color: "#ef4444",
            icon: Code2,
            keywords: ["TypeScript", "JavaScript", "Python", "Java", "C/C++"]
        },
        frontend: {
            name: "Frontend",
            color: "#3b82f6",
            icon: Package,
            keywords: ["React", "Next.js", "Redux"]
        },
        backend: {
            name: "Backend",
            color: "#10b981",
            icon: Server,
            keywords: ["Node.js", "NestJS", "Express", "Flask", "Django"]
        },
        database: {
            name: "Databases",
            color: "#f59e0b",
            icon: Database,
            keywords: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch"]
        },
        cloud: {
            name: "Cloud & DevOps",
            color: "#8b5cf6",
            icon: Cloud,
            keywords: ["AWS", "Docker", "Kubernetes", "Terraform"]
        },
        cicd: {
            name: "CI/CD",
            color: "#ec4899",
            icon: GitBranch,
            keywords: ["GitHub Actions", "Jenkins"]
        },
        monitoring: {
            name: "Monitoring",
            color: "#14b8a6",
            icon: BarChart3,
            keywords: ["Prometheus", "Grafana"]
        },
    };

    // Categorize skills based on keywords
    const categorizeSkill = (skill: Skill): string => {
        for (const [key, config] of Object.entries(categories)) {
            if (config.keywords.includes(skill.name)) {
                return key;
            }
        }
        return skill.category; // fallback to original category
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        const category = categorizeSkill(skill);
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-24 bg-muted/20">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
                    Technical Skills
                </h2>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => {
                        const config = categories[category as keyof typeof categories];
                        if (!config) return null;

                        const Icon = config.icon;

                        return (
                            <div
                                key={category}
                                className="group relative overflow-hidden bg-card border-2 border-border rounded-lg p-5 hover:shadow-lg transition-all duration-300"
                            >
                                {/* Interactive particles */}
                                <Particles
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    quantity={40}
                                    ease={80}
                                    staticity={50}
                                    color={config.color}
                                    size={0.5}
                                />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="text-base font-bold">
                                            {config.name}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {categorySkills.map((skill) => (
                                            <Badge
                                                key={skill.name}
                                                variant="secondary"
                                                className="text-xs py-1.5 px-2.5 flex items-center gap-1.5"
                                            >
                                                {skill.icon && (
                                                    <i
                                                        className={`devicon-${skill.icon}-plain colored text-sm`}
                                                        aria-hidden="true"
                                                    />
                                                )}
                                                <span>{skill.name}</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
