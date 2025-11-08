"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

interface NavbarProps {
    sections: Array<{ id: string; label: string }>;
}

export function Navbar({ sections }: NavbarProps) {
    const [isScrolled, setIsScrolled] = React.useState(false);
    const activeSection = useScrollSpy(
        sections.map((s) => s.id),
        150
    );

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Account for fixed navbar height
            const elementPosition = element.offsetTop - offset;

            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                "backdrop-blur-md bg-background/80 border-b",
                isScrolled ? "shadow-sm" : "border-transparent"
            )}
            aria-label="Main navigation"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-16">
                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8" role="navigation">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={cn(
                                    "relative text-sm font-medium transition-colors duration-300 py-2 px-3",
                                    "hover:text-primary min-h-[44px] flex items-center",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm",
                                    activeSection === section.id
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                                aria-current={activeSection === section.id ? "page" : undefined}
                                aria-label={`Navigate to ${section.label} section`}
                            >
                                {section.label}
                                <span
                                    className={cn(
                                        "absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300",
                                        activeSection === section.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                                    )}
                                    aria-hidden="true"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Theme Toggle and Mobile Menu */}
                    <div className="flex items-center gap-1 md:gap-2">
                        <ThemeToggle />
                        <MobileMenu
                            sections={sections}
                            activeSection={activeSection}
                            onNavigate={scrollToSection}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
