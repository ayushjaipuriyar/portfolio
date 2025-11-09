"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    const beamsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!beamsRef.current) return;

        const beams = beamsRef.current;
        const beamElements = beams.querySelectorAll(".beam");

        beamElements.forEach((beam, index) => {
            const element = beam as HTMLElement;
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }, []);

    return (
        <div
            ref={beamsRef}
            className={cn(
                "pointer-events-none absolute inset-0 overflow-hidden",
                className
            )}
        >
            {/* Beams */}
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="beam absolute top-0 h-full w-px animate-beam"
                    style={{
                        left: `${15 + i * 15}%`,
                        animationDelay: `${i * 0.5}s`,
                    }}
                />
            ))}
        </div>
    );
};
