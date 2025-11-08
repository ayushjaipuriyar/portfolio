'use client';

import { motion, Variants } from 'framer-motion';
import { useIntersection } from '@/hooks/use-intersection';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    stagger?: boolean;
    staggerDelay?: number;
}

const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
    },
    visible: {
        opacity: 1,
        y: 0,
    },
};

const staggerContainer: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    duration = 0.6,
    stagger = false,
    staggerDelay = 0.1,
}: ScrollRevealProps) {
    const [ref, inView] = useIntersection({
        threshold: 0.1,
        triggerOnce: true,
    });

    // Check for reduced motion preference
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, render without animations
    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    const variants = stagger ? staggerContainer : fadeInUp;

    const transition = {
        duration,
        delay,
        ease: 'easeOut' as const,
    };

    // Update stagger delay if provided
    if (stagger && staggerDelay !== 0.1) {
        const staggerVariants: Variants = {
            hidden: {},
            visible: {
                transition: {
                    staggerChildren: staggerDelay,
                },
            },
        };
        return (
            <motion.div
                ref={ref}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={staggerVariants}
                className={className}
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={variants}
            transition={stagger ? undefined : transition}
            className={className}
            style={{ willChange: 'transform, opacity' }}
        >
            {children}
        </motion.div>
    );
}

// Export a child component for stagger animations
export function ScrollRevealItem({
    children,
    className = '',
}: {
    children: React.ReactNode;
    className?: string;
}) {
    // Check for reduced motion preference
    const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div variants={fadeInUp} className={className} style={{ willChange: 'transform, opacity' }}>
            {children}
        </motion.div>
    );
}
