"use client";

import { FileText, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Publications() {
    const publications = [
        {
            id: "pub-1",
            title: "A Lossless Image Encryption Technique using Chaotic Map and DNA Encoding",
            journal: "Multimedia Tools and Applications",
            date: "April 2025",
            status: "Published",
            description: "Research on advanced image encryption techniques combining chaotic maps and DNA encoding for secure data transmission.",
            link: "#", // Add actual link when available
        },
    ];

    return (
        <section className="px-4 py-16 sm:px-6 md:px-12 lg:px-24">
            <div className="mx-auto max-w-6xl">
                <h2 className="text-xl md:text-2xl font-bold mb-8 text-center">
                    Publications & Research
                </h2>

                <div className="space-y-6">
                    {publications.map((pub) => (
                        <div
                            key={pub.id}
                            className="bg-card border-2 border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <h3 className="text-base font-bold leading-tight">
                                            {pub.title}
                                        </h3>
                                        <Badge className="bg-green-500 hover:bg-green-600 flex-shrink-0 text-xs">
                                            {pub.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm font-semibold text-primary mb-2">
                                        {pub.journal}
                                    </p>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {pub.date}
                                    </p>
                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        {pub.description}
                                    </p>
                                    {pub.link && pub.link !== "#" && (
                                        <a
                                            href={pub.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-primary hover:underline"
                                        >
                                            <span>View Publication</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
