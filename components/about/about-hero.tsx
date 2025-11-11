'use client';

import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Particles } from '@/components/ui/shadcn-io/particles/index';
import { getConnections } from '@/config/connections';
import type { PersonalInfo } from '@/config/portfolio';

interface AboutHeroProps {
  personalInfo: PersonalInfo;
}

export function AboutHero({ personalInfo }: AboutHeroProps) {
  const connections = getConnections();

  return (
    <section className="px-4 py-20 sm:px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl shadow-2xl ring-4 ring-primary/10 md:h-80 md:w-80">
              <Image
                src={personalInfo.avatar}
                alt={`${personalInfo.name}'s profile picture`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">About Me</h1>
            <p className="mb-6 text-lg font-semibold text-primary">{personalInfo.tagline}</p>
            <p className="mb-8 text-base leading-relaxed text-muted-foreground">
              {personalInfo.bio}
            </p>

            {/* Social Links */}
            <div className="mb-8 flex flex-wrap gap-3">
              {connections.map((connection) => {
                const Icon = connection.icon;
                return (
                  <div key={connection.name} className="group relative">
                    {/* Interactive particles */}
                    <Particles
                      className="absolute inset-0 rounded-md opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      quantity={30}
                      ease={80}
                      staticity={50}
                      color={connection.particleColor}
                      size={0.4}
                    />

                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className={`relative z-10 gap-2 transition-all duration-300 ${connection.color}`}
                    >
                      <a
                        href={connection.href}
                        target={connection.name !== 'Email' ? '_blank' : undefined}
                        rel={connection.name !== 'Email' ? 'noopener noreferrer' : undefined}
                      >
                        <Icon className="h-4 w-4" />
                        {connection.name}
                      </a>
                    </Button>
                  </div>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="transition-colors hover:text-primary"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Glasgow, UK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
