"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { RippleButton } from "@/components/ui/ripple-button";

interface MobileMenuProps {
    sections: Array<{ id: string; label: string }>;
    activeSection: string | null;
    onNavigate: (sectionId: string) => void;
}

export function MobileMenu({ sections, activeSection, onNavigate }: MobileMenuProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    // Close menu on escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            // Prevent body scroll when menu is open
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleNavigate = (sectionId: string) => {
        onNavigate(sectionId);
        setIsOpen(false);
    };

    return (
        <div className="md:hidden">
            {/* Hamburger Button */}
            <RippleButton
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation-menu"
                className="relative z-50 min-h-[44px] min-w-[44px]"
            >
                <Menu className="h-6 w-6" aria-hidden="true" />
            </RippleButton>

            {/* Mobile Menu Overlay and Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Slide-in Drawer */}
                        <motion.div
                            id="mobile-navigation-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation menu"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-[min(280px,80vw)] bg-background border-l shadow-lg z-50"
                            style={{ willChange: 'transform' }}
                        >
                            <div className="flex flex-col h-full">
                                {/* Header with Close Button */}
                                <div className="flex items-center justify-between p-4 border-b min-h-[64px]">
                                    <span className="text-lg font-semibold">Menu</span>
                                    <RippleButton
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsOpen(false)}
                                        aria-label="Close navigation menu"
                                        className="min-h-[44px] min-w-[44px]"
                                    >
                                        <X className="h-6 w-6" aria-hidden="true" />
                                    </RippleButton>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile navigation links">
                                    <ul className="space-y-2" role="list">
                                        {sections.map((section, index) => (
                                            <motion.li
                                                key={section.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <button
                                                    onClick={() => handleNavigate(section.id)}
                                                    className={cn(
                                                        "w-full text-left px-4 py-4 rounded-lg transition-colors duration-200 text-base",
                                                        "min-h-[44px] flex items-center",
                                                        "hover:bg-accent hover:text-accent-foreground",
                                                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                                        activeSection === section.id
                                                            ? "bg-primary/10 text-primary font-medium"
                                                            : "text-foreground"
                                                    )}
                                                    aria-current={activeSection === section.id ? "page" : undefined}
                                                >
                                                    {section.label}
                                                </button>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
