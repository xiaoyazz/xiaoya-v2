import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import useScrollToTop from "../hooks/useScrollToTop";

const ProjectDetailsPage = () => {
  useScrollToTop();
  const { id } = useParams<{ id: string }>();
  const project = projects.find((item) => item.id === Number(id));

  if (!project) {
    return (
      <main className="site-main page-top-space">
        <p>Project not found.</p>
        <Link to="/projects" className="text-link mt-4 inline-block">Back to projects</Link>
      </main>
    );
  }

  return (
    <main className="site-main page-top-space">
      <Link to="/projects" className="text-link inline-flex items-center gap-2 text-sm mb-12">
        <FaArrowLeft className="text-xs" /> projects
      </Link>

      <article className="max-w-3xl">
        <p className="eyebrow mb-3">{project.date}</p>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]">{project.title}</h1>
        <p className="mt-6 text-lg leading-8 text-black/60 dark:text-white/60">{project.summary}</p>

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6 text-xs font-medium text-black/45 dark:text-white/45">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>

        <div className="flex items-center gap-5 mt-7">
          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-2">
            GitHub <FaGithub />
          </a>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-2">
              live site <FaExternalLinkAlt className="text-xs" />
            </a>
          )}
        </div>

        <div className="project-rule" />

        <h2 className="text-2xl font-semibold mb-5">Overview</h2>
        <div className="space-y-3 leading-8 text-black/70 dark:text-white/70">
          {project.overview.split("\n").map((line) => <p key={line}>{line}</p>)}
        </div>

        <div className="space-y-6 mt-10">
          {project.images.map((image, index) => (
            <img
              key={`${project.id}-${index}`}
              src={image}
              alt={`${project.title} screenshot ${index + 1}`}
              className="w-full rounded-2xl border border-black/5 dark:border-white/10 shadow-sm"
            />
          ))}
        </div>
      </article>
    </main>
  );
};

export default ProjectDetailsPage;
