"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { RippleButton } from "@/components/ui/ripple-button";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch by only rendering after mount
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <RippleButton
                variant="ghost"
                size="icon"
                className="relative min-h-[44px] min-w-[44px] md:h-10 md:w-10"
                disabled
            >
                <Sun className="h-5 w-5" />
            </RippleButton>
        );
    }

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <RippleButton
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="relative min-h-[44px] min-w-[44px] transition-all duration-200 hover:scale-110 hover:bg-accent md:h-10 md:w-10"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "dark"}
            style={{ willChange: 'transform' }}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" style={{ willChange: 'transform' }} aria-hidden="true" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" style={{ willChange: 'transform' }} aria-hidden="true" />
        </RippleButton>
    );
}
