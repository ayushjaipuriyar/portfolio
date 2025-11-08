"use client";

import React, { lazy, Suspense } from "react";
import { Home, User, Briefcase, Calendar, FileText, GraduationCap } from "lucide-react";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import portfolioConfig from "@/config/portfolio";

// Lazy load theme toggle
const ThemeToggle = lazy(() => import("@/components/theme-toggle").then(mod => ({ default: mod.ThemeToggle })));

interface DockNavProps {
    sections: Array<{ id: string; label: string }>;
}

const iconMap: Record<string, React.ElementType> = {
    home: Home,
    about: User,
    education: GraduationCap,
    experience: Briefcase,
    projects: Briefcase,
    connect: Briefcase,
};

export function DockNav({ sections }: DockNavProps) {
    const activeSection = useScrollSpy(
        sections.map((s) => s.id),
        150
    );

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.offsetTop - offset;

            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <TooltipProvider>
                <Dock direction="middle" iconSize={48} iconMagnification={64}>
                    {sections.map((section) => {
                        const Icon = iconMap[section.id] || Home;
                        const isActive = activeSection === section.id;

                        return (
                            <DockIcon
                                key={section.id}
                                className={cn(
                                    "transition-colors duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary/50 hover:bg-secondary"
                                )}
                            >
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => scrollToSection(section.id)}
                                            aria-label={`Navigate to ${section.label} section`}
                                            aria-current={isActive ? "page" : undefined}
                                            className="flex h-full w-full items-center justify-center"
                                        >
                                            <Icon className="h-5 w-5" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        <p>{section.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                        );
                    })}

                    {/* Separator */}
                    <div className="h-8 w-px bg-border mx-1" />

                    {/* Schedule Meeting */}
                    {portfolioConfig.personal.social.meetingLink && (
                        <DockIcon className="bg-secondary/50 hover:bg-secondary">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex h-full w-full items-center justify-center">
                                        <a
                                            href={portfolioConfig.personal.social.meetingLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Schedule a meeting"
                                            className="flex items-center justify-center"
                                        >
                                            <Calendar className="h-5 w-5" />
                                        </a>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>Schedule Meeting</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    )}

                    {/* Resume */}
                    {portfolioConfig.personal.social.resumeLink && (
                        <DockIcon className="bg-secondary/50 hover:bg-secondary">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div className="flex h-full w-full items-center justify-center">
                                        <a
                                            href={portfolioConfig.personal.social.resumeLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="View Resume"
                                            className="flex items-center justify-center"
                                        >
                                            <FileText className="h-5 w-5" />
                                        </a>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                    <p>Resume</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    )}

                    {/* Theme Toggle */}
                    <DockIcon className="bg-secondary/50 hover:bg-secondary">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="flex h-full w-full items-center justify-center">
                                    <Suspense fallback={<div className="h-5 w-5" />}>
                                        <ThemeToggle />
                                    </Suspense>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                                <p>Toggle Theme</p>
                            </TooltipContent>
                        </Tooltip>
                    </DockIcon>
                </Dock>
            </TooltipProvider>
        </div>
    );
}
