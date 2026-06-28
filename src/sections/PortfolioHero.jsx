/* Hero — oversized serif name over a drifting aurora blob, with an italic
   tagline, a NEXT/PREV palette stepper, corner annotation and scroll cue. */
import { useState, useRef, useEffect } from 'react';
import { AuraBackdrop, Annotation } from '../components';
import { PORTFOLIO } from '../data/portfolio.js';

function ChevronDown({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function PortfolioHero({ theme }) {
  const P = PORTFOLIO;
  const palettes = ['sunrise', 'violet', 'ocean', 'spectrum'];
  const [pi, setPi] = useState(0);
  const step = (d) => setPi((pi + d + palettes.length) % palettes.length);

  const secRef = useRef(null);
  const auraRef = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const sec = secRef.current, aura = auraRef.current;
    if (!sec || !aura) return;
    let raf = 0;
    const onMove = (e) => {
      const r = sec.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 28;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 28;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { aura.style.transform = `translate(${x}px, ${y}px)`; });
    };
    const onLeave = () => { cancelAnimationFrame(raf); aura.style.transform = 'translate(0, 0)'; };
    sec.addEventListener('mousemove', onMove);
    sec.addEventListener('mouseleave', onLeave);
    return () => { sec.removeEventListener('mousemove', onMove); sec.removeEventListener('mouseleave', onLeave); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section id="top" className="pf-hero pf-section" ref={secRef}>
      <div ref={auraRef} style={{ position: 'absolute', inset: 0, transition: 'transform 0.6s var(--ease-out)', willChange: 'transform' }}>
        <AuraBackdrop palette={palettes[pi]} intensity="bold" blend={theme === 'dark' ? 'screen' : 'normal'} />
      </div>

      <div className="pf-slider">
        <button onClick={() => step(1)}>Next</button>
        <div className="rule"></div>
        <button onClick={() => step(-1)}>Prev</button>
      </div>

      <div className="pf-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="pf-eyebrow" data-reveal>{P.eyebrow}</div>
        <h1 className="pf-hero-name" data-reveal style={{ marginTop: 'var(--space-5)' }}>{P.name}</h1>
        <p className="pf-hero-tag" data-reveal style={{ marginTop: 'var(--space-5)', alignSelf: 'center' }}>{P.tagline}</p>
      </div>

      <div className="pf-container" style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Annotation arrow="down-right">{P.annotation}</Annotation>
        <a href="#about" className="pf-chevron" aria-label="Scroll to about" style={{ color: 'var(--text-strong)', display: 'inline-flex' }}>
          <ChevronDown />
        </a>
        <span style={{ width: 90 }}></span>
      </div>
    </section>
  );
}
