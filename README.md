# Ho Jun Hean Portfolio

**Live demo:** https://portfolioclient-junhean.vercel.app

A single-page personal portfolio for **Ho Jun Hean**, a final-year Pharmacy (Hons) student at NUS.

The site is built with **React + Vite** and follows the **Aura** design system, featuring a grainy aurora-inspired aesthetic with soft gradients, warm-grey and oxblood themes, and typography using Playfair Display and Space Grotesk.

This project is a production-ready port of the original Aura design-system prototype (`aura-portfolio-design-system/`), which was built with CDN React and in-browser Babel. The same components have been migrated to a standard Vite project for development and deployment.

## Development

```bash
npm install
npm run dev      # Starts the Vite development server (http://localhost:5173)
```

## Build

```bash
npm run build    # Builds the production site into dist/
npm run preview  # Serves the production build locally
```

The `dist/` directory contains a fully static site that can be deployed to GitHub Pages, Netlify, Vercel, Cloudflare Pages, or any other static hosting service. `vite.config.js` uses a relative `base`, allowing the site to work from either a root domain or a subdirectory.

## Project Structure

```text
index.html                     Vite entry point
public/favicon.svg             Aurora favicon
src/
  main.jsx                     React entry point and global CSS imports
  App.jsx                      App shell, theme, scrolling, and animations
  data/portfolio.js            Portfolio content
  styles/
    styles.css                 Main stylesheet
    tokens/                    Design tokens
    portfolio.css              Layout and animation styles
    app.css                    Global styles
  components/
    brand/                     AuraBackdrop, GrainOverlay, GradientOrb
    core/                      Button, Pill, SectionLabel, Annotation, NavLink, ThemeToggle, GlassPanel
    forms/                     Input
    content/                   ProjectCard, TimelineEntry
    index.js                   Component exports
  sections/                    PortfolioNav, Hero, About, Experience, Work, Awards, Contact
```

## Notes

* Update portfolio content in `src/data/portfolio.js`, including projects, experience, awards, and personal information.
* The theme can be switched between warm-grey (light) and oxblood (dark). The contact section always uses the dark theme.
* The contact form is presentational only and does not submit data. LinkedIn is the intended contact method.
* Fonts (Playfair Display and Space Grotesk) are loaded from Google Fonts in `index.html`.
* Motion effects respect `prefers-reduced-motion`, disabling animations while preserving the visual design.
* The original design-system handoff is included in `aura-portfolio-design-system/` for reference and is excluded from version control.
