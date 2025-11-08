"use client";

import { Badge } from "@/components/ui/badge";
import type { Skill } from "@/config/portfolio";

interface AboutSkillsProps {
    skills: Skill[];
}

export function AboutSkills({ skills }: AboutSkillsProps) {
    const categories = {
        frontend: "Frontend Development",
        backend: "Backend Development",
        tools: "DevOps & Tools",
        other: "Other Skills",
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    return (
        <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-24 bg-muted/20">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
                    Technical Skills
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                        <div
                            key={category}
                            className="bg-card border-2 border-border rounded-lg p-5"
                        >
                            <h3 className="text-base font-bold mb-3">
                                {categories[category as keyof typeof categories]}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {categorySkills.map((skill) => (
                                    <Badge
                                        key={skill.name}
                                        variant="secondary"
                                        className="text-xs py-1 px-2.5"
                                    >
                                        {skill.name}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
