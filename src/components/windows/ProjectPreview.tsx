import type { Project } from '../../data/types';
import { ExternalLink } from './ExternalLink';

/** Preview-style project window: the original screenshot, overview, tags, and links. */
export function ProjectPreview({ project }: { project: Project }) {
  return (
    <>
      <div className="preview-image-wrap">
        <img className="preview-image" src={`assets/projects/${encodeURIComponent(project.image)}`} alt={`${project.title} actual screenshot`} />
      </div>
      <div className="preview-details">
        <h2>{project.title}</h2>
        <p>{project.overview}</p>
        <div className="preview-tags">{project.tags.join(' · ')}</div>
        <div className="preview-links">
          <ExternalLink href={project.github} label="View source" />
          {project.live && <ExternalLink href={project.live} label="Visit project" />}
        </div>
      </div>
    </>
  );
}
