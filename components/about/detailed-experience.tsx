"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, TrendingUp } from "lucide-react";
import type { Experience } from "@/config/portfolio";

interface DetailedExperienceProps {
    experience: Experience[];
}

export function DetailedExperience({ experience }: DetailedExperienceProps) {
    const formatDate = (dateStr: string) => {
        const [year, month] = dateStr.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    const calculateDuration = (startDate: string, endDate: string, isCurrent?: boolean) => {
        const [startYear, startMonth] = startDate.split("-").map(Number);
        const start = new Date(startYear, startMonth - 1);

        const end = isCurrent
            ? new Date()
            : new Date(parseInt(endDate.split("-")[0]), parseInt(endDate.split("-")[1]) - 1);

        const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;

        if (years === 0) {
            return `${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
        } else if (remainingMonths === 0) {
            return `${years} ${years === 1 ? "year" : "years"}`;
        } else {
            return `${years} ${years === 1 ? "year" : "years"} ${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`;
        }
    };

    return (
        <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-5xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
                    Work Experience
                </h2>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2" />

                    {/* Timeline items */}
                    <div className="space-y-12">
                        {experience.map((exp, index) => (
                            <div
                                key={exp.id}
                                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    }`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                                </div>

                                {/* Content */}
                                <div className={`flex-1 pl-20 md:pl-0 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                                    <div className="bg-card border-2 border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                                        {/* Header */}
                                        <div className="mb-4">
                                            <div className="flex items-start gap-2 mb-2 flex-wrap">
                                                {exp.current && (
                                                    <Badge className="bg-green-500 hover:bg-green-600">
                                                        Current
                                                    </Badge>
                                                )}
                                                <Briefcase className="h-5 w-5 text-primary mt-0.5" />
                                            </div>
                                            <h3 className="text-lg font-bold mb-1">{exp.position}</h3>
                                            <p className="text-base font-semibold text-primary mb-2">
                                                {exp.company}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        {formatDate(exp.startDate)} -{" "}
                                                        {exp.current ? "Present" : formatDate(exp.endDate)}
                                                        {" · "}
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
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {exp.description}
                                        </p>

                                        {/* Achievements */}
                                        <ul className="space-y-2 mb-4">
                                            {exp.achievements.map((achievement, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-2 text-sm"
                                                >
                                                    <span className="text-primary mt-1">▸</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech) => (
                                                <Badge
                                                    key={tech}
                                                    variant="secondary"
                                                    className="text-xs"
                                                >
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Spacer for alternating layout */}
                                <div className="hidden md:block flex-1" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
