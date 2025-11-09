"use client";

import { Particles } from "@/components/ui/shadcn-io/particles/index";
import { getConnections } from "@/config/connections";

export default function ConnectFooter() {
    const connections = getConnections();

    return (
        <footer id="connect" className="w-full py-16 px-4 bg-gradient-to-b from-transparent to-muted/20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-3">Let's Connect</h2>
                    <p className="text-muted-foreground">
                        Feel free to reach out for collaborations or just a friendly chat
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {connections.map((connection) => {
                        const Icon = connection.icon;
                        return (
                            <a
                                key={connection.name}
                                href={connection.href}
                                target={connection.name !== "Email" ? "_blank" : undefined}
                                rel={connection.name !== "Email" ? "noopener noreferrer" : undefined}
                                className={`group relative overflow-hidden rounded-xl border-2 border-border bg-card p-6 transition-all duration-300 ${connection.color} hover:shadow-lg hover:-translate-y-1`}
                            >
                                {/* Interactive particles */}
                                <Particles
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    quantity={50}
                                    ease={80}
                                    staticity={50}
                                    color={connection.particleColor}
                                    size={0.6}
                                />

                                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                    <div className="p-4 rounded-full bg-muted group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-1">{connection.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {connection.description}
                                        </p>
                                        <p className="text-xs font-mono text-muted-foreground/80">
                                            {connection.label}
                                        </p>
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                <div className="text-center text-sm text-muted-foreground border-t border-border pt-8">
                    <p>© {new Date().getFullYear()} Ayush Jaipuriyar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
