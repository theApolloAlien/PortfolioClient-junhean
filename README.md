# Ho Jun Hean — Portfolio

**Live demo → [portfolioclient-junhean.vercel.app](https://portfolioclient-junhean.vercel.app)**

A single-page personal portfolio for **Ho Jun Hean** — a final-year Pharmacy (Hons) student at NUS — built on the **Aura** design system: a grainy aurora-gradient editorial look (soft blurred aurora blobs over a warm-grey or oxblood canvas, a fixed film-grain finish, Playfair Display against wide-tracked Space Grotesk).

Implemented as a **React + Vite** app, ported faithfully from the Aura design-system handoff bundle (`aura-portfolio-design-system/`). The original prototype rendered via CDN React + in-browser Babel; this version compiles the same components ahead of time.

## Develop

```bash
npm install
npm run dev      # start the Vite dev server (http://localhost:5173)
```

## Build

```bash
npm run build    # output static site to dist/
npm run preview  # serve the production build locally
```

`dist/` is a fully static site — deploy it to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages). `vite.config.js` uses a relative `base` so it works at a domain root or a subpath.

## Structure

```
index.html                     Vite entry (loads webfonts, mounts the app)
public/favicon.svg             on-brand aurora favicon
src/
  main.jsx                     React root + global CSS imports
  App.jsx                      app shell — theme, scroll & reveal behaviour
  data/portfolio.js            all site content (resume-derived)
  styles/
    styles.css                 token entry (@imports the tokens below)
    tokens/                    colors · typography · spacing · effects · base
    portfolio.css              page-level layout & motion helpers
    app.css                    smooth-scroll / reduced-motion globals
  components/                  Aura design-system primitives
    brand/                     AuraBackdrop · GrainOverlay · GradientOrb
    core/                      Button · Pill · SectionLabel · Annotation · NavLink · ThemeToggle · GlassPanel
    forms/                     Input
    content/                   ProjectCard · TimelineEntry
    index.js                   barrel re-export of all primitives
  sections/                    PortfolioNav · Hero · About · Experience · Work · Awards · Contact
```

## Notes

- **Content** lives in [`src/data/portfolio.js`](src/data/portfolio.js) — edit there to update copy, projects, experience and awards.
- **Theme** toggles between the warm-grey light canvas and the oxblood dark canvas; the contact section is always dark for the dramatic close.
- The **contact form is presentational** (no backend), by design in the source brief — the LinkedIn CTA is the real contact path.
- **Fonts** are Google Fonts (Playfair Display + Space Grotesk), loaded via `<link>` in `index.html`.
- Honours `prefers-reduced-motion`: aurora drift, reveals and the parallax freeze; gradients remain.
- The original handoff bundle is kept under `aura-portfolio-design-system/` for reference and is git-ignored.
