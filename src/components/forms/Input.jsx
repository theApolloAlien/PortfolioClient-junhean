import React from 'react';

/**
 * Input — minimal underlined field. The hairline goes to ink on focus.
 * Set `multiline` for a textarea. Pairs with a tracked-caps label.
 */
export function Input({
  label,
  multiline = false,
  rows = 4,
  id,
  name,
  type = 'text',
  className = '',
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const Tag = multiline ? 'textarea' : 'input';
  const fieldId = id || name;

  return (
    <label className={className} style={{ display: 'block', ...style }}>
      {label && (
        <span style={{
          display: 'block',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-label)',
          fontWeight: 500,
          letterSpacing: 'var(--track-label)',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
          marginBottom: 'var(--space-3)',
        }}>{label}</span>
      )}
      <Tag
        id={fieldId}
        name={name}
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: `1px solid ${focus ? 'var(--text-strong)' : 'var(--hairline)'}`,
          padding: '11px 0',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-body)',
          color: 'var(--text-strong)',
          outline: 'none',
          borderRadius: 0,
          resize: multiline ? 'vertical' : 'none',
          transition: 'border-color var(--dur) var(--ease-out), color var(--dur-slow) var(--ease-soft)',
        }}
        {...rest}
      />
    </label>
  );
}
