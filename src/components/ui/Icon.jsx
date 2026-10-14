/**
 * Inline SVG icon set. No icon library dependency — each icon is a small path
 * and only the ones you actually render end up in the HTML.
 *
 *   <Icon name="bolt" />            decorative (aria-hidden)
 *   <Icon name="mail" title="Email" />  meaningful (gets a <title>)
 */

const paths = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  check: <path d="m5 12.5 4.5 4.5L19 7" />,
  tag: (
    <>
      <path d="M3.5 11.6V4.5a1 1 0 0 1 1-1h7.1a1 1 0 0 1 .7.3l8.2 8.2a1 1 0 0 1 0 1.4l-7.1 7.1a1 1 0 0 1-1.4 0l-8.2-8.2a1 1 0 0 1-.3-.7Z" />
      <circle cx="8" cy="8" r="1.4" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  code: <path d="m9 18-6-6 6-6M15 6l6 6-6 6" />,
  shield: <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />,
  cart: (
    <>
      <path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 8H6" />
      <circle cx="10" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </>
  ),
  move: <path d="M8 5 4 9l4 4M4 9h11a5 5 0 0 1 0 10H9" />,
  plug: <path d="M9 3v6M15 3v6M7 9h10v3a5 5 0 0 1-10 0V9ZM12 17v4" />,
  accessibility: (
    <>
      <circle cx="12" cy="4.5" r="1.8" />
      <path d="M4.5 8.5c2.5.9 5 1.3 7.5 1.3s5-.4 7.5-1.3M12 9.8V15m0 0-3 6m3-6 3 6" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
  phone: (
    <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.3l3.4 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h9M18 12v3.5M15.5 12v2.5" />
    </>
  ),
  tree: <path d="M12 3 6 11h3l-4 6h14l-4-6h3l-6-8ZM12 17v4" />,
  star: <path d="m12 4 2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8L12 4Z" />,
  sparkles: <path d="M12 4v5M12 15v5M4 12h5M15 12h5M6.5 6.5l3 3M14.5 14.5l3 3M17.5 6.5l-3 3M9.5 14.5l-3 3" />,
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M7.5 10v7M7.5 7.2v.01M11.5 17v-7M11.5 13c0-1.7 1-2.6 2.4-2.6S16.5 11.3 16.5 13v4" />
    </>
  ),
  facebook: <path d="M14.5 8.5H17V5.2h-2.6c-2.3 0-3.6 1.5-3.6 3.8V11H8v3.3h2.8V21h3.4v-6.7h2.5l.4-3.3h-2.9V9.5c0-.7.3-1 1.3-1Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7.2v.01" />
    </>
  ),
  github: (
    <path d="M9 19c-4 1.3-4-2.2-5.6-2.7M15 21v-3.4a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6 2.6 5 2.9 5 2.9a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 9.3c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2 12h2M20 12h2M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 14a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H10a1.6 1.6 0 0 0 1-1.5V4a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V10a1.6 1.6 0 0 0 1.5 1H20a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z" />
    </>
  ),
  cookie: (
    <>
      <path d="M21 12a9 9 0 1 1-9-9 3.4 3.4 0 0 0 4.5 4.3A3.4 3.4 0 0 0 21 12Z" />
      <path d="M9 9.5v.01M8 14v.01M13 15v.01M14.5 11.5v.01" />
    </>
  ),
  document: (
    <>
      <path d="M14 3v5h5" />
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20a6 6 0 0 1 12 0M16.5 5.2a3.2 3.2 0 0 1 0 6M17 14.4a6 6 0 0 1 4 5.6" />
    </>
  ),
  chart: <path d="M4 20h16M7 16V9M12 16V5M17 16v-4" />,
  building: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M3 21h18" />
      <path d="M8 7h4M8 11h4M8 15h4" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-9-9.3C1.9 7.3 4.1 4 7.5 4c2 0 3.5 1.1 4.5 2.7C13 5.1 14.5 4 16.5 4c3.4 0 5.6 3.3 4.5 6.7-1.5 4.7-9 9.3-9 9.3Z" />
  ),
  image: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="1.8" />
      <path d="m21 16-5-5-9 9" />
    </>
  ),
  quote: (
    <path d="M9 7c-2.8 0-5 2.2-5 5s2.2 5 5 5c0-3.5-1-4.5-2-5 1.5 0 2-1.5 2-5Zm11 0c-2.8 0-5 2.2-5 5s2.2 5 5 5c0-3.5-1-4.5-2-5 1.5 0 2-1.5 2-5Z" />
  ),
};

export const iconNames = Object.keys(paths);

export default function Icon({ name, title, size = 24, strokeWidth = 1.8, className, ...rest }) {
  const path = paths[name];
  if (!path) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {path}
    </svg>
  );
}
