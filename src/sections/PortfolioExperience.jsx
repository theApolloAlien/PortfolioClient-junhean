/* Experience — editorial timeline of pharmacy & research roles. */
import { SectionLabel, TimelineEntry } from '../components';
import { PORTFOLIO } from '../data/portfolio.js';

export function PortfolioExperience() {
  const P = PORTFOLIO;
  return (
    <section id="experience" className="pf-section pf-section--tight">
      <div className="pf-container">
        <SectionLabel index={2} rule data-reveal>Experience</SectionLabel>
        <div className="pf-stagger" style={{ marginTop: 'var(--space-7)' }}>
          {P.experience.map((e) => (
            <div data-reveal key={e.org}>
              <TimelineEntry orb={e.orb} dates={e.dates} location={e.location} role={e.role} org={e.org}>
                {e.body}
              </TimelineEntry>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
