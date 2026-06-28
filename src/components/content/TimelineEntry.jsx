import React from 'react';
import { GradientOrb } from '../brand/GradientOrb.jsx';

/**
 * TimelineEntry — one editorial experience row: dates / location in a narrow
 * left rail, role · organisation · description on the right, hairline on top.
 * Optional aurora orb as the timeline marker.
 */
export function TimelineEntry({
  org,
  role,
  dates,
  location,
  orb,
  children,
  className = '',
  style = {},
  ...rest
}) {
  return (
    <article
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(120px, 200px) 1fr',
        gap: 'var(--space-7)',
        padding: 'var(--space-7) 0',
        borderTop: '1px solid var(--hairline-soft)',
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-label)',
          fontWeight: 600,
          letterSpacing: 'var(--track-label-tight)',
          textTransform: 'uppercase',
          color: 'var(--text-strong)',
        }}>{dates}</span>
        {location && (
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-micro)',
            letterSpacing: 'var(--track-label-tight)',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}>{location}</span>
        )}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
          {orb && <GradientOrb palette={orb} size={30} gloss={false} />}
          {role && (
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-label)',
              fontWeight: 500,
              letterSpacing: 'var(--track-label-tight)',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
            }}>{role}</span>
          )}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: 'var(--text-h3)',
          lineHeight: 'var(--leading-snug)',
          letterSpacing: 'var(--track-display)',
          margin: '0 0 var(--space-3)',
          color: 'var(--text-strong)',
        }}>{org}</h3>
        {children && (
          <p style={{
            margin: 0,
            maxWidth: '54ch',
            fontSize: 'var(--text-body)',
            lineHeight: 'var(--leading-body)',
            color: 'var(--text-body)',
          }}>{children}</p>
        )}
      </div>
    </article>
  );
}
