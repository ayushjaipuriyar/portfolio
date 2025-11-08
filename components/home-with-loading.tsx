'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { LoadingScreen } from '@/components/loading-screen';
import { Hero } from '@/components/sections/hero';
import { OpenToWorkBadge } from '@/components/open-to-work-badge';

// Lazy load below-the-fold components
const About = lazy(() => import('@/components/sections/about').then(mod => ({ default: mod.About })));
const Projects = lazy(() => import('@/components/sections/projects').then(mod => ({ default: mod.Projects })));
const ScrollReveal = lazy(() => import('@/components/scroll-reveal').then(mod => ({ default: mod.ScrollReveal })));
const ConnectFooter = lazy(() => import('@/components/sections/connect-footer').then(mod => ({ default: mod.default })));

interface HomeWithLoadingProps {
    personalInfo: {
        name: string;
        tagline: string;
        bio: string;
        avatar: string;
    };
    skills: any[];
    projects: any[];
}

export function HomeWithLoading({ personalInfo, skills, projects }: HomeWithLoadingProps) {
    const [showLoading, setShowLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Check sessionStorage after mount to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const hasVisited = sessionStorage.getItem('hasVisited');
            if (hasVisited) {
                setShowLoading(false);
            }
        }
    }, []);

    const handleLoadingComplete = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('hasVisited', 'true');
        }
        setShowLoading(false);
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return null;
    }

    return (
        <>
            {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

            <div className={showLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
                <a href="#main-content" className="skip-to-content">
                    Skip to main content
                </a>
                <OpenToWorkBadge />
                <main id="main-content">
                    <Hero
                        name={personalInfo.name}
                        tagline={personalInfo.tagline}
                        description={personalInfo.bio}
                        ctaText="View My Work"
                        ctaLink="#projects"
                        avatar={personalInfo.avatar}
                    />

                    <Suspense fallback={<div className="min-h-screen" />}>
                        <ScrollReveal>
                            <About bio={personalInfo.bio} skills={skills} />
                        </ScrollReveal>
                    </Suspense>

                    <Suspense fallback={<div className="min-h-screen" />}>
                        <ScrollReveal>
                            <Projects projects={projects} showViewAll={true} limit={6} />
                        </ScrollReveal>
                    </Suspense>
                </main>

                <Suspense fallback={<div className="min-h-[400px]" />}>
                    <ScrollReveal>
                        <ConnectFooter />
                    </ScrollReveal>
                </Suspense>
            </div>
        </>
    );
}
