/* Sticky top nav — wordmark, hairline links, theme toggle, mobile burger. */
import { NavLink, ThemeToggle } from '../components';

export function PortfolioNav({ theme, onTheme, scrolled, onBurger, active }) {
  return (
    <header className={'pf-nav' + (scrolled ? ' scrolled' : '')}>
      <a href="#top" className="pf-wordmark">Jun&nbsp;Hean<span style={{ color: 'var(--accent)' }}>.</span></a>

      <nav className="pf-nav-links" aria-label="Primary">
        <NavLink href="#top" active={active === 'top'}>Home</NavLink>
        <NavLink href="#about" active={active === 'about'}>About</NavLink>
        <NavLink href="#work" active={active === 'work'}>Work</NavLink>
        <NavLink href="#contact" active={active === 'contact'}>Contact</NavLink>
      </nav>

      <div className="pf-nav-right">
        <ThemeToggle theme={theme} onChange={onTheme} height={32} />
        <button className="pf-burger" onClick={onBurger} aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
