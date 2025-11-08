import { HomeWithLoading } from "@/components/home-with-loading";
import portfolioConfig from "@/config/portfolio";
import { fetchGitHubProjects } from "@/lib/github";

export default async function Home() {
    // Fetch projects from GitHub using Octokit
    const githubProjects = await fetchGitHubProjects();

    // Use GitHub projects if available, otherwise fallback to config
    const projects = githubProjects.length > 0 ? githubProjects : portfolioConfig.projects;

    return (
        <HomeWithLoading
            personalInfo={portfolioConfig.personal}
            skills={portfolioConfig.skills}
            projects={projects}
        />
    );
}
