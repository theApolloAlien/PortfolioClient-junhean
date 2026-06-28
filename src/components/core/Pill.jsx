import React from 'react';

/**
 * Pill — hairline tag chip with tracked-uppercase label. Used for skills,
 * tools and project meta. `tone="solid"` for a filled emphasis chip.
 */
export function Pill({ tone = 'outline', size = 'md', children, className = '', style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const pad = size === 'sm' ? '5px 11px' : '7px 15px';
  const fs = size === 'sm' ? 'var(--text-micro)' : 'var(--text-label)';

  const tones = {
    outline: {
      background: 'transparent',
      color: 'var(--badge-text)',
      boxShadow: `inset 0 0 0 1px ${hover ? 'var(--text-strong)' : 'var(--badge-border)'}`,
    },
    soft: {
      background: hover ? 'var(--surface-sunken)' : 'var(--surface-raised)',
      color: 'var(--text-body)',
      boxShadow: 'inset 0 0 0 1px var(--hairline-soft)',
    },
    solid: {
      background: hover ? 'var(--accent)' : 'var(--text-strong)',
      color: 'var(--surface)',
      boxShadow: 'none',
    },
  };

  return (
    <span
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5em',
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        fontSize: fs,
        letterSpacing: 'var(--track-pill)',
        textTransform: 'uppercase',
        padding: pad,
        borderRadius: 'var(--radius-pill)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        transform: hover ? 'translateY(-1px)' : 'none',
        transition: 'transform var(--dur) var(--ease-out), box-shadow var(--dur-slow) var(--ease-soft), background-color var(--dur-slow) var(--ease-soft), color var(--dur-slow) var(--ease-soft)',
        ...tones[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
