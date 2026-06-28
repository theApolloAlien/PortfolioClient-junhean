import React from 'react';

/**
 * SectionLabel — tracked-uppercase eyebrow. Optional index number and a
 * trailing hairline rule for editorial section openers.
 */
export function SectionLabel({ index, children, rule = false, className = '', style = {}, ...rest }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-label)',
        fontWeight: 500,
        letterSpacing: 'var(--track-label)',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        ...style,
      }}
      {...rest}
    >
      {index != null && (
        <span style={{ color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>
          {String(index).padStart(2, '0')}
        </span>
      )}
      <span>{children}</span>
      {rule && <span style={{ flex: 1, height: '1px', background: 'var(--hairline)' }} />}
    </div>
  );
}
