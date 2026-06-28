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
  const contentRef = useRef(null);
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const sec = secRef.current, aura = auraRef.current, content = contentRef.current;
    if (!sec) return;
    let raf = 0, mx = 0, my = 0;
    const apply = () => {
      raf = 0;
      // Aura follows the pointer (smoothed by its CSS transition).
      if (aura) aura.style.transform = `translate(${mx}px, ${my}px)`;
      // Hero copy drifts down a touch and fades as you scroll past it.
      if (content) {
        const y = window.scrollY;
        const vh = window.innerHeight || 1;
        content.style.transform = `translateY(${(y * 0.2).toFixed(1)}px)`;
        content.style.opacity = (1 - Math.min(y / vh, 1) * 0.85).toFixed(3);
      }
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(apply); };
    const onMove = (e) => {
      const r = sec.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 28;
      my = ((e.clientY - r.top) / r.height - 0.5) * 28;
      schedule();
    };
    const onLeave = () => { mx = 0; my = 0; schedule(); };
    apply();
    sec.addEventListener('mousemove', onMove);
    sec.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      sec.removeEventListener('mousemove', onMove);
      sec.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className="pf-hero pf-section" ref={secRef}>
      <div className="pf-parallax" data-parallax="0.18" style={{ position: 'absolute', inset: 0 }}>
        <div ref={auraRef} style={{ position: 'absolute', inset: 0, transition: 'transform 0.6s var(--ease-out)', willChange: 'transform' }}>
          <AuraBackdrop palette={palettes[pi]} intensity="bold" blend={theme === 'dark' ? 'screen' : 'normal'} />
        </div>
      </div>

      <div className="pf-slider">
        <button onClick={() => step(1)}>Next</button>
        <div className="rule"></div>
        <button onClick={() => step(-1)}>Prev</button>
      </div>

      <div ref={contentRef} className="pf-container pf-hero-content pf-hero-stagger" style={{ position: 'relative', zIndex: 2, textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
