"""
Portfolio Data Loader for Agent Worker

This module loads portfolio data. It can load from:
1. Shared config file (if available)
2. API endpoint
3. Local hardcoded data as fallback
"""

import os
import json
from dataclasses import dataclass
from typing import List, Optional
from datetime import datetime
import aiohttp


@dataclass
class SocialLinks:
    """Social media and contact links"""

    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None
    email: Optional[str] = None
    meeting_link: Optional[str] = None
    resume_link: Optional[str] = None


@dataclass
class PersonalInfo:
    """Personal information section"""

    name: str
    tagline: str
    bio: str
    avatar: str
    email: str
    social: SocialLinks


@dataclass
class Skill:
    """Technical skill information"""

    name: str
    category: str  # 'frontend' | 'backend' | 'tools' | 'other'
    icon: Optional[str] = None


@dataclass
class Project:
    """Project information"""

    id: str
    title: str
    description: str
    image: str
    technologies: List[str]
    tags: Optional[List[str]] = None
    live_url: Optional[str] = None
    github_url: Optional[str] = None
    featured: bool = False
    updated_at: Optional[str] = None
    stargazer_count: Optional[int] = None


@dataclass
class Experience:
    """Work experience information"""

    id: str
    company: str
    position: str
    location: str
    start_date: str
    end_date: Optional[str] = None
    current: bool = False
    description: str = ""
    achievements: List[str] = None  # type: ignore
    technologies: List[str] = None  # type: ignore

    def __post_init__(self):
        if self.achievements is None:
            self.achievements = []
        if self.technologies is None:
            self.technologies = []


@dataclass
class Education:
    """Education information"""

    id: str
    institution: str
    degree: str
    field: str
    location: str
    start_date: str
    end_date: Optional[str] = None
    current: bool = False
    description: Optional[str] = None
    achievements: Optional[List[str]] = None


@dataclass
class PortfolioConfig:
    """Complete portfolio configuration"""

    personal: PersonalInfo
    skills: List[Skill]
    projects: List[Project]
    experience: List[Experience]
    education: List[Education]


def load_from_api() -> PortfolioConfig:
    """
    Load portfolio data from the website's API endpoint
    """
    # This would load from the website's API when it's running
    # For now, raise exception to fall back to other methods
    raise Exception("API not available")


def load_from_config_file() -> PortfolioConfig:
    """
    Load portfolio data from shared config file
    """
    # Try to find the website's config file
    possible_paths = [
        "../config/portfolio.ts",  # Relative to agent-worker/src
        "../../config/portfolio.ts",  # From agent-worker/src to root/config
        "../../../config/portfolio.ts",  # Additional levels up
    ]

    for path in possible_paths:
        try:
            full_path = os.path.join(os.path.dirname(__file__), path)
            if os.path.exists(full_path):
                # Parse TypeScript config file (simplified parsing)
                with open(full_path, "r") as f:
                    content = f.read()
                    # This is a simplified parser - in production you'd use a proper TS parser
                    return parse_typescript_config(content)
        except Exception:
            continue

    raise Exception("Config file not found")


def parse_typescript_config(content: str) -> PortfolioConfig:
    """
    Parse TypeScript config content (simplified implementation)
    """
    # This is a placeholder - in a real implementation you'd parse the TS file properly
    # For now, just return hardcoded data
    return load_hardcoded_data()


def load_hardcoded_data() -> PortfolioConfig:
    """
    Load hardcoded portfolio data as fallback
    """
    portfolio_data = PortfolioConfig(
        personal=PersonalInfo(
            name="Ayush Jaipuriyar",
            tagline="Full Stack Software Engineer",
            bio="Full stack Software Engineer specializing in scalable, fault-tolerant distributed systems and APIs. Experienced with AWS, Docker, Kubernetes and CI/CD. Currently pursuing M.Sc. in Computer Science at University of Glasgow.",
            avatar="/images/avatar.jpg",
            email="ayushjaipuriyar21@gmail.com",
            social=SocialLinks(
                github="https://github.com/ayushjaipuriyar",
                linkedin="https://linkedin.com/in/ayushjaipuriyar",
                meeting_link="https://cal.com/ayushjaipuriyar/15min",
                resume_link="/api/resume",
            ),
        ),
        skills=[
            Skill(name="React", category="frontend"),
            Skill(name="Next.js", category="frontend"),
            Skill(name="TypeScript", category="frontend"),
            Skill(name="Node.js", category="backend"),
            Skill(name="NestJS", category="backend"),
            Skill(name="Python", category="backend"),
            Skill(name="AWS", category="tools"),
            Skill(name="Docker", category="tools"),
            Skill(name="Kubernetes", category="tools"),
            Skill(name="PostgreSQL", category="tools"),
            Skill(name="Redis", category="tools"),
            Skill(name="Elasticsearch", category="tools"),
        ],
        projects=[
            Project(
                id="project-1",
                title="LeetCode MCP Server",
                description="Developed an MCP server with 15+ tools and 5 endpoints, delivering median responses <150ms and real-time submission streaming.",
                image="/images/projects/leetcode-mcp.jpg",
                technologies=["Node.js", "TypeScript", "Express", "WebSocket"],
                github_url="https://github.com/ayushjaipuriyar/leetcode-mcpserver",
                featured=True,
            ),
            Project(
                id="project-2",
                title="Near-RT RIC ML-based Malicious Traffic Detection",
                description="Built an ML pipeline on Near-RT RIC with xApps for real-time traffic analysis. Classifiers achieved 67-73% accuracy.",
                image="/images/projects/ric-xapps.jpg",
                technologies=["Python", "PyTorch", "Open RAN", "Machine Learning"],
                github_url="https://github.com/ayushjaipuriyar/ric-xapps-malicious-detection",
                featured=True,
            ),
        ],
        experience=[
            Experience(
                id="exp-1",
                company="Healthtrip",
                position="Software Developer | Full Stack | Backend Intern",
                location="Noida, India",
                start_date="2024-01",
                end_date="2024-08",
                description="Full-stack engineer building scalable healthcare platform solutions with microservices architecture.",
                achievements=[
                    "Refactored and migrated 50% of a PHP monolith into NestJS microservices, reducing API latency by 38%",
                    "Built a self-serve partner platform, automating onboarding from 4 days to 10 minutes",
                    "Implemented multi-tier Redis caching, reducing DB load by 70%",
                ],
                technologies=[
                    "NestJS",
                    "Elasticsearch",
                    "Redis",
                    "Docker",
                    "Kubernetes",
                    "AWS",
                ],
            ),
        ],
        education=[
            Education(
                id="edu-1",
                institution="University of Glasgow",
                degree="M.Sc.",
                field="Computer Science",
                location="Glasgow, UK",
                start_date="2024-09",
                end_date="2025-09",
                description="Pursuing Master's degree in Computer Science with focus on distributed systems and machine learning.",
            ),
        ],
    )

    return portfolio_data


def load_portfolio_data() -> PortfolioConfig:
    """
    Load portfolio data. Tries multiple sources:
    1. API endpoint (if running)
    2. Shared config file
    3. Hardcoded data as fallback
    """
    # Try to load from API first
    try:
        return load_from_api()
    except Exception:
        pass

    # Try to load from shared config file
    try:
        return load_from_config_file()
    except Exception:
        pass

    # Fallback to hardcoded data
    return load_hardcoded_data()


def format_portfolio_for_agent(data: PortfolioConfig) -> str:
    """
    Format portfolio data for agent instructions
    """
    personal = data.personal
    experience = data.experience
    projects = data.projects
    skills = data.skills
    education = data.education

    featured_projects = [p for p in projects if p.featured]
    skill_categories = set(skill.category for skill in skills)

    return f"""
Portfolio Owner: {personal.name}
Current Role: {personal.tagline}
Bio: {personal.bio}

Quick Stats:
- Work Experience: {len(experience)} positions
- Projects: {len(projects)} total ({len(featured_projects)} featured)
- Technical Skills: {len(skills)} skills across {len(skill_categories)} categories
- Education: {len(education)} degrees

Contact Information:
- Email: {personal.email}
- Meeting Link: {personal.social.meeting_link or 'Not available'}
- GitHub: {personal.social.github or 'Not available'}
- LinkedIn: {personal.social.linkedin or 'Not available'}
""".strip()


# Singleton instance
_portfolio_data_cache: Optional[PortfolioConfig] = None


def get_portfolio_data() -> PortfolioConfig:
    """Get cached portfolio data"""
    global _portfolio_data_cache
    if _portfolio_data_cache is None:
        _portfolio_data_cache = load_portfolio_data()
    return _portfolio_data_cache
