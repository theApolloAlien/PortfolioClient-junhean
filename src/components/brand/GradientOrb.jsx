import React from 'react';

/* Glossy sphere presets: [highlight, mid, shadow]. */
const ORB_PRESETS = {
  magenta: ['#FFC9E6', '#E81F8C', '#5E1E7A'],
  coral:   ['#FFD9A8', '#FF6A45', '#B5275A'],
  gold:    ['#FFF1C2', '#FFC73C', '#FF6A45'],
  teal:    ['#CFFBEF', '#2FC9B6', '#15616B'],
  violet:  ['#E6D6FF', '#7A3FF0', '#2E155F'],
  lavender:['#F0E7FF', '#C9A8FF', '#7A3FF0'],
};

/**
 * GradientOrb — a soft glossy gradient sphere used as a project / experience
 * thumbnail. Pass a preset name or a custom [highlight, mid, shadow] array.
 */
export function GradientOrb({
  palette = 'magenta',
  size = 120,
  gloss = true,
  float = false,
  className = '',
  style = {},
  ...rest
}) {
  const [hi, mid, low] = Array.isArray(palette) ? palette : (ORB_PRESETS[palette] || ORB_PRESETS.magenta);
  return (
    <div className={className} style={{ width: size, height: size, lineHeight: 0, ...style }} {...rest}>
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          position: 'relative',
          overflow: 'hidden',
          background: `radial-gradient(circle at 32% 26%, ${hi} 0%, ${mid} 46%, ${low} 100%)`,
          boxShadow: 'var(--shadow-orb)',
          animation: float ? 'float-orb 6s var(--ease-inout) infinite' : 'none',
        }}
      >
        {gloss && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '9%',
              left: '15%',
              width: '44%',
              height: '32%',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 42% 42%, rgba(255,255,255,0.9), rgba(255,255,255,0) 68%)',
              filter: 'blur(1.5px)',
            }}
          />
        )}
      </div>
    </div>
  );
}
