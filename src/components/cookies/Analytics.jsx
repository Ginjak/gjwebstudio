'use client';

import Script from 'next/script';
import { useConsent } from './ConsentProvider';

/**
 * Google Analytics 4 — loaded ONLY after the visitor grants the analytics
 * category. Before that, Consent Mode v2 defaults are set to "denied" in the
 * root layout, so nothing is written to storage.
 *
 * Set NEXT_PUBLIC_GA_ID in .env.local to activate.
 */
export default function Analytics({ gaId }) {
  const { consent, decided } = useConsent();

  if (!gaId || !decided || !consent.analytics) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
