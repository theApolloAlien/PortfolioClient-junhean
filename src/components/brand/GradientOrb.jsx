import React from 'react';
import { rgba } from '../../lib/color.js';

/* Aura presets: [core highlight, mid, deep]. The core stays brightest so the
   orb still reads as a "ball"; the deep tone fades out to transparent. */
const ORB_PRESETS = {
  magenta: ['#FFC9E6', '#E81F8C', '#5E1E7A'],
  coral:   ['#FFD9A8', '#FF6A45', '#B5275A'],
  gold:    ['#FFF1C2', '#FFC73C', '#FF6A45'],
  teal:    ['#CFFBEF', '#2FC9B6', '#15616B'],
  violet:  ['#E6D6FF', '#7A3FF0', '#2E155F'],
  lavender:['#F0E7FF', '#C9A8FF', '#7A3FF0'],
};

/* Phase seed per palette so co-located orbs never breathe/drift in sync
   (palettes are distinct within each section). */
const ORB_ORDER = { magenta: 0, coral: 1, gold: 2, teal: 3, violet: 4, lavender: 5 };
const FLOAT_PATHS = ['orb-float-a', 'orb-float-b', 'orb-float-c'];

/**
 * GradientOrb — a soft, blurred, glowing aura ball in a palette hue. It gently
 * floats (translate) and breathes (opacity) on slow, out-of-phase loops, so it
 * reads as living light rather than a hard sphere. Pass a preset name or a
 * custom [core, mid, deep] array.
 *
 * Motion freezes to a calm static glow under prefers-reduced-motion (handled by
 * the global reduced-motion rule in tokens/base.css).
 */
export function GradientOrb({
  palette = 'magenta',
  size = 120,
  roam,                 // px float amplitude (defaults to ~size * 0.28)
  peak = 0.85,          // breathe max opacity (also the static reduced-motion value)
  hover = false,        // intensify: slightly brighter + larger
  className = '',
  style = {},
  ...rest
}) {
  const [core, mid, deep] = Array.isArray(palette) ? palette : (ORB_PRESETS[palette] || ORB_PRESETS.magenta);
  const seed = (typeof palette === 'string' && palette in ORB_ORDER) ? ORB_ORDER[palette] : 0;

  const travel = roam == null ? Math.round(size * 0.28) : roam;
  const trough = +(peak * 0.6).toFixed(3);
  const blurPx = Math.max(2, Math.round(size * 0.13));

  // Out-of-phase timing from the seed — different duration, delay and path.
  const floatDur = 9 + (seed % 4) * 2.1;
  const glowDur = 12 + (seed % 5) * 1.7;
  const floatDelay = -(seed * 2.1 + 1);
  const glowDelay = -(seed * 1.5 + 0.7);
  const path = FLOAT_PATHS[seed % FLOAT_PATHS.length];

  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        lineHeight: 0,
        transform: hover ? 'scale(1.12)' : 'scale(1)',
        transition: 'transform var(--dur) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: `radial-gradient(circle at 40% 36%, ${core} 0%, ${mid} 22%, ${mid} 46%, ${rgba(mid, 0.5)} 64%, ${rgba(deep, 0)} 82%)`,
          filter: hover ? `blur(${blurPx}px) brightness(1.18) saturate(1.08)` : `blur(${blurPx}px)`,
          opacity: peak,
          '--glow-min': trough,
          '--glow-max': peak,
          '--roam': `${travel}px`,
          willChange: 'transform, opacity',
          transition: 'filter var(--dur) var(--ease-out)',
          animation: `${path} ${floatDur}s cubic-bezier(0.4, 0, 0.6, 1) ${floatDelay}s infinite, `
            + `aura-glow ${glowDur}s cubic-bezier(0.4, 0, 0.6, 1) ${glowDelay}s infinite`,
        }}
      />
    </div>
  );
}
