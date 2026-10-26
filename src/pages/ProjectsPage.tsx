import { FaArrowLeft, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import SectionHeading from "../components/ui/SectionHeading";
import { sortedProjects } from "../data/projects";
import { siteConfig } from "../data/siteData";
import useScrollToTop from "../hooks/useScrollToTop";

const ProjectsPage = () => {
  useScrollToTop();

  return (
    <main className="site-main page-top-space">
      <Link to="/" className="text-link inline-flex items-center gap-2 text-sm mb-12">
        <FaArrowLeft className="text-xs" /> home
      </Link>

      <SectionHeading>projects</SectionHeading>
      <p className="max-w-2xl -mt-4 mb-12 leading-7 text-black/60 dark:text-white/60">
        A collection of mobile, web, cloud, machine learning, and experimental projects I&apos;ve built while learning and working across different parts of software development.
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <a
        href={siteConfig.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-link inline-flex items-center gap-2 mt-12"
      >
        more on GitHub <FaGithub />
      </a>
    </main>
  );
};

export default ProjectsPage;
