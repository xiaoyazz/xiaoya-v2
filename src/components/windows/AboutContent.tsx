import { copyright, person } from '../../data/siteData';
import { ExternalLink } from './ExternalLink';

/** About Xiaoya: a left-aligned text panel without a photo, opened from the name menu. */
export function AboutContent() {
  return (
    <section className="about-summary">
      <h2>{person.name}</h2>
      <p className="about-subtitle">{person.role}</p>
      <p className="about-bio">{person.about}</p>
      <div className="about-actions">
        <ExternalLink href={person.github} label="GitHub" />
        <ExternalLink href={person.linkedin} label="LinkedIn" />
      </div>
      <p className="about-copyright">{copyright}</p>
    </section>
  );
}
