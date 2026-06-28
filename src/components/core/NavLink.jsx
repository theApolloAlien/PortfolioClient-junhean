import React from 'react';

/**
 * NavLink — hairline tracked-caps nav item with an underline that wipes in
 * from the left on hover / when active.
 */
export function NavLink({ href = '#', active = false, children, className = '', style = {}, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const show = hover || active;
  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-label)',
        fontWeight: 500,
        letterSpacing: 'var(--track-label)',
        textTransform: 'uppercase',
        color: show ? 'var(--text-strong)' : 'var(--text-muted)',
        textDecoration: 'none',
        paddingBottom: '5px',
        transition: 'color var(--dur) var(--ease-out)',
        ...style,
      }}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: '1px',
          width: '100%',
          background: 'var(--text-strong)',
          transformOrigin: 'left center',
          transform: `scaleX(${show ? 1 : 0})`,
          transition: 'transform var(--dur) var(--ease-out)',
        }}
      />
    </a>
  );
}
