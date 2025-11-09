"use client";

import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/shadcn-io/particles/index";
import type { PersonalInfo } from "@/config/portfolio";
import { Mail, MapPin } from "lucide-react";
import { getConnections } from "@/config/connections";
import Image from "next/image";

interface AboutHeroProps {
	personalInfo: PersonalInfo;
}

export function AboutHero({ personalInfo }: AboutHeroProps) {
	const connections = getConnections();

	return (
		<section className="px-4 py-20 sm:px-6 md:px-12 lg:px-24">
			<div className="mx-auto max-w-6xl">
				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Image */}
					<div className="flex justify-center md:justify-start">
						<div className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/10">
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
						<h1 className="text-3xl md:text-4xl font-bold mb-4">About Me</h1>
						<p className="text-lg text-primary font-semibold mb-6">
							{personalInfo.tagline}
						</p>
						<p className="text-base text-muted-foreground leading-relaxed mb-8">
							{personalInfo.bio}
						</p>

						{/* Social Links */}
						<div className="flex flex-wrap gap-3 mb-8">
							{connections.map((connection) => {
								const Icon = connection.icon;
								return (
									<div key={connection.name} className="relative group">
										{/* Interactive particles */}
										<Particles
											className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md"
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
											className={`gap-2 relative z-10 transition-all duration-300 ${connection.color}`}
										>
											<a
												href={connection.href}
												target={connection.name !== "Email" ? "_blank" : undefined}
												rel={connection.name !== "Email" ? "noopener noreferrer" : undefined}
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
									className="hover:text-primary transition-colors"
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
