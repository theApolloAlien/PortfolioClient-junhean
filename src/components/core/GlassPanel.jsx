import React from 'react';

/**
 * GlassPanel — a subtle frosted/solid backing placed behind text where an
 * aurora blob passes underneath, so contrast always holds over the gradient.
 */
export function GlassPanel({
  blur = true,
  radius = 'var(--radius-lg)',
  padding = 'var(--space-6)',
  border = true,
  children,
  className = '',
  style = {},
  ...rest
}) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--glass-tint)',
        backdropFilter: blur ? 'blur(var(--blur-glass)) saturate(1.1)' : 'none',
        WebkitBackdropFilter: blur ? 'blur(var(--blur-glass)) saturate(1.1)' : 'none',
        borderRadius: radius,
        padding,
        boxShadow: border ? 'inset 0 0 0 1px var(--hairline-soft)' : 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
