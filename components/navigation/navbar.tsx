'use client';

import * as React from 'react';
import { MobileMenu } from '@/components/navigation/mobile-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { cn } from '@/lib/utils';

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed navbar height
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        'border-b bg-background/80 backdrop-blur-md',
        isScrolled ? 'shadow-sm' : 'border-transparent'
      )}
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-16">
          {/* Navigation Links */}
          <div className="hidden items-center space-x-6 md:flex lg:space-x-8" role="navigation">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors duration-300',
                  'flex min-h-[44px] items-center hover:text-primary',
                  'rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                  activeSection === section.id ? 'text-primary' : 'text-muted-foreground'
                )}
                aria-current={activeSection === section.id ? 'page' : undefined}
                aria-label={`Navigate to ${section.label} section`}
              >
                {section.label}
                <span
                  className={cn(
                    'absolute bottom-0 left-0 right-0 h-0.5 bg-primary transition-all duration-300',
                    activeSection === section.id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
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
