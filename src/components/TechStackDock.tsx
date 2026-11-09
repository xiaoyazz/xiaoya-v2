import { aiTools, techStack } from '../data/techStack';

/** Bottom dock. The AI Tools popover behavior lives in engine/aiTools.ts. */
export function TechStackDock() {
  return (
    <section className="tech-stack" aria-labelledby="tech-stack-title">
      <div className="desktop-dock-row">
        <div className="tech-stack-group">
          <h2 className="tech-stack-title" id="tech-stack-title">Tech stack</h2>
          <ul className="tech-dock">
            {techStack.map(tech => (
              <li key={tech.name}>
                <a className={`tech-app${tech.className ? ` ${tech.className}` : ''}`} data-tech={tech.name} href={tech.href} target="_blank" rel="noopener noreferrer" aria-label={tech.label}>
                  <img src={`assets/tech/${tech.icon}`} alt="" width={26} height={26} />
                  <span className="tech-tooltip" aria-hidden="true">{tech.name}</span>
                </a>
              </li>
            ))}
            <li className="ai-tools-item">
              <button className="tech-app tech-ai" id="ai-tools-toggle" data-tech="AI Tools" type="button" aria-label="AI Tools" aria-expanded="false" aria-controls="ai-tools-popover">
                <svg viewBox="0 0 48 48" width={26} height={26} aria-hidden="true" focusable="false" fill="currentColor">
                  <path d="m22 12 3.5 10.5L36 26l-10.5 3.5L22 40l-3.5-10.5L8 26l10.5-3.5L22 12Z" />
                  <path d="m39 4 1.7 4.3L45 10l-4.3 1.7L39 16l-1.7-4.3L33 10l4.3-1.7L39 4Zm-29 0 1.2 2.8L14 8l-2.8 1.2L10 12 8.8 9.2 6 8l2.8-1.2L10 4Z" />
                </svg>
                <span className="tech-tooltip" aria-hidden="true">AI Tools</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <nav className="ai-tools-popover" id="ai-tools-popover" aria-label="AI Tools" hidden>
        <p className="ai-tools-heading">AI Tools</p>
        <div className="ai-tool-links">
          {aiTools.map(tool => (
            <a className={`ai-tool-link ${tool.className}`} data-ai-tool={tool.name} href={tool.href} target="_blank" rel="noopener noreferrer" key={tool.name}>
              <span className="ai-tool-icon"><span className="ai-tool-mark" aria-hidden="true" /></span>
              <span>{tool.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}
