/* Selected work — grid of gradient-orb project cards, each a distinct hue. */
import { SectionLabel, ProjectCard } from '../components';
import { PORTFOLIO } from '../data/portfolio.js';

export function PortfolioWork() {
  const P = PORTFOLIO;
  return (
    <section id="work" className="pf-section">
      <div className="pf-container">
        <SectionLabel index={3} rule data-reveal>Selected work</SectionLabel>
        <div className="pf-work-grid pf-stagger" style={{ marginTop: 'var(--space-8)' }}>
          {P.projects.map((p) => (
            <div data-reveal key={p.title}>
              <ProjectCard orb={p.orb} role={p.role} dates={p.dates} title={p.title} outcome={p.outcome} tags={p.tags} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
