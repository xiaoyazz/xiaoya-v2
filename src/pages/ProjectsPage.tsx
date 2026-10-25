import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProjectCard from "../components/projects/ProjectCard";
import { siteConfig } from "../data/siteData";
import { sortedProjects } from "../data/projects";
import useScrollToTop from "../hooks/useScrollToTop";

const ProjectsPage = () => {
  useScrollToTop();

  return (
    <div className="max-w-4xl mx-auto mt-28 px-4 text-left">
      <nav className="flex items-center mb-6 pb-2 text-sm dark:text-gray-400" aria-label="Breadcrumb">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
        >
          <FaHome /> Home
        </Link>
        <span className="mx-2">/</span>
        <span className="font-bold text-[#9c505a] dark:text-[#3bba9c]">Projects</span>
      </nav>

      <h2 className="text-2xl font-bold mb-6 dark:text-[#3bba9c]">Projects</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <p className="mt-12 px-1 text-center">
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#9c505a] transition-colors font-bold underline dark:hover:text-[#3bba9c]"
        >
          See More Projects on Github
        </a>
      </p>

      <p className="mt-6 px-1 text-center">
        <Link
          to="/"
          className="font-bold underline hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
        >
          Back To Home
        </Link>
      </p>

      <hr className="border-t my-4 mt-8" />
    </div>
  );
};

export default ProjectsPage;
