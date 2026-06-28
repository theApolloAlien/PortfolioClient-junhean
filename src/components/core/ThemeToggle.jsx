import React from 'react';

/**
 * ThemeToggle — the rainbow-aura pill toggle. Track is the spectrum gradient;
 * the knob slides white (light) ↔ black (dark). Controlled via `theme`, or
 * uncontrolled from `defaultTheme`. Calls `onChange(nextTheme)` on click.
 */
export function ThemeToggle({
  theme,
  defaultTheme = 'light',
  onChange,
  height = 40,
  className = '',
  style = {},
  ...rest
}) {
  const [internal, setInternal] = React.useState(defaultTheme);
  const value = theme ?? internal;
  const isDark = value === 'dark';

  const h = height;
  const w = Math.round(h * 2.2);
  const pad = Math.round(h * 0.12);
  const knob = h - pad * 2;
  const travel = w - knob - pad * 2;

  const toggle = () => {
    const next = isDark ? 'light' : 'dark';
    if (theme == null) setInternal(next);
    onChange && onChange(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle colour theme"
      onClick={toggle}
      className={className}
      style={{
        position: 'relative',
        width: w,
        height: h,
        padding: 0,
        border: 'none',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        background: 'linear-gradient(90deg, #C9A8FF 0%, #E81F8C 26%, #7A3FF0 48%, #2FC9B6 70%, #FFC73C 100%)',
        boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.45), var(--shadow-sm)',
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: pad,
          left: pad,
          width: knob,
          height: knob,
          borderRadius: '50%',
          background: isDark ? '#141414' : '#FFFFFF',
          boxShadow: '0 4px 12px rgba(0,0,0,0.28)',
          transform: `translateX(${isDark ? travel : 0}px)`,
          transition: 'transform var(--dur) var(--ease-out), background var(--dur) var(--ease-out)',
        }}
      />
    </button>
  );
}
