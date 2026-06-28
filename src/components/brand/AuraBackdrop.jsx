import React from 'react';
import { rgba } from '../../lib/color.js';

/* Aurora presets — curated multi-stop sets pulled from the palette. */
const AURA_PRESETS = {
  sunrise:  ['#E81F8C', '#FF6A45', '#FFC73C'],
  violet:   ['#7A3FF0', '#E81F8C', '#C9A8FF'],
  ocean:    ['#2FC9B6', '#7A3FF0', '#C9A8FF'],
  spectrum: ['#E81F8C', '#FF6A45', '#FFC73C', '#2FC9B6', '#7A3FF0'],
};

/* Default blob arrangement (anchored top/left; drift transform animates from here).
   glowDur / glowDelay give each blob its own out-of-phase breathe so the auras
   never all peak together (the phase offset is what reads as cinematic). */
const LAYOUT = [
  { top: '-6%',  left: '2%',  size: 48, dur: 34, delay: 0,   anim: 'aura-drift',     glowDur: 13, glowDelay: -2 },
  { top: '30%',  left: '46%', size: 54, dur: 44, delay: -9,  anim: 'aura-drift-alt', glowDur: 17, glowDelay: -7 },
  { top: '-14%', left: '54%', size: 42, dur: 38, delay: -17, anim: 'aura-drift',     glowDur: 11, glowDelay: -4 },
  { top: '40%',  left: '8%',  size: 46, dur: 48, delay: -5,  anim: 'aura-drift-alt', glowDur: 15, glowDelay: -11 },
  { top: '12%',  left: '28%', size: 36, dur: 40, delay: -23, anim: 'aura-drift',     glowDur: 18, glowDelay: -6 },
];

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
  // Breathe from ~60% of the base up to the base opacity — the peak matches the
  // original static look, so the only visible change is the gentle swell.
  const glowMax = op;
  const glowMin = +(op * 0.6).toFixed(3);
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
              '--glow-min': glowMin,
              '--glow-max': glowMax,
              willChange: 'transform, opacity',
              animation: animated
                ? `${b.anim} ${b.dur}s var(--ease-inout) ${b.delay}s infinite, `
                  + `aura-glow ${b.glowDur}s cubic-bezier(0.4, 0, 0.6, 1) ${b.glowDelay}s infinite`
                : 'none',
            }}
          />
        );
      })}
    </div>
  );
}
