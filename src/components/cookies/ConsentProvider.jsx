'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * ---------------------------------------------------------------------------
 * CONSENT PROVIDER
 * ---------------------------------------------------------------------------
 * Stores the visitor's cookie choice in a first-party cookie (12 months) and
 * mirrors it into sessionStorage, so the banner is shown once — not on every
 * page view or every session.
 *
 * It also pushes Google Consent Mode v2 signals, so GA4 is told what it may
 * and may not do. Analytics scripts are only injected once `analytics` is
 * granted (see Analytics.jsx).
 *
 * The stored value carries a `version`. Bump CONSENT_VERSION when the cookie
 * policy materially changes and everyone will be asked again — which is what
 * the GDPR expects.
 * ---------------------------------------------------------------------------
 */

export const CONSENT_COOKIE = 'gj_consent';
export const CONSENT_VERSION = 1;
const MAX_AGE_DAYS = 365;

const DEFAULT_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const ConsentContext = createContext(null);

function readCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

function pushConsentMode(consent) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag('consent', 'update', {
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  });
}

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(DEFAULT_CONSENT);
  const [decided, setDecided] = useState(true); // assume decided until hydrated
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Hydrate from the cookie.
  useEffect(() => {
    let stored = null;
    try {
      const raw = readCookie(CONSENT_COOKIE) ?? sessionStorage.getItem(CONSENT_COOKIE);
      if (raw) stored = JSON.parse(raw);
    } catch {
      stored = null;
    }

    if (stored && stored.version === CONSENT_VERSION && stored.choices) {
      setConsent({ ...DEFAULT_CONSENT, ...stored.choices });
      setDecided(true);
      pushConsentMode({ ...DEFAULT_CONSENT, ...stored.choices });
    } else {
      setDecided(false);
    }
    setReady(true);
  }, []);

  const persist = useCallback((choices) => {
    const next = { ...DEFAULT_CONSENT, ...choices, necessary: true };
    const payload = JSON.stringify({
      version: CONSENT_VERSION,
      date: new Date().toISOString(),
      choices: next,
    });

    writeCookie(CONSENT_COOKIE, payload, MAX_AGE_DAYS);
    try {
      sessionStorage.setItem(CONSENT_COOKIE, payload);
    } catch {
      /* private mode — the cookie is enough */
    }

    setConsent(next);
    setDecided(true);
    setSettingsOpen(false);
    pushConsentMode(next);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      decided,
      ready,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
      acceptAll: () => persist({ analytics: true, marketing: true }),
      rejectAll: () => persist({ analytics: false, marketing: false }),
      save: persist,
    }),
    [consent, decided, ready, settingsOpen, persist],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) {
    throw new Error('useConsent must be used inside <ConsentProvider>');
  }
  return ctx;
}
