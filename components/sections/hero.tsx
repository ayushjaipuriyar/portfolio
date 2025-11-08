'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { RippleButton } from '@/components/ui/ripple-button';
import { ArrowDown, FileText } from 'lucide-react';
import portfolioConfig from '@/config/portfolio';

interface HeroProps {
    name: string;
    tagline: string;
    description: string;
    ctaText?: string;
    ctaLink?: string;
    avatar?: string;
}

export function Hero({
    name,
    tagline,
    description,
    ctaText = 'View Projects',
    ctaLink = '#projects',
    avatar,
}: HeroProps) {
    // Check for reduced motion preference
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const targetId = ctaLink.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut' as const,
            },
        },
    };

    const avatarVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: 'easeOut' as const,
            },
        },
    };

    // Floating animation for avatar
    const floatingAnimation = prefersReducedMotion
        ? {}
        : {
            y: [0, -10, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut' as const,
            },
        };

    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 md:px-12 lg:px-24"
        >
            <motion.div
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                animate="visible"
                variants={containerVariants}
                className="flex w-full max-w-6xl flex-col items-center gap-6 text-center sm:gap-8 md:gap-12"
                style={{ willChange: 'transform, opacity' }}
            >
                {/* Avatar */}
                {avatar && (
                    <motion.div
                        variants={avatarVariants}
                        animate={floatingAnimation}
                        className="relative h-28 w-28 overflow-hidden rounded-full shadow-lg ring-4 ring-primary/10 sm:h-32 sm:w-32 md:h-40 md:w-40"
                        style={{ willChange: 'transform' }}
                        role="img"
                        aria-label={`${name}'s profile picture`}
                    >
                        <Image
                            src={avatar}
                            alt={`${name}'s profile picture`}
                            width={160}
                            height={160}
                            className="h-full w-full object-cover"
                            priority
                        />
                    </motion.div>
                )}

                {/* Name with gradient */}
                <motion.h1
                    variants={itemVariants}
                    className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight"
                >
                    {name}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    variants={itemVariants}
                    className="text-lg font-medium text-foreground sm:text-xl md:text-2xl lg:text-3xl px-4"
                >
                    {tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl text-base text-muted-foreground sm:text-lg md:text-lg lg:text-xl px-4 leading-relaxed"
                >
                    {description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center">
                    <RippleButton
                        size="lg"
                        onClick={handleCtaClick}
                        className="group relative overflow-hidden text-base transition-all duration-300 hover:scale-105 hover:shadow-lg md:text-lg min-h-[48px] px-6 sm:px-8"
                        aria-label={`${ctaText} - Navigate to projects section`}
                    >
                        {ctaText}
                        <ArrowDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" aria-hidden="true" />
                    </RippleButton>
                    <a
                        href={portfolioConfig.personal.social.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <RippleButton
                            size="lg"
                            variant="outline"
                            className="group relative overflow-hidden text-base transition-all duration-300 hover:scale-105 hover:shadow-lg md:text-lg min-h-[48px] px-6 sm:px-8"
                            aria-label="View Resume"
                        >
                            <FileText className="mr-2 h-5 w-5" aria-hidden="true" />
                            Resume
                        </RippleButton>
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:block"
                aria-hidden="true"
            >
                <motion.div
                    animate={
                        prefersReducedMotion
                            ? {}
                            : {
                                y: [0, 8, 0],
                            }
                    }
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="text-muted-foreground"
                >
                    <ArrowDown className="h-6 w-6" />
                </motion.div>
            </motion.div>
        </section>
    );
}
