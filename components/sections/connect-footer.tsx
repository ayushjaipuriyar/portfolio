'use client';

import { Particles } from '@/components/ui/shadcn-io/particles/index';
import { getConnections } from '@/config/connections';

export default function ConnectFooter() {
  const connections = getConnections();

  return (
    <footer
      id="connect"
      className="w-full bg-linear-to-b from-transparent to-muted/20 px-4 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold">Let's Connect</h2>
          <p className="text-muted-foreground">
            Feel free to reach out for collaborations or just a friendly chat
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {connections.map((connection) => {
            const Icon = connection.icon;
            return (
              <a
                key={connection.name}
                href={connection.href}
                target={connection.name !== 'Email' ? '_blank' : undefined}
                rel={connection.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className={`group relative overflow-hidden rounded-xl border-2 border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${connection.color}`}
                onMouseEnter={(e) => {
                  const target = e.currentTarget;
                  const isDark = document.documentElement.classList.contains('dark');
                  const themeStyles = isDark
                    ? connection.hoverStyles.dark
                    : connection.hoverStyles.light;
                  Object.assign(target.style, themeStyles);
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.backgroundColor = '';
                  target.style.borderColor = '';
                }}
              >
                {/* Interactive particles */}
                <Particles
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  quantity={50}
                  ease={80}
                  staticity={50}
                  color={connection.particleColor}
                  size={0.6}
                />

                <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
                  <div className="rounded-full bg-muted p-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{connection.name}</h3>
                    <p className="mb-2 text-sm text-muted-foreground">{connection.description}</p>
                    <p className="font-mono text-xs text-muted-foreground/80">{connection.label}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ayush Jaipuriyar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
