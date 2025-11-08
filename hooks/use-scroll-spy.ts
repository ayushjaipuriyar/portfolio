"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
    const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || "");

    useEffect(() => {
        const handleScroll = () => {
            // Get current scroll position with offset for navbar
            const scrollPosition = window.scrollY + offset;

            // If we're at the very top, always show first section
            if (window.scrollY < 50) {
                setActiveSection(sectionIds[0]);
                return;
            }

            // Find which section is currently most visible
            let currentSection = sectionIds[0];

            for (const sectionId of sectionIds) {
                const section = document.getElementById(sectionId);
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    const sectionBottom = sectionTop + sectionHeight;

                    // Check if scroll position is within this section
                    // Using a threshold to make it more responsive
                    if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionBottom - 200) {
                        currentSection = sectionId;
                        break;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        // Initial check with a small delay to ensure DOM is ready
        const timer = setTimeout(handleScroll, 100);

        // Add scroll listener with throttling for better performance
        let ticking = false;
        const scrollListener = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", scrollListener, { passive: true });

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", scrollListener);
        };
    }, [sectionIds, offset]);

    return activeSection;
}
