"use client";

import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, GraduationCap, Award } from "lucide-react";
import type { Education } from "@/config/portfolio";

interface DetailedEducationProps {
    education: Education[];
}

export function DetailedEducation({ education }: DetailedEducationProps) {
    const formatDate = (dateStr: string) => {
        const [year, month] = dateStr.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);
        return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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
        <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-24 bg-muted/20">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
                    Education
                </h2>

                <div className="space-y-6">
                    {education.map((edu) => (
                        <div
                            key={edu.id}
                            className="bg-card border-2 border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                {/* Left side */}
                                <div className="flex-1">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <GraduationCap className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-2">
                                                {edu.degree} in {edu.field}
                                            </h3>
                                            <p className="text-base font-semibold text-primary mb-3">
                                                {edu.institution}
                                            </p>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>
                                                        {formatDate(edu.startDate)} -{" "}
                                                        {edu.current ? "Present" : formatDate(edu.endDate)}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4" />
                                                    <span>{edu.location}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {edu.description && (
                                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                            {edu.description}
                                        </p>
                                    )}

                                    {edu.achievements && edu.achievements.length > 0 && (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm font-semibold">
                                                <Award className="h-4 w-4 text-primary" />
                                                <span>Key Achievements</span>
                                            </div>
                                            <ul className="space-y-3 ml-6">
                                                {edu.achievements.map((achievement, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <span className="text-primary mt-1">▸</span>
                                                        <span className="text-sm text-muted-foreground leading-relaxed">
                                                            {achievement}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Right side - Duration badge */}
                                <div className="flex flex-col gap-2">
                                    {edu.current && (
                                        <Badge className="bg-green-500 hover:bg-green-600 w-fit">
                                            Current
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className="w-fit">
                                        {calculateDuration(edu.startDate, edu.endDate, edu.current)}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
