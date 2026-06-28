import React from 'react';

/* Aurora presets — curated multi-stop sets pulled from the palette. */
const AURA_PRESETS = {
  sunrise:  ['#E81F8C', '#FF6A45', '#FFC73C'],
  violet:   ['#7A3FF0', '#E81F8C', '#C9A8FF'],
  ocean:    ['#2FC9B6', '#7A3FF0', '#C9A8FF'],
  spectrum: ['#E81F8C', '#FF6A45', '#FFC73C', '#2FC9B6', '#7A3FF0'],
};

/* Default blob arrangement (anchored top/left; drift transform animates from here). */
const LAYOUT = [
  { top: '-6%',  left: '2%',  size: 48, dur: 34, delay: 0,   anim: 'aura-drift' },
  { top: '30%',  left: '46%', size: 54, dur: 44, delay: -9,  anim: 'aura-drift-alt' },
  { top: '-14%', left: '54%', size: 42, dur: 38, delay: -17, anim: 'aura-drift' },
  { top: '40%',  left: '8%',  size: 46, dur: 48, delay: -5,  anim: 'aura-drift-alt' },
  { top: '12%',  left: '28%', size: 36, dur: 40, delay: -23, anim: 'aura-drift' },
];

function rgba(hex, a) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/(.)/g, '$1$1') : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * AuraBackdrop — the signature field of soft, blurred, slowly drifting
 * gradient blobs. Drop inside any position:relative + overflow:hidden parent.
 */
export function AuraBackdrop({
  palette = 'sunrise',
  intensity = 'normal',
  blend = 'normal',
  animated = true,
  count,
  className = '',
  style = {},
}) {
  const colors = Array.isArray(palette) ? palette : (AURA_PRESETS[palette] || AURA_PRESETS.sunrise);
  const op = intensity === 'bold' ? 0.95 : intensity === 'subtle' ? 0.5 : 0.78;
  const n = count || Math.min(LAYOUT.length, Math.max(3, colors.length + 1));

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', ...style }}
    >
      {LAYOUT.slice(0, n).map((b, i) => {
        const c = colors[i % colors.length];
        const c2 = colors[(i + 1) % colors.length];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: b.top,
              left: b.left,
              width: `${b.size}vmax`,
              height: `${b.size}vmax`,
              borderRadius: '50%',
              background: `radial-gradient(circle at 34% 30%, ${c} 0%, ${c} 16%, ${rgba(c2, 0.72)} 46%, ${rgba(c2, 0)} 70%)`,
              filter: 'blur(var(--blur-aura))',
              mixBlendMode: blend,
              opacity: op,
              willChange: 'transform',
              animation: animated ? `${b.anim} ${b.dur}s var(--ease-inout) ${b.delay}s infinite` : 'none',
            }}
          />
        );
      })}
    </div>
  );
}
