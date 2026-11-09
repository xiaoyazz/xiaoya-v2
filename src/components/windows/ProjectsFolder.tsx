import { projects } from '../../data/projects';

// Each tile carries data-open; the desktop engine opens the matching project window on click.
export function ProjectsFolder() {
  return (
    <div className="inside-projects">
      {projects.map(project => (
        <button className="inside-project" data-open={project.id} key={project.id}>
          <span className="photo-frame">
            <img src={`assets/projects/${encodeURIComponent(project.image)}`} alt={`${project.title} screenshot`} draggable={false} loading="lazy" />
          </span>
          <span>{project.title}</span>
        </button>
      ))}
    </div>
  );
}
