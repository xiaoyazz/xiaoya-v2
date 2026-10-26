import { FaArrowRight, FaRegFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Project } from "../../types/content";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className="project-card group">
    <div className="flex items-center justify-between mb-6">
      <FaRegFolder className="text-3xl text-[#c57f92] dark:text-[#3bba9c]" />
      <span className="text-xs text-black/35 dark:text-white/35">{project.date}</span>
    </div>

    <Link to={`/projects/${project.id}`}>
      <h3 className="text-xl font-semibold text-hover inline-block">{project.title}</h3>
    </Link>
    <p className="text-sm leading-6 mt-3 mb-6 text-black/60 dark:text-white/60 line-clamp-3">
      {project.overview}
    </p>

    <div className="flex flex-wrap gap-x-3 gap-y-2 mb-7 text-xs text-black/45 dark:text-white/45">
      {project.tags.slice(0, 5).map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>

    <Link to={`/projects/${project.id}`} className="text-link inline-flex items-center gap-2 text-sm mt-auto">
      read more <FaArrowRight className="text-[10px]" />
    </Link>
  </article>
);

export default ProjectCard;
