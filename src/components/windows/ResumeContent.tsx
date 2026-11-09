import { education, experiences, person } from '../../data/siteData';
import { ExternalLink } from './ExternalLink';

export function ResumeContent() {
  return (
    <article className="resume-document">
      <header className="resume-header">
        <h2>{person.name}</h2>
        {/* <p>{person.role}</p> */}
      </header>
      <section className="resume-section">
        <h3>Education</h3>
        <div className="resume-education">
          <strong>{education.field}</strong>
          <p>{education.institution}, {education.country}</p>
          <span>Expected graduation: {education.expectedGraduation}</span>
        </div>
      </section>
      <section className="resume-section">
        <h3>Experience</h3>
        {experiences.map(job => (
          <div className="resume-job" key={`${job.company}-${job.date}`}>
            <div><strong>{job.title}</strong><span>{job.shortCompany || job.company}</span></div>
            <span className="resume-date">{job.date}</span>
          </div>
        ))}
      </section>
      <section className="resume-section">
        <h3>Technologies</h3>
        <p className="resume-technologies">Java, C#/.NET, Python, React/TypeScript, iOS/Android, MongoDB, AWS/GCP, Docker, Figma</p>
        <p className="resume-ai">AI tools: OpenAI, Claude, GitHub Copilot</p>
      </section>
      <section className="resume-section">
        <h3>Contact</h3>
        <div className="resume-contact">
          <ExternalLink href={person.github} label="GitHub" />
          <ExternalLink href={person.linkedin} label="LinkedIn" />
        </div>
      </section>
    </article>
  );
}
