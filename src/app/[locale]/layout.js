import { notFound } from 'next/navigation';
import localFont from 'next/font/local';
import Script from 'next/script';

import { locales, defaultLocale, localeTags, path } from '@/config/routes';
import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { siteConfig } from '@/config/site.config';
import { buildMetadata } from '@/lib/seo/metadata';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/layout/SkipLink';
import BackToTop from '@/components/layout/BackToTop';
import AccessibilityPanel from '@/components/a11y/AccessibilityPanel';
import NoFlashScript from '@/components/a11y/NoFlashScript';
import { ConsentProvider } from '@/components/cookies/ConsentProvider';
import CookieBanner from '@/components/cookies/CookieBanner';
import Analytics from '@/components/cookies/Analytics';
import JsonLd from '@/lib/schema/JsonLd';
import { buildNavItems } from '@/lib/content/navigation';

/**
 * Self-hosted fonts, served by Next.js from our own domain (no Google requests).
 *
 * Both files are variable WOFF2 (weights 400–800), subset to Latin + Latin
 * Extended-A, which covers English and every Lithuanian letter. next/font
 * preloads them and generates a size-matched fallback, so text doesn't shift
 * when the font arrives.
 *
 * Files and licences (SIL OFL) live in src/fonts/. Declared here, in the layout
 * that renders <html>, so Next.js emits the <link rel="preload"> tags.
 */
const fontDisplay = localFont({
  src: '../../fonts/PlusJakartaSans-Variable.woff2',
  weight: '400 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-family-display',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
});

const fontBody = localFont({
  src: '../../fonts/Inter-Variable.woff2',
  weight: '400 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-family-body',
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);

  return buildMetadata({
    locale,
    routeKey: 'home',
    title: t('meta.defaultTitle'),
    description: t('meta.defaultDescription'),
  });
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const dict = await getDictionary(locale);
  const t = createTranslator(dict);

  const navItems = buildNavItems(locale, t);

  return (
    <html
      lang={localeTags[locale] ?? defaultLocale}
      className={`no-js ${fontDisplay.variable} ${fontBody.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Applies saved theme / text-size before first paint. */}
        <NoFlashScript />

        {/*
          Google Consent Mode v2 defaults. Everything is denied until the
          visitor actively grants a category in the cookie banner.
        */}
        <Script id="consent-defaults" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
            gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});`}
        </Script>
      </head>

      <body>
        <ConsentProvider>
          <SkipLink label={t('nav.skipToContent')} />

          <Header
            locale={locale}
            nav={{ ...dict.nav, submenu: dict.mega.submenu }}
            navItems={navItems}
            ctaLabel={t('common.getInTouch')}
          />

          <main id="main">{children}</main>

          <Footer locale={locale} t={t} />

          <AccessibilityPanel labels={dict.a11y} />
          <BackToTop label={t('nav.backToTop')} />
          <CookieBanner labels={dict.cookies} policyHref={path(locale, 'cookies')} />
          <Analytics gaId={siteConfig.analytics.gaId} />
        </ConsentProvider>

        {/* Organization / LocalBusiness / WebSite / Person — on every page. */}
        <JsonLd locale={locale} global />
      </body>
    </html>
  );
}
