// Portfolio Configuration
// This file contains all the personal information, skills, and projects displayed on the portfolio

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  meetingLink?: string;
  resumeLink?: string;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  bio: string;
  avatar: string;
  email: string;
  social: SocialLinks;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools' | 'other';
  icon?: string; // devicon class name
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  updatedAt?: string;
  stargazerCount?: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  description?: string;
  achievements?: string[];
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  seo: SEOConfig;
}

// Portfolio Data
const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'Ayush Jaipuriyar',
    tagline: 'Full Stack Software Engineer',
    bio: 'Full stack Software Engineer specializing in scalable, fault-tolerant distributed systems and APIs. Experienced with AWS, Docker, Kubernetes and CI/CD. Currently pursuing M.Sc. in Computer Science at University of Glasgow. Previously reduced API latency by 45% and automated deployments from ~2 hours to ~10 minutes at Healthtrip.',
    avatar: '/images/avatar.jpg',
    email: 'ayushjaipuriyar21@gmail.com',
    social: {
      github: 'https://github.com/ayushjaipuriyar',
      linkedin: 'https://linkedin.com/in/ayushjaipuriyar',
      twitter: '',
      meetingLink: 'https://cal.com/ayushjaipuriyar/15min',
      resumeLink: '/api/resume',
    },
  },

  skills: [
    // Frontend
    { name: 'React', category: 'frontend', icon: 'react' },
    { name: 'Next.js', category: 'frontend', icon: 'nextjs' },
    { name: 'Redux', category: 'frontend', icon: 'redux' },
    { name: 'React Native', category: 'frontend', icon: 'react' },
    { name: 'Expo', category: 'frontend', icon: 'react' },
    { name: 'TypeScript', category: 'frontend', icon: 'typescript' },
    { name: 'JavaScript', category: 'frontend', icon: 'javascript' },

    // Backend
    { name: 'Node.js', category: 'backend', icon: 'nodejs' },
    { name: 'NestJS', category: 'backend', icon: 'nestjs' },
    { name: 'Express', category: 'backend', icon: 'express' },
    { name: 'Hono', category: 'backend', icon: 'nodejs' },
    { name: 'Python', category: 'backend', icon: 'python' },
    { name: 'Flask', category: 'backend', icon: 'flask' },
    { name: 'Django', category: 'backend', icon: 'django' },
    { name: 'Java', category: 'backend', icon: 'java' },
    { name: 'Go', category: 'backend', icon: 'go' },
    { name: 'C/C++', category: 'backend', icon: 'cplusplus' },
    { name: 'PHP', category: 'backend', icon: 'php' },

    // Databases
    { name: 'PostgreSQL', category: 'tools', icon: 'postgresql' },
    { name: 'MySQL', category: 'tools', icon: 'mysql' },
    { name: 'MongoDB', category: 'tools', icon: 'mongodb' },
    { name: 'Redis', category: 'tools', icon: 'redis' },
    { name: 'Firebase', category: 'tools', icon: 'firebase' },
    { name: 'Elasticsearch', category: 'tools', icon: 'elasticsearch' },
    { name: 'BigQuery', category: 'tools', icon: 'googlecloud' },

    // DevOps & Cloud
    { name: 'AWS', category: 'tools', icon: 'amazonwebservices' },
    { name: 'GCP', category: 'tools', icon: 'googlecloud' },
    { name: 'Cloudflare', category: 'tools', icon: 'cloudflare' },
    { name: 'Docker', category: 'tools', icon: 'docker' },
    { name: 'Kubernetes', category: 'tools', icon: 'kubernetes' },
    { name: 'Terraform', category: 'tools', icon: 'terraform' },
    { name: 'GitHub Actions', category: 'tools', icon: 'githubactions' },
    { name: 'Jenkins', category: 'tools', icon: 'jenkins' },
    { name: 'BullMQ', category: 'tools', icon: 'nodejs' },
    { name: 'Prometheus', category: 'tools', icon: 'prometheus' },
    { name: 'Grafana', category: 'tools', icon: 'grafana' },
  ],

  education: [
    {
      id: 'edu-1',
      institution: 'University of Glasgow',
      degree: 'M.Sc.',
      field: 'Computer Science',
      location: 'Glasgow, UK',
      startDate: '2024-09',
      endDate: '2025-12',
      current: false,
      description:
        "Pursuing Master's degree in Computer Science with focus on distributed systems, cloud computing, and machine learning.",
      achievements: [
        'Specialized in advanced distributed systems and microservices architecture',
        'Research on ML-based network traffic detection in Open RAN systems',
        'Built ML pipeline on Near-RT RIC with xApps achieving 67-73% accuracy and F1 up to 76%',
      ],
    },
    {
      id: 'edu-2',
      institution: 'Manipal University Jaipur',
      degree: 'B.Tech.',
      field: 'Information Technology',
      location: 'Jaipur, India',
      startDate: '2020-06',
      endDate: '2024-06',
      description:
        'Bachelor of Technology in Information Technology with focus on software engineering and distributed systems.',
      achievements: [
        "Published research paper on 'A Lossless Image Encryption Technique using Chaotic Map and DNA Encoding' in Multimedia Tools and Applications (Apr. 2025)",
        'Developed multiple open-source projects including Linux utilities and automation tools',
      ],
    },
  ],

  experience: [
    {
      id: 'exp-1',
      company: 'Seabuddy',
      position: 'Full Stack Software Developer',
      location: 'Singapore',
      startDate: '2026-02',
      endDate: '',
      current: true,
      description: 'Full-stack engineer building scalable shipping platform solutions with AI and multi-tenant architecture.',
      achievements: [
        'Architected a RAG-based AI assistant using Cloudflare AutoRAG, Workers, and Hono, enabling ~300 DAU to query policy documents instantly, cutting average manual lookup time by ~70%',
        'Engineered a coin-based gamification system (tasks, events, streaks) that grew DAU by ~20% (from ~250 to ~300 active users) within 60 days of launch',
        'Designed a multi-tenant platform architecture with per-tenant isolated databases and async PDF ingestion pipelines (CF Queues, R2, KV), enabling onboarding of multiple shipping companies with zero cross-tenant data leakage',
        'Optimized backend and database query plans, reducing P50 API latency from 320ms to 140ms (56% improvement) and improving throughput under peak load',
        'Shipped a React Native app (iOS/Android) with social feed, events, and real-time group chat via WebSockets, serving 1,000+ users with support for 200+ concurrent connections',
      ],
      technologies: ['React Native', 'Cloudflare Workers', 'Hono', 'PostgreSQL', 'Redis', 'WebSockets'],
    },
    {
      id: 'exp-2',
      company: 'Healthtrip',
      position: 'Full Stack Software Engineer',
      location: 'Noida, India',
      startDate: '2024-01',
      endDate: '2024-09',
      current: false,
      description: 'Full-stack engineer building scalable healthcare platform solutions with microservices architecture.',
      achievements: [
        'Increased API throughput 75% (120→210 RPS) by migrating PHP monolith to NestJS microservices',
        'Engineered REST/GraphQL/WebSocket APIs for 8,000+ DAU, reducing response times 45% (220ms→120ms)',
        'Implemented Redis caching, reducing DB reads 70% & read latency 90% (300ms→30ms)',
        'Spearheaded Elasticsearch integration, accelerating search throughput 60% (50→80 results/sec)',
        'Automated CI/CD (GitHub Actions, Docker, AWS, Cloudflare), reducing deployment cycle ~90% & page load 50%',
      ],
      technologies: ['NestJS', 'Node.js', 'PostgreSQL', 'Redis', 'Elasticsearch', 'Docker', 'Kubernetes', 'AWS', 'GitHub Actions'],
    },
    {
      id: 'exp-3',
      company: 'AST Consulting',
      position: 'Software Developer',
      location: 'New Delhi, India',
      startDate: '2023-06',
      endDate: '2023-12',
      current: false,
      description: 'Led full-stack development for a SaaS platform powering AI-driven social media automation.',
      achievements: [
        'Launched a GenAI SaaS platform for social media content generation (React, NestJS, MongoDB), onboarding 200+ users within 3 months and supporting 50+ concurrent content generation requests',
        'Engineered REST and GraphQL APIs in NestJS integrating OpenAI GPT models, with retry logic and token-budget management, achieving <500ms median response time under production load',
        'Integrated Stripe and Chargebee subscription billing, adopted by 25% of users within launch quarter, and automated Telegram bot notification workflows',
        'Optimized MongoDB aggregation queries and caching layers, reducing latency from 320ms to 180ms (44%) for data-heavy analytics dashboards',
        'Provisioned AWS infrastructure with GitHub Actions CI/CD and CloudFront CDN, reducing image load times by 50%, accelerating deployments by 40%, and sustaining 95%+ uptime',
      ],
      technologies: ['NestJS', 'React', 'MongoDB', 'OpenAI', 'Stripe', 'AWS', 'Docker', 'GitHub Actions'],
    },
  ],

  projects: [
    {
      id: 'project-1',
      title: 'LeetCode MCP Server',
      description:
        'Developed an MCP server with 15+ tools and 5 endpoints, delivering median responses <150ms and real-time submission streaming that cut manual testing overhead 80%.',
      image: '/images/projects/leetcode-mcp.jpg',
      technologies: ['Node.js', 'TypeScript', 'Express', 'WebSocket'],
      githubUrl: 'https://github.com/ayushjaipuriyar/leetcode-mcpserver',
      featured: true,
    },
    {
      id: 'project-2',
      title: 'Near-RT RIC ML-based Malicious Traffic Detection',
      description:
        'Built an ML pipeline on Near-RT RIC with xApps for real-time traffic analysis. Classifiers achieved 67-73% accuracy and F1 up to 76% for detecting malicious network traffic.',
      image: '/images/projects/ric-xapps.jpg',
      technologies: ['Python', 'PyTorch', 'Open RAN', 'Machine Learning'],
      githubUrl: 'https://github.com/ayushjaipuriyar/ric-xapps-malicious-detection',
      featured: true,
    },
    {
      id: 'project-3',
      title: 'Segmentor - M3U8 Stream Downloader',
      description:
        'Created a Python CLI to download 100+ .m3u8 segments in parallel and assemble streams via ffmpeg in ≤60s, improving throughput 10x and reliability ~70%.',
      image: '/images/projects/segmentor.jpg',
      technologies: ['Python', 'ffmpeg', 'tkinter', 'Async I/O'],
      githubUrl: 'https://github.com/ayushjaipuriyar/animepahe-dl',
      featured: true,
    },
    {
      id: 'project-4',
      title: 'Vantage-14are05 Linux Utility',
      description:
        'Produced a Linux utility exposing ACPI performance and battery tuning controls with profile switching, reducing battery discharge 20-30% and attracting community contributions.',
      image: '/images/projects/vantage.jpg',
      technologies: ['Linux', 'ACPI', 'Bash', 'System Programming'],
      githubUrl: 'https://github.com/ayushjaipuriyar/vantage-14are05',
      featured: false,
    },
    {
      id: 'project-5',
      title: 'Partner Self-Serve Platform',
      description:
        'Built a self-serve partner platform with Kong API Gateway, OAuth2, and Redis, automating onboarding from 4 days to 10 minutes and increasing partner acquisition by 60%.',
      image: '/images/projects/partner-platform.jpg',
      technologies: ['NestJS', 'Kong', 'OAuth2', 'Redis', 'Docker'],
      featured: false,
    },
    {
      id: 'project-6',
      title: 'Multilingual Translation System',
      description:
        'Engineered a fault-tolerant backend translation system supporting 9 languages and 5,000+ entries/day, delivering 100% uptime and boosting global engagement by 70%.',
      image: '/images/projects/translation.jpg',
      technologies: ['NestJS', 'Redis', 'Elasticsearch', 'Microservices'],
      featured: false,
    },
  ],

  seo: {
    title: 'Ayush Jaipuriyar | Full Stack Software Engineer',
    description:
      'Portfolio of Ayush Jaipuriyar - Full Stack Software Engineer specializing in scalable distributed systems, microservices, and cloud infrastructure. Experienced with React, NestJS, AWS, Docker, and Kubernetes.',
    keywords: [
      'software engineer',
      'full stack developer',
      'backend engineer',
      'distributed systems',
      'microservices',
      'react developer',
      'nestjs',
      'nodejs',
      'typescript',
      'aws',
      'docker',
      'kubernetes',
      'devops',
      'portfolio',
      'ayush jaipuriyar',
    ],
    ogImage: '/images/og-image.jpg',
  },
};

export default portfolioConfig;
