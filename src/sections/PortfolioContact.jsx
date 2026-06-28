/* Contact — the dramatic oxblood close: glowing aura, serif headline,
   contact form and LinkedIn CTA, with the minimal signature footer. */
import { useState } from 'react';
import { SectionLabel, Input, Button, AuraBackdrop, Annotation } from '../components';
import { PORTFOLIO } from '../data/portfolio.js';

export function PortfolioContact() {
  const P = PORTFOLIO;
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" data-theme="dark" style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface)', color: 'var(--text-strong)' }}>
      <AuraBackdrop palette="violet" intensity="subtle" blend="screen" />

      <div className="pf-section" style={{ position: 'relative', zIndex: 2 }}>
        <div className="pf-container">
          <SectionLabel index={5} rule data-reveal>Contact</SectionLabel>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-9)', marginTop: 'var(--space-8)', alignItems: 'start' }}>
            <div data-reveal>
              <h2 className="pf-display">Let&rsquo;s talk.</h2>
              <p className="pf-prose" style={{ marginTop: 'var(--space-5)' }}>
                Open to pharmacy roles and projects where clinical rigour meets clear, human communication.
              </p>
              <div style={{ marginTop: 'var(--space-7)', display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                <Button variant="solid" arrow href={P.linkedin} target="_blank" rel="noreferrer">LinkedIn</Button>
                <Annotation arrow="up-right">opens linkedin</Annotation>
              </div>
            </div>

            <form data-reveal onSubmit={(e) => { e.preventDefault(); setSent(true); }} style={{ display: 'grid', gap: 'var(--space-6)' }}>
              <Input label="Name" name="name" placeholder="Your name" />
              <Input label="Email" name="email" type="email" placeholder="you@example.com" />
              <Input label="Message" name="message" multiline rows={4} placeholder="Tell me about the role or project…" />
              <div>
                <Button variant="outline" type="submit">{sent ? 'Thank you — I’ll be in touch ✓' : 'Send message'}</Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <footer className="pf-footer" style={{ position: 'relative', zIndex: 2 }}>
        <span>{P.fullName} · Singapore · 2026</span>
        <span style={{ letterSpacing: 'var(--track-label-tight)', textTransform: 'uppercase', fontSize: 'var(--text-micro)' }}>By Jun Hean — 2026</span>
      </footer>
    </section>
  );
}
