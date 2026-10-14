'use client';

import { useConsent } from './ConsentProvider';

/**
 * Re-opens the cookie settings dialog. Rendered in the footer so visitors can
 * change their mind at any time, which the GDPR requires.
 */
export default function CookieSettingsButton({ label, className }) {
  const { openSettings } = useConsent();

  return (
    <button type="button" className={className} onClick={openSettings}>
      {label}
    </button>
  );
}
