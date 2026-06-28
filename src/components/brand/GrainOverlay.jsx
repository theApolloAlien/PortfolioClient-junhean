import React from 'react';

/**
 * GrainOverlay — the pervasive film-grain texture. Fixed by default so it
 * does not scroll with content. Sits above everything; never intercepts clicks.
 */
export function GrainOverlay({
  fixed = true,
  opacity,
  blend = 'overlay',
  zIndex = 9999,
  className = '',
  style = {},
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex,
        backgroundImage: 'var(--grain)',
        backgroundSize: '150px 150px',
        backgroundRepeat: 'repeat',
        opacity: opacity ?? 'var(--grain-opacity)',
        mixBlendMode: blend,
        ...style,
      }}
    />
  );
}
