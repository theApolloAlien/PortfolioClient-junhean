import React from 'react';
import { GradientOrb } from '../brand/GradientOrb.jsx';
import { Pill } from '../core/Pill.jsx';

/**
 * ProjectCard — a roaming aura glows behind the text (role · dates · serif
 * title · one-line outcome + optional tags). The aura is always on, wanders the
 * whole card, and intensifies on hover; the card lifts on hover.
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

  const meta = {
    fontFamily: 'var(--font-sans)',
    letterSpacing: 'var(--track-label-tight)',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
  };

  return (
    <Tag
      href={href}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'block',
        height: '100%',
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
      {/* Always-on aura — wanders the whole card behind the text. */}
      <GradientOrb
        palette={orb}
        size={140}
        roam={84}
        peak={0.55}
        hover={hover}
        style={{ position: 'absolute', top: '6%', left: '14%', zIndex: 0, pointerEvents: 'none' }}
      />

      {/* Content sits above the aura. */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
          {role && (
            <span style={{ ...meta, fontSize: 'var(--text-label)', fontWeight: 500, minWidth: 0 }}>{role}</span>
          )}
          {dates && (
            <span style={{ ...meta, fontSize: 'var(--text-micro)', whiteSpace: 'nowrap' }}>{dates}</span>
          )}
        </div>

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
      </div>
    </Tag>
  );
}
