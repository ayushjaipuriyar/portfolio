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
    category: "frontend" | "backend" | "tools" | "other";
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
        name: "Ayush Jaipuriyar",
        tagline: "Full Stack Software Engineer",
        bio: "Full stack Software Engineer specializing in scalable, fault-tolerant distributed systems and APIs. Experienced with AWS, Docker, Kubernetes and CI/CD. Currently pursuing M.Sc. in Computer Science at University of Glasgow. Previously reduced API latency by 38% and automated deployments from 3 hours to 10 minutes at Healthtrip.",
        avatar: "/images/avatar.jpg",
        email: "ayushjaipuriyar21@gmail.com",
        social: {
            github: "https://github.com/ayushjaipuriyar",
            linkedin: "https://linkedin.com/in/ayushjaipuriyar",
            twitter: "",
            meetingLink: "https://cal.com/ayushjaipuriyar/15min",
            resumeLink: "/api/resume",
        },
    },

    skills: [
        // Frontend
        { name: "React", category: "frontend", icon: "react" },
        { name: "Next.js", category: "frontend", icon: "nextjs" },
        { name: "Redux", category: "frontend", icon: "redux" },
        { name: "TypeScript", category: "frontend", icon: "typescript" },
        { name: "JavaScript", category: "frontend", icon: "javascript" },

        // Backend
        { name: "Node.js", category: "backend", icon: "nodejs" },
        { name: "NestJS", category: "backend", icon: "nestjs" },
        { name: "Express", category: "backend", icon: "express" },
        { name: "Python", category: "backend", icon: "python" },
        { name: "Flask", category: "backend", icon: "flask" },
        { name: "Django", category: "backend", icon: "django" },
        { name: "Java", category: "backend", icon: "java" },
        { name: "C/C++", category: "backend", icon: "cplusplus" },

        // Databases
        { name: "PostgreSQL", category: "tools", icon: "postgresql" },
        { name: "MySQL", category: "tools", icon: "mysql" },
        { name: "MongoDB", category: "tools", icon: "mongodb" },
        { name: "Redis", category: "tools", icon: "redis" },
        { name: "Elasticsearch", category: "tools", icon: "elasticsearch" },

        // DevOps & Cloud
        { name: "AWS", category: "tools", icon: "amazonwebservices" },
        { name: "Docker", category: "tools", icon: "docker" },
        { name: "Kubernetes", category: "tools", icon: "kubernetes" },
        { name: "Terraform", category: "tools", icon: "terraform" },
        { name: "GitHub Actions", category: "tools", icon: "githubactions" },
        { name: "Jenkins", category: "tools", icon: "jenkins" },
        { name: "Prometheus", category: "tools", icon: "prometheus" },
        { name: "Grafana", category: "tools", icon: "grafana" },
    ],

    education: [
        {
            id: "edu-1",
            institution: "University of Glasgow",
            degree: "M.Sc.",
            field: "Computer Science",
            location: "Glasgow, UK",
            startDate: "2024-09",
            endDate: "2025-09",
            current: false,
            description: "Pursuing Master's degree in Computer Science with focus on distributed systems, cloud computing, and machine learning.",
            achievements: [
                "Specialized in advanced distributed systems and microservices architecture",
                "Research on ML-based network traffic detection in Open RAN systems",
                "Built ML pipeline on Near-RT RIC with xApps achieving 67-73% accuracy and F1 up to 76%",
            ],
        },
        {
            id: "edu-2",
            institution: "Manipal University Jaipur",
            degree: "B.Tech.",
            field: "Information Technology",
            location: "Jaipur, India",
            startDate: "2020-06",
            endDate: "2024-06",
            description: "Bachelor of Technology in Information Technology with focus on software engineering and distributed systems.",
            achievements: [
                "Published research paper on 'A Lossless Image Encryption Technique using Chaotic Map and DNA Encoding' in Multimedia Tools and Applications (Apr. 2025)",
                "Developed multiple open-source projects including Linux utilities and automation tools",
            ],
        },
    ],

    experience: [
        {
            id: "exp-2",
            company: "Healthtrip",
            position: "Software Developer | Full Stack | Backend Intern",
            location: "Noida, India",
            startDate: "2024-01",
            endDate: "2024-08",
            description: "Full-stack engineer building scalable healthcare platform solutions with microservices architecture.",
            achievements: [
                "Refactored and migrated 50% of a PHP monolith into NestJS microservices, reducing API latency by 38% (400ms → 250ms) for 10,000+ daily users",
                "Built a self-serve partner platform (Kong, OAuth2, Redis), automating onboarding from 4 days to 10 minutes and increasing partner acquisition by 60%",
                "Implemented multi-tier Redis caching (reduced DB load by 70%) and automated Docker/Kubernetes CI/CD to enable zero-downtime releases",
                "Engineered a fault-tolerant backend translation system supporting 9 languages and 5,000+ entries/day, delivering 100% uptime and boosting global engagement by 70%",
                "Integrated Elasticsearch with multilingual/fuzzy search, improving cross-language matching by 60% and increasing user engagement by 70%",
                "Automated CI/CD (Jenkins, GitHub Actions, Docker, K8s) and configured AWS/Cloudflare (WAF/CDN) to double release frequency, halve page load times (3.2s → 1.6s), and maintain 99.9% uptime",
            ],
            technologies: ["NestJS", "Elasticsearch", "Redis", "JWT/OAuth2", "Jenkins", "GitHub Actions", "AWS", "Cloudflare", "Docker", "Kubernetes"],
        },
        {
            id: "exp-3",
            company: "AST Consulting",
            position: "Software Developer Intern",
            location: "New Delhi, India",
            startDate: "2023-06",
            endDate: "2023-08",
            description: "Led full-stack development for a global SaaS automation platform serving 5,000+ active users.",
            achievements: [
                "Led full-stack SaaS platform (React, NestJS) for 5,000+ users, deploying scalable microservices on AWS",
                "Automated CI/CD (GitHub Actions) for AWS EC2, leveraged CloudFront CDN to cut image loads 50% with 99.5% uptime",
                "Optimized MongoDB queries (–45% latency, 190ms), supporting 1,500+ concurrent requests",
                "Built unified REST/GraphQL API integrating Stripe/Chargebee billing, WhatsApp (WATI), and OpenAI automations",
                "Used Google Analytics and Clarity to drive UX and workflow improvements",
                "Developed cross-platform posting (Telegram, WhatsApp), increasing engagement ~35%",
            ],
            technologies: ["NestJS", "React.js", "MongoDB", "GitHub Actions", "AWS", "CloudFront", "GraphQL", "Stripe", "OpenAI"],
        },
        {
            id: "exp-4",
            company: "Microsoft",
            position: "Mentee at Engage'22",
            location: "Remote",
            startDate: "2022-05",
            endDate: "2022-07",
            description: "Built a full-stack movie recommendation system as part of Microsoft's Engage mentorship program.",
            achievements: [
                "Built a recommendation system using Python to predict movies that users may be interested in based on their past movie ratings",
                "Obtained the dataset for the project from MovieLens for training the recommendation algorithm",
                "Programmed an interactive web page using ReactJS to acquire movie ratings from users and exhibit the recommended movies",
                "Utilized Python as the backend programming language with designated endpoints for receiving and transmitting requests for getting recommended movies and submitting movie ratings",
            ],
            technologies: ["Python", "ReactJS", "Machine Learning", "MovieLens", "REST API"],
        },
    ],

    projects: [
        {
            id: "project-1",
            title: "LeetCode MCP Server",
            description: "Developed an MCP server with 15+ tools and 5 endpoints, delivering median responses <150ms and real-time submission streaming that cut manual testing overhead 80%.",
            image: "/images/projects/leetcode-mcp.jpg",
            technologies: ["Node.js", "TypeScript", "Express", "WebSocket"],
            githubUrl: "https://github.com/ayushjaipuriyar/leetcode-mcpserver",
            featured: true,
        },
        {
            id: "project-2",
            title: "Near-RT RIC ML-based Malicious Traffic Detection",
            description: "Built an ML pipeline on Near-RT RIC with xApps for real-time traffic analysis. Classifiers achieved 67-73% accuracy and F1 up to 76% for detecting malicious network traffic.",
            image: "/images/projects/ric-xapps.jpg",
            technologies: ["Python", "PyTorch", "Open RAN", "Machine Learning"],
            githubUrl: "https://github.com/ayushjaipuriyar/ric-xapps-malicious-detection",
            featured: true,
        },
        {
            id: "project-3",
            title: "Segmentor - M3U8 Stream Downloader",
            description: "Created a Python CLI to download 100+ .m3u8 segments in parallel and assemble streams via ffmpeg in ≤60s, improving throughput 10x and reliability ~70%.",
            image: "/images/projects/segmentor.jpg",
            technologies: ["Python", "ffmpeg", "tkinter", "Async I/O"],
            githubUrl: "https://github.com/ayushjaipuriyar/animepahe-dl",
            featured: true,
        },
        {
            id: "project-4",
            title: "Vantage-14are05 Linux Utility",
            description: "Produced a Linux utility exposing ACPI performance and battery tuning controls with profile switching, reducing battery discharge 20-30% and attracting community contributions.",
            image: "/images/projects/vantage.jpg",
            technologies: ["Linux", "ACPI", "Bash", "System Programming"],
            githubUrl: "https://github.com/ayushjaipuriyar/vantage-14are05",
            featured: false,
        },
        {
            id: "project-5",
            title: "Partner Self-Serve Platform",
            description: "Built a self-serve partner platform with Kong API Gateway, OAuth2, and Redis, automating onboarding from 4 days to 10 minutes and increasing partner acquisition by 60%.",
            image: "/images/projects/partner-platform.jpg",
            technologies: ["NestJS", "Kong", "OAuth2", "Redis", "Docker"],
            featured: false,
        },
        {
            id: "project-6",
            title: "Multilingual Translation System",
            description: "Engineered a fault-tolerant backend translation system supporting 9 languages and 5,000+ entries/day, delivering 100% uptime and boosting global engagement by 70%.",
            image: "/images/projects/translation.jpg",
            technologies: ["NestJS", "Redis", "Elasticsearch", "Microservices"],
            featured: false,
        },
    ],

    seo: {
        title: "Ayush Jaipuriyar | Full Stack Software Engineer",
        description: "Portfolio of Ayush Jaipuriyar - Full Stack Software Engineer specializing in scalable distributed systems, microservices, and cloud infrastructure. Experienced with React, NestJS, AWS, Docker, and Kubernetes.",
        keywords: [
            "software engineer",
            "full stack developer",
            "backend engineer",
            "distributed systems",
            "microservices",
            "react developer",
            "nestjs",
            "nodejs",
            "typescript",
            "aws",
            "docker",
            "kubernetes",
            "devops",
            "portfolio",
            "ayush jaipuriyar",
        ],
        ogImage: "/images/og-image.jpg",
    },
};

export default portfolioConfig;
