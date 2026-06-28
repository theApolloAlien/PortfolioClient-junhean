import React from 'react';
import { GradientOrb } from '../brand/GradientOrb.jsx';
import { Pill } from '../core/Pill.jsx';

/**
 * ProjectCard — gradient-orb thumbnail + role · dates · serif title · one-line
 * outcome, with optional meta tags. Lifts and the orb intensifies on hover.
 */
export function ProjectCard({
  title,
  role,
  dates,
  outcome,
  orb = 'magenta',
  tags = [],
  href,
  className = '',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? 'a' : 'div';

  return (
    <Tag
      href={href}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        background: 'var(--surface-raised)',
        border: '1px solid var(--hairline-soft)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-6)',
        boxShadow: hover ? 'var(--shadow-float)' : 'var(--shadow-card)',
        transform: hover ? 'translateY(-6px)' : 'none',
        transition: 'transform var(--dur) var(--ease-out), box-shadow var(--dur) var(--ease-out), background-color var(--dur-slow) var(--ease-soft), border-color var(--dur-slow) var(--ease-soft), color var(--dur-slow) var(--ease-soft)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
        <GradientOrb
          palette={orb}
          size={66}
          style={{ transform: hover ? 'scale(1.07)' : 'none', transition: 'transform var(--dur) var(--ease-out)' }}
        />
        {dates && (
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-micro)',
            letterSpacing: 'var(--track-label-tight)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            paddingTop: '4px',
          }}>{dates}</span>
        )}
      </div>

      {role && (
        <div style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-label)',
          fontWeight: 500,
          letterSpacing: 'var(--track-label-tight)',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: 'var(--space-2)',
        }}>{role}</div>
      )}

      <h3 style={{
        fontFamily: 'var(--font-serif)',
        fontWeight: 500,
        fontSize: 'var(--text-h3)',
        lineHeight: 'var(--leading-snug)',
        letterSpacing: 'var(--track-display)',
        margin: 0,
        color: 'var(--text-strong)',
      }}>{title}</h3>

      {outcome && (
        <p style={{
          margin: 'var(--space-4) 0 0',
          fontSize: 'var(--text-small)',
          lineHeight: 'var(--leading-body)',
          color: 'var(--text-body)',
        }}>{outcome}</p>
      )}

      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-5)' }}>
          {tags.map((t) => <Pill key={t} tone="soft" size="sm">{t}</Pill>)}
        </div>
      )}
    </Tag>
  );
}
