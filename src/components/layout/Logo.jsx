import { siteConfig } from '@/config/site.config';

/**
 * Inline logo mark. Inlining avoids an extra request and lets the mark inherit
 * `currentColor`, so it works on light, dark and high-contrast backgrounds.
 */
export default function Logo({ width = 132, withWordmark = true, className, title }) {
  const height = Math.round((width / 1671.9) * 1370.7);

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
    >
      <svg
        viewBox="0 0 1671.9 1370.7"
        width={withWordmark ? Math.round(width * 0.34) : width}
        height={withWordmark ? Math.round(height * 0.34) : height}
        role="img"
        aria-label={title ?? siteConfig.name}
        focusable="false"
        style={{ flex: '0 0 auto' }}
      >
        <path
          fill="currentColor"
          d="M1671.9 0v334.9H690.4c-195.6 0-355.5 159.9-355.5 355.5 0 85.6 30.6 164.4 81.6 225.9 40.8 49.4 94.7 87.7 156.3 109.5v345c-15-2.6-29.9-5.7-44.6-9.2-38.6-9.4-76-22-111.7-37.6C172 1217.3 0 973 0 690.5 0 310.7 310.7 0 690.5 0h981.4z"
        />
        <path
          fill="currentColor"
          d="M1671.9 553.3v817.4H1337v-204.4l-204.4 204.4H659l324.1-324.1 158-158H756V553.3z"
        />
      </svg>
      {withWordmark ? (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1.0625rem',
            letterSpacing: '-0.01em',
            lineHeight: 1.1,
            whiteSpace: 'nowrap',
          }}
        >
          {siteConfig.name}
        </span>
      ) : null}
    </span>
  );
}
