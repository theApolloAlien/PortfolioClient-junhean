/* About — bio statement + grouped skill pills, with a floating accent orb. */
import { SectionLabel, Pill, GradientOrb } from '../components';
import { PORTFOLIO } from '../data/portfolio.js';

export function PortfolioAbout() {
  const P = PORTFOLIO;
  return (
    <section id="about" className="pf-section" style={{ overflow: 'hidden' }}>
      <div className="pf-container">
        <SectionLabel index={1} rule data-reveal>About</SectionLabel>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto', gap: 'var(--space-7)', alignItems: 'start', marginTop: 'var(--space-8)' }}>
          <p data-reveal style={{
            margin: 0,
            maxWidth: '24ch',
            fontFamily: 'var(--font-serif)',
            fontWeight: 500,
            fontSize: 'clamp(1.6rem, 3.4vw, 2.9rem)',
            lineHeight: 1.22,
            letterSpacing: '-0.01em',
            color: 'var(--text-strong)',
          }}>
            A pharmacist with a communicator&rsquo;s eye.
          </p>
          <GradientOrb palette="lavender" size={108} roam={26} data-reveal style={{ justifySelf: 'end' }} />
        </div>

        <p className="pf-prose" data-reveal style={{ marginTop: 'var(--space-6)' }}>{P.bio}</p>

        <div className="pf-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-7)', marginTop: 'var(--space-9)' }}>
          {P.skills.map((g) => (
            <div className="pf-skillgroup" data-reveal key={g.label}>
              <SectionLabel>{g.label}</SectionLabel>
              <div className="pf-pillrow">
                {g.items.map((it) => <Pill key={it} tone="outline">{it}</Pill>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
