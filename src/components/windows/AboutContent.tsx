import { copyright, person } from '../../data/siteData';
import { SocialIcon } from '../SocialIcons';
import { ExternalLink } from './ExternalLink';

/** About Xiaoya, laid out like About This Mac: icon, name, a few spec rows and links. */
export function AboutContent() {
  return (
    <section className="about-summary">
      <span className="about-icon" aria-hidden="true">👩🏻‍💻</span>
      <h2>{person.name}</h2>
      <dl className="about-specs">
        {person.about.map(([label, value]) => (
          <div key={label} style={{ display: 'contents' }}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <div className="about-actions">
        <ExternalLink href={person.github} label="GitHub" icon={<SocialIcon name="github" />} />
        <ExternalLink href={person.linkedin} label="LinkedIn" icon={<SocialIcon name="linkedin" />} />
      </div>
      <p className="about-copyright">{copyright}</p>
    </section>
  );
}
