import React from 'react';

const GLYPHS = { 'down-right': '↳', up: '↑', right: '→', down: '↓', 'up-right': '↗', 'up-left': '↖' };

/**
 * Annotation — a tiny tracked-caps corner note led by a directional arrow,
 * e.g. "↳ pharmacy · research · design". Editorial flourish, not a control.
 */
export function Annotation({ arrow = 'down-right', children, className = '', style = {}, ...rest }) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        gap: '0.55em',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-micro)',
        fontWeight: 500,
        letterSpacing: 'var(--track-label-tight)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        lineHeight: 1.5,
        ...style,
      }}
      {...rest}
    >
      {arrow && <span aria-hidden="true" style={{ color: 'var(--text-strong)' }}>{GLYPHS[arrow] || arrow}</span>}
      <span>{children}</span>
    </div>
  );
}
