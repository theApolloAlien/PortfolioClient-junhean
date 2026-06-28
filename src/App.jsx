/* App shell — composes all sections; owns theme, scroll & reveal behaviour. */
import { useState, useEffect } from 'react';
import { GrainOverlay } from './components';
import { PortfolioNav } from './sections/PortfolioNav.jsx';
import { PortfolioHero } from './sections/PortfolioHero.jsx';
import { PortfolioAbout } from './sections/PortfolioAbout.jsx';
import { PortfolioExperience } from './sections/PortfolioExperience.jsx';
import { PortfolioWork } from './sections/PortfolioWork.jsx';
import { PortfolioAwards } from './sections/PortfolioAwards.jsx';
import { PortfolioContact } from './sections/PortfolioContact.jsx';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('top');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['top', 'about', 'work', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    document.documentElement.classList.add('js-reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Scroll parallax for tagged backdrops (data-parallax="<factor>") — adds depth
  // as you scroll. Throttled with rAF; frozen under reduced-motion.
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const els = Array.from(document.querySelectorAll('[data-parallax]'));
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of els) {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        const r = el.getBoundingClientRect();
        const offset = ((r.top + r.height / 2) - vh / 2) * speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pf-root">
      <PortfolioNav theme={theme} onTheme={setTheme} scrolled={scrolled} active={active} onBurger={() => { window.location.hash = '#about'; }} />
      <PortfolioHero theme={theme} />
      <PortfolioAbout />
      <PortfolioExperience />
      <PortfolioWork />
      <PortfolioAwards />
      <PortfolioContact />
      <GrainOverlay />
    </div>
  );
}
