/* Awards — compact tracked-caps strip with hairline dividers. */
import { SectionLabel } from '../components';
import { PORTFOLIO } from '../data/portfolio.js';

export function PortfolioAwards() {
  const P = PORTFOLIO;
  return (
    <section id="awards" className="pf-section pf-section--tight">
      <div className="pf-container">
        <SectionLabel index={4} rule data-reveal>Awards</SectionLabel>
        <div data-reveal style={{ marginTop: 'var(--space-7)' }}>
          {P.awards.map((a) => (
            <div className="pf-award" key={a.name}>
              <span className="pf-award-name">{a.name}</span>
              <span className="pf-award-year">{a.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
