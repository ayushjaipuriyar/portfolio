"""
Function Tools for Voice Agent

These tools allow the voice agent to retrieve specific portfolio information
when answering user questions. Each tool is designed to be called by the LLM
when it needs specific data to formulate a response.
"""

from typing import Dict, List, Any, Optional
from portfolio_data import (
    get_portfolio_data,
    PortfolioConfig,
    Experience,
    Project,
    Skill,
    Education,
)


class PortfolioDataProvider:
    """Portfolio Data Provider for Voice Agent"""

    def __init__(self):
        self.data: PortfolioConfig = get_portfolio_data()

    def get_experience_summary(self, company: Optional[str] = None) -> str:
        """
        Get formatted summary of work experience
        @param company Optional company name to filter by
        @returns Formatted experience summary
        """
        experiences = self.data.experience

        # Filter by company if specified
        if company:
            experiences = [
                exp for exp in experiences if company.lower() in exp.company.lower()
            ]

        if not experiences:
            return (
                f"No experience found for company: {company}"
                if company
                else "No experience information available."
            )

        return "\n\n".join(self._format_experience(exp) for exp in experiences)

    def _format_experience(self, exp: Experience) -> str:
        """Format a single experience entry"""
        period = (
            f"{exp.start_date} - Present"
            if exp.current
            else f"{exp.start_date} - {exp.end_date}"
        )

        achievements = "\n".join(
            f"  {i + 1}. {achievement}"
            for i, achievement in enumerate(exp.achievements)
        )
        technologies = ", ".join(exp.technologies)

        return f"""{exp.position} at {exp.company}
Location: {exp.location}
Period: {period}

{exp.description}

Key Achievements:
{achievements}

Technologies: {technologies}"""

    def get_project_details(
        self, featured: Optional[bool] = None, project_id: Optional[str] = None
    ) -> str:
        """
        Get formatted project details
        @param featured If true, only return featured projects
        @param project_id Optional project ID to get specific project
        @returns Formatted project details
        """
        projects = self.data.projects

        # Filter by project ID if specified
        if project_id:
            projects = [p for p in projects if p.id == project_id]
        elif featured:
            # Filter featured projects if requested
            projects = [p for p in projects if p.featured]

        if not projects:
            if project_id:
                return f"No project found with ID: {project_id}"
            return "No projects available."

        return "\n\n".join(self._format_project(project) for project in projects)

    def _format_project(self, project: Project) -> str:
        """Format a single project entry"""
        technologies = ", ".join(project.technologies)
        links = []

        if project.live_url:
            links.append(f"Live: {project.live_url}")
        if project.github_url:
            links.append(f"GitHub: {project.github_url}")

        links_section = f"\nLinks: {' | '.join(links)}" if links else ""
        stats = (
            f"\nGitHub Stars: {project.stargazer_count}"
            if project.stargazer_count
            else ""
        )

        return f"""{project.title}
{project.description}

Technologies: {technologies}{links_section}{stats}"""

    def get_skills_by_category(self, category: Optional[str] = None) -> str:
        """
        Get formatted skills list
        @param category Optional category to filter by (frontend, backend, tools, other)
        @returns Formatted skills list
        """
        skills = self.data.skills

        # Filter by category if specified
        if category:
            normalized_category = category.lower()
            skills = [s for s in skills if s.category.lower() == normalized_category]

        if not skills:
            return (
                f"No skills found in category: {category}"
                if category
                else "No skills information available."
            )

        # Group skills by category
        grouped = self._group_skills_by_category(skills)

        return "\n\n".join(
            f"{self._format_category_name(cat)}: {', '.join(skill.name for skill in skill_list)}"
            for cat, skill_list in grouped.items()
        )

    def _group_skills_by_category(self, skills: List[Skill]) -> Dict[str, List[Skill]]:
        """Group skills by category"""
        grouped: Dict[str, List[Skill]] = {}
        for skill in skills:
            if skill.category not in grouped:
                grouped[skill.category] = []
            grouped[skill.category].append(skill)
        return grouped

    def _format_category_name(self, category: str) -> str:
        """Format category name for display"""
        category_map = {
            "frontend": "Frontend Technologies",
            "backend": "Backend Technologies",
            "tools": "Tools & DevOps",
            "other": "Other Skills",
        }
        return category_map.get(category, category)

    def get_education_summary(self) -> str:
        """
        Get formatted education summary
        @returns Formatted education summary
        """
        education = self.data.education

        if not education:
            return "No education information available."

        return "\n\n".join(self._format_education(edu) for edu in education)

    def _format_education(self, edu: Education) -> str:
        """Format a single education entry"""
        period = (
            f"{edu.start_date} - Present"
            if edu.current
            else f"{edu.start_date} - {edu.end_date}"
        )

        result = f"""{edu.degree} in {edu.field}
{edu.institution}, {edu.location}
Period: {period}"""

        if edu.description:
            result += f"\n\n{edu.description}"

        if edu.achievements:
            achievements = "\n".join(
                f"  {i + 1}. {achievement}"
                for i, achievement in enumerate(edu.achievements)
            )
            result += f"\n\nKey Achievements:\n{achievements}"

        return result

    def get_contact_info(self) -> str:
        """
        Get contact information
        @returns Formatted contact information
        """
        personal = self.data.personal
        social = personal.social

        contact_lines = [
            f"Name: {personal.name}",
            f"Email: {personal.email}",
        ]

        if social.meeting_link:
            contact_lines.append(f"Schedule a Meeting: {social.meeting_link}")

        if social.github:
            contact_lines.append(f"GitHub: {social.github}")

        if social.linkedin:
            contact_lines.append(f"LinkedIn: {social.linkedin}")

        if social.resume_link:
            contact_lines.append(f"Resume: {social.resume_link}")

        return "\n".join(contact_lines)

    def get_personal_info(self) -> str:
        """
        Get personal bio and tagline
        @returns Formatted personal information
        """
        personal = self.data.personal
        return f"{personal.name} - {personal.tagline}\n\n{personal.bio}"

    def get_portfolio_summary(self) -> str:
        """
        Get a quick summary of all portfolio data
        @returns Formatted portfolio summary
        """
        personal = self.data.personal
        experience = self.data.experience
        projects = self.data.projects
        skills = self.data.skills
        education = self.data.education

        featured_projects = [p for p in projects if p.featured]

        return f"""{personal.name} - {personal.tagline}

{personal.bio}

Experience: {len(experience)} positions
Projects: {len(projects)} total ({len(featured_projects)} featured)
Skills: {len(skills)} technical skills across {len(set(s.category for s in skills))} categories
Education: {len(education)} degrees

Contact: {personal.email}
Meeting Link: {personal.social.meeting_link or 'Not available'}"""

    def search_portfolio(self, query: str) -> str:
        """
        Search for content across all portfolio data
        @param query Search query
        @returns Relevant results
        """
        normalized_query = query.lower()
        results = []

        # Search in experience
        relevant_experience = [
            exp
            for exp in self.data.experience
            if (
                normalized_query in exp.company.lower()
                or normalized_query in exp.position.lower()
                or normalized_query in exp.description.lower()
                or any(
                    normalized_query in achievement.lower()
                    for achievement in exp.achievements
                )
                or any(normalized_query in tech.lower() for tech in exp.technologies)
            )
        ]

        if relevant_experience:
            results.append("RELEVANT EXPERIENCE:")
            results.append(
                "\n\n".join(self._format_experience(exp) for exp in relevant_experience)
            )

        # Search in projects
        relevant_projects = [
            proj
            for proj in self.data.projects
            if (
                normalized_query in proj.title.lower()
                or normalized_query in proj.description.lower()
                or any(normalized_query in tech.lower() for tech in proj.technologies)
            )
        ]

        if relevant_projects:
            results.append("\nRELEVANT PROJECTS:")
            results.append(
                "\n\n".join(self._format_project(proj) for proj in relevant_projects)
            )

        # Search in skills
        relevant_skills = [
            skill
            for skill in self.data.skills
            if normalized_query in skill.name.lower()
        ]

        if relevant_skills:
            results.append("\nRELEVANT SKILLS:")
            results.append(", ".join(skill.name for skill in relevant_skills))

        return "\n".join(results) if results else f"No results found for: {query}"


# Create singleton instance
_portfolio_data_provider = PortfolioDataProvider()


# Tool parameter interfaces
class GetExperienceParams:
    company: Optional[str] = None


class GetProjectsParams:
    featured: Optional[bool] = None
    project_id: Optional[str] = None


class GetSkillsParams:
    category: Optional[str] = None


class SearchPortfolioParams:
    query: str


# Function tool definitions for the voice agent
function_tools = [
    {
        "type": "function",
        "function": {
            "name": "getExperience",
            "description": "Get detailed information about work experience, including positions, companies, achievements, and technologies used. Can optionally filter by company name.",
            "parameters": {
                "type": "object",
                "properties": {
                    "company": {
                        "type": "string",
                        "description": "Optional company name to filter experience by (e.g., 'Healthtrip', 'Microsoft')",
                    },
                },
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "getProjects",
            "description": "Get information about projects, including descriptions, technologies used, and links. Can filter by featured projects or get a specific project by ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "featured": {
                        "type": "boolean",
                        "description": "If true, only return featured/highlighted projects",
                    },
                    "projectId": {
                        "type": "string",
                        "description": "Optional project ID to get details for a specific project",
                    },
                },
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "getSkills",
            "description": "Get a list of technical skills organized by category (frontend, backend, tools, other). Can optionally filter by a specific category.",
            "parameters": {
                "type": "object",
                "properties": {
                    "category": {
                        "type": "string",
                        "enum": ["frontend", "backend", "tools", "other"],
                        "description": "Optional category to filter skills by",
                    },
                },
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "getEducation",
            "description": "Get information about educational background, including degrees, institutions, dates, and academic achievements.",
            "parameters": {
                "type": "object",
                "properties": {},
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "getContactInfo",
            "description": "Get contact information including email, meeting link, GitHub, LinkedIn, and resume link.",
            "parameters": {
                "type": "object",
                "properties": {},
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "getPersonalInfo",
            "description": "Get personal information including name, tagline, and bio/summary.",
            "parameters": {
                "type": "object",
                "properties": {},
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "getPortfolioSummary",
            "description": "Get a high-level summary of the entire portfolio including counts of experience, projects, skills, and education.",
            "parameters": {
                "type": "object",
                "properties": {},
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "searchPortfolio",
            "description": "Search across all portfolio data (experience, projects, skills) for content matching a query. Useful for finding specific technologies, companies, or topics.",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Search query to find relevant portfolio information",
                    },
                },
                "required": ["query"],
            },
        },
    },
]


# Function tool handlers
def get_experience_handler(params: GetExperienceParams) -> str:
    """Get work experience information"""
    return _portfolio_data_provider.get_experience_summary(params.company)


def get_projects_handler(params: GetProjectsParams) -> str:
    """Get project information"""
    return _portfolio_data_provider.get_project_details(
        params.featured, params.project_id
    )


def get_skills_handler(params: GetSkillsParams) -> str:
    """Get skills information"""
    return _portfolio_data_provider.get_skills_by_category(params.category)


def get_education_handler() -> str:
    """Get education information"""
    return _portfolio_data_provider.get_education_summary()


def get_contact_info_handler() -> str:
    """Get contact information"""
    return _portfolio_data_provider.get_contact_info()


def get_personal_info_handler() -> str:
    """Get personal information"""
    return _portfolio_data_provider.get_personal_info()


def get_portfolio_summary_handler() -> str:
    """Get portfolio summary"""
    return _portfolio_data_provider.get_portfolio_summary()


def search_portfolio_handler(params: SearchPortfolioParams) -> str:
    """Search portfolio"""
    return _portfolio_data_provider.search_portfolio(params.query)


# Handler mapping
function_handlers = {
    "getExperience": get_experience_handler,
    "getProjects": get_projects_handler,
    "getSkills": get_skills_handler,
    "getEducation": get_education_handler,
    "getContactInfo": get_contact_info_handler,
    "getPersonalInfo": get_personal_info_handler,
    "getPortfolioSummary": get_portfolio_summary_handler,
    "searchPortfolio": search_portfolio_handler,
}


def execute_function_tool(function_name: str, args: Dict[str, Any]) -> str:
    """
    Execute a function tool by name
    @param function_name Name of the function to execute
    @param args Arguments to pass to the function
    @returns Result of the function execution
    """
    handler = function_handlers.get(function_name)

    if not handler:
        return f"Error: Unknown function '{function_name}'"

    try:
        # Convert args dict to appropriate parameter objects
        if function_name == "getExperience":
            params = GetExperienceParams(**args)
        elif function_name == "getProjects":
            params = GetProjectsParams(**args)
        elif function_name == "getSkills":
            params = GetSkillsParams(**args)
        elif function_name == "searchPortfolio":
            params = SearchPortfolioParams(**args)
        else:
            params = args

        return handler(params)
    except Exception as error:
        error_message = str(error)
        return f"Error executing {function_name}: {error_message}"


def get_available_functions() -> List[str]:
    """Get all available function tool names"""
    return list(function_handlers.keys())


def validate_function_params(function_name: str, args: Dict[str, Any]) -> bool | str:
    """
    Validate function parameters
    @param function_name Name of the function
    @param args Arguments to validate
    @returns True if valid, error message if invalid
    """
    tool = next(
        (t for t in function_tools if t["function"]["name"] == function_name), None
    )

    if not tool:
        return f"Unknown function: {function_name}"

    parameters = tool["function"]["parameters"]
    required = parameters.get("required", [])

    # Check required parameters
    for param in required:
        if param not in args:
            return f"Missing required parameter: {param}"

    # Validate enum values if specified
    properties = parameters.get("properties", {})
    for key, value in args.items():
        prop_def = properties.get(key)
        if prop_def and "enum" in prop_def:
            enum_values = prop_def["enum"]
            if value not in enum_values:
                return f"Invalid value for {key}: {value}. Must be one of: {', '.join(enum_values)}"

    return True
