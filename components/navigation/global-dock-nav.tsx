"use client";

import { Dock, DockIcon } from "@/components/ui/dock";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import portfolioConfig from "@/config/portfolio";
import { cn } from "@/lib/utils";
import { Briefcase, Calendar, FileText, Home, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { lazy, Suspense } from "react";

// Lazy load theme toggle
const ThemeToggle = lazy(() => import("@/components/theme-toggle").then(mod => ({ default: mod.ThemeToggle })));

const navigationItems = [
    { id: "home", label: "Home", icon: Home, href: "/" },
    { id: "about", label: "About", icon: User, href: "/about" },
    { id: "projects", label: "Projects", icon: Briefcase, href: "/projects" },
];

export function GlobalDockNav() {
    const pathname = usePathname();

    const handleNavClick = (
			e: React.MouseEvent,
			href: string,
			isActive: boolean
		) => {
			// If already on the page, scroll to top smoothly
			if (isActive) {
				e.preventDefault();
				window.scrollTo({
					top: 0,
					behavior: "smooth",
				});
			}
		};

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <TooltipProvider>
                <Dock direction="middle" iconSize={48} iconMagnification={64}>
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
													<DockIcon
														key={item.id}
														className={cn(
															"transition-colors duration-200",
															isActive
																? "bg-primary text-primary-foreground"
																: "bg-secondary/50 hover:bg-secondary"
														)}
													>
														<Tooltip>
															<TooltipTrigger asChild>
																<Link
																	href={item.href}
																	onClick={(e) =>
																		handleNavClick(e, item.href, isActive)
																	}
																	aria-label={`Navigate to ${item.label}`}
																	aria-current={isActive ? "page" : undefined}
																	className="flex h-full w-full items-center justify-center"
																>
																	<Icon className="h-5 w-5" />
																</Link>
															</TooltipTrigger>
															<TooltipContent side="top">
																<p>{item.label}</p>
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
