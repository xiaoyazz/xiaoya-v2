import { FaArrowRight, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Project } from "../../types/content";

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
}

const FeaturedProjectCard = ({ project, index }: FeaturedProjectCardProps) => {
  const reversed = index % 2 === 1;

  return (
    <article className={`featured-work ${reversed ? "featured-work-reversed" : ""}`}>
      <Link to={`/projects/${project.id}`} className="featured-media group" aria-label={`View ${project.title}`}>
        <img src={project.coverImage} alt={project.title} />
        <span className="featured-media-overlay" />
      </Link>

      <div className="featured-copy">
        <p className="eyebrow mb-2">featured project</p>
        <Link to={`/projects/${project.id}`} className="inline-block">
          <h3 className="text-2xl md:text-3xl font-semibold text-hover">{project.title}</h3>
        </Link>
        <p className="mt-4 leading-7 text-black/65 dark:text-white/65">{project.summary}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-5 text-xs font-medium tracking-wide text-black/50 dark:text-white/50">
          {project.tags.slice(0, 5).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="flex items-center gap-5 mt-6">
          <Link to={`/projects/${project.id}`} className="text-link inline-flex items-center gap-2">
            case study <FaArrowRight className="text-xs" />
          </Link>
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="icon-hover" aria-label={`${project.title} GitHub repository`}>
            <FaGithub />
          </a>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="icon-hover" aria-label={`Open live ${project.title} project`}>
              <FaExternalLinkAlt className="text-sm" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default FeaturedProjectCard;
