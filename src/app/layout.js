import '@/styles/globals.scss';

import { siteConfig } from '@/config/site.config';

/**
 * Root layout.
 *
 * The real <html> / <body> live here, but the lang attribute and all page
 * chrome are set by src/app/[locale]/layout.js, which knows the locale.
 * Keeping this file minimal means the fonts and global CSS load exactly once.
 */
export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  // Never block zooming — WCAG 1.4.4 requires 200% zoom to work.
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#12102f' },
  ],
};

export default function RootLayout({ children }) {
  return children;
}
