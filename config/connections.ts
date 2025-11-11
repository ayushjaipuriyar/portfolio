import { Calendar, Github, Linkedin, LucideIcon, Mail } from 'lucide-react';
import portfolioConfig from './portfolio';

export interface Connection {
  name: string;
  icon: LucideIcon;
  href: string;
  label: string;
  description: string;
  color: string;
  hoverStyles: {
    light: {
      backgroundColor: string;
      borderColor: string;
    };
    dark: {
      backgroundColor: string;
      borderColor: string;
    };
  };
  particleColor: string;
}

export function getConnections(): Connection[] {
  const { email, social } = portfolioConfig.personal;

  const connections: Connection[] = [
    {
      name: 'Email',
      icon: Mail,
      href: `mailto:${email}`,
      label: email,
      description: 'Drop me a message',
      color: 'bg-card',
      hoverStyles: {
        light: {
          backgroundColor: 'rgb(239 246 255 / 0.8)', // blue-50 with transparency
          borderColor: 'rgb(147 197 253)', // blue-300
        },
        dark: {
          backgroundColor: 'rgb(30 58 138 / 0.3)', // blue-950/30
          borderColor: 'rgb(59 130 246 / 0.7)', // blue-700
        },
      },
      particleColor: '#3b82f6', // blue
    },
    {
      name: 'GitHub',
      icon: Github,
      href: social.github || '',
      label: '@ayushjaipuriyar',
      description: 'Check out my code',
      color: 'bg-card',
      hoverStyles: {
        light: {
          backgroundColor: 'rgb(249 250 251 / 0.8)', // gray-50 with transparency
          borderColor: 'rgb(209 213 219)', // gray-300
        },
        dark: {
          backgroundColor: 'rgb(17 24 39 / 0.3)', // gray-900/30
          borderColor: 'rgb(75 85 99 / 0.7)', // gray-700
        },
      },
      particleColor: '#6b7280', // gray
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: social.linkedin || '',
      label: 'Connect with me',
      description: "Let's network",
      color: 'bg-card',
      hoverStyles: {
        light: {
          backgroundColor: 'rgb(239 246 255 / 0.8)', // blue-50 with transparency
          borderColor: 'rgb(147 197 253)', // blue-300
        },
        dark: {
          backgroundColor: 'rgb(30 58 138 / 0.3)', // blue-950/30
          borderColor: 'rgb(59 130 246 / 0.7)', // blue-700
        },
      },
      particleColor: '#0a66c2', // LinkedIn blue
    },
  ];

  // Add meeting link if available
  if (social.meetingLink) {
    connections.push({
      name: 'Schedule a Call',
      icon: Calendar,
      href: social.meetingLink,
      label: 'Book a time slot',
      description: "Let's have a chat",
      color: 'bg-card',
      hoverStyles: {
        light: {
          backgroundColor: 'rgb(236 253 245 / 0.8)', // green-50 with transparency
          borderColor: 'rgb(134 239 172)', // green-300
        },
        dark: {
          backgroundColor: 'rgb(20 83 45 / 0.3)', // green-950/30
          borderColor: 'rgb(34 197 94 / 0.7)', // green-700
        },
      },
      particleColor: '#22c55e', // green
    });
  }

  return connections;
}
