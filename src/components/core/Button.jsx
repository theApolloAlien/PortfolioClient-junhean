import React from 'react';

const PAD = { sm: '9px 18px', md: '13px 26px', lg: '17px 34px' };
const FS  = { sm: '0.72rem', md: '0.8125rem', lg: '0.9rem' };

/**
 * Button — pill-shaped, tracked-uppercase grotesque label.
 * variants: solid (ink fill) · outline (hairline) · ghost (text only).
 */
export function Button({
  variant = 'solid',
  size = 'md',
  arrow = false,
  href,
  children,
  className = '',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = href ? 'a' : 'button';

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.7em',
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: FS[size],
    letterSpacing: 'var(--track-pill)',
    textTransform: 'uppercase',
    padding: variant === 'ghost' ? '0' : PAD[size],
    borderRadius: 'var(--radius-pill)',
    border: '1px solid transparent',
    cursor: 'pointer',
    textDecoration: 'none',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    transition: 'background var(--dur) var(--ease-out), color var(--dur) var(--ease-out), border-color var(--dur) var(--ease-out), transform var(--dur) var(--ease-out)',
    transform: hover && variant !== 'ghost' ? 'translateY(-2px)' : 'none',
  };

  const skins = {
    solid: {
      background: hover ? 'var(--accent)' : 'var(--text-strong)',
      color: 'var(--surface)',
      borderColor: hover ? 'var(--accent)' : 'var(--text-strong)',
    },
    outline: {
      background: hover ? 'var(--text-strong)' : 'transparent',
      color: hover ? 'var(--surface)' : 'var(--text-strong)',
      borderColor: 'var(--badge-border)',
    },
    ghost: {
      background: 'transparent',
      color: hover ? 'var(--accent)' : 'var(--text-strong)',
    },
  };

  return (
    <Tag
      href={href}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...skins[variant], ...style }}
      {...rest}
    >
      {children}
      {arrow && (
        <span aria-hidden="true" style={{
          transition: 'transform var(--dur) var(--ease-out)',
          transform: hover ? 'translateX(3px)' : 'none',
          fontSize: '1.1em',
        }}>→</span>
      )}
    </Tag>
  );
}
