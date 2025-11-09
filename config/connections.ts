import { Mail, Github, Linkedin, Calendar, LucideIcon } from "lucide-react";
import portfolioConfig from "./portfolio";

export interface Connection {
    name: string;
    icon: LucideIcon;
    href: string;
    label: string;
    description: string;
    color: string;
    particleColor: string;
}

export function getConnections(): Connection[] {
    const { email, social } = portfolioConfig.personal;

    const connections: Connection[] = [
        {
            name: "Email",
            icon: Mail,
            href: `mailto:${email}`,
            label: email,
            description: "Drop me a message",
            color: "hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700",
            particleColor: "#3b82f6", // blue
        },
        {
            name: "GitHub",
            icon: Github,
            href: social.github || "",
            label: "@ayushjaipuriyar",
            description: "Check out my code",
            color: "hover:bg-gray-50 dark:hover:bg-gray-900/30 hover:border-gray-300 dark:hover:border-gray-700",
            particleColor: "#6b7280", // gray
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            href: social.linkedin || "",
            label: "Connect with me",
            description: "Let's network",
            color: "hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700",
            particleColor: "#0a66c2", // LinkedIn blue
        },
    ];

    // Add meeting link if available
    if (social.meetingLink) {
        connections.push({
            name: "Schedule a Call",
            icon: Calendar,
            href: social.meetingLink,
            label: "Book a time slot",
            description: "Let's have a chat",
            color: "hover:bg-green-50 dark:hover:bg-green-950/30 hover:border-green-300 dark:hover:border-green-700",
            particleColor: "#22c55e", // green
        });
    }

    return connections;
}
