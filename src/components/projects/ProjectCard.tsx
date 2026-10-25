import { FaRegFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Project } from "../../types/content";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className="scroll-reactive-card relative shadow-sm rounded-md bg-white bg-opacity-80 hover:bg-opacity-95 hover:shadow-lg p-4 flex flex-col dark:bg-[#4b4b4b] dark:bg-opacity-50 dark:shadow-gray-900 dark:hover:shadow-md">
    <div className="flex items-center mb-4">
      <FaRegFolder className="text-4xl text-[#9c505a] dark:text-[#3bba9c]" />
    </div>

    <h3 className="text-lg font-semibold mt-2 mb-2">{project.title}</h3>
    <p className="text-sm mb-4 line-clamp-3">{project.overview}</p>

    <div className="flex flex-wrap gap-2 mb-4">
      {project.tags.map((tag) => (
        <span
          key={tag}
          className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-semibold py-1 px-2 rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="flex justify-between items-center mt-4 mb-4">
      <Link
        to={`/projects/${project.id}`}
        className="text-sm font-semibold underline hover:text-[#9c505a] dark:hover:text-[#3bba9c]"
      >
        Read More
      </Link>
    </div>
  </article>
);

export default ProjectCard;
