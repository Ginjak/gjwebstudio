'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useConsent } from './ConsentProvider';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

import { createTranslator } from '@/i18n/translator';
import styles from './CookieBanner.module.scss';

/**
 * Cookie banner + settings dialog.
 *
 * Accessibility:
 *  • the banner is a labelled region, not a modal, so it never traps focus
 *  • the settings dialog IS modal: focus trap, Escape to close, focus return
 *  • "Reject non-essential" is as prominent as "Accept all" (GDPR requirement)
 */
export default function CookieBanner({ labels, policyHref }) {
  const t = createTranslator(labels);
  const { decided, ready, settingsOpen, openSettings, closeSettings, acceptAll, rejectAll, save, consent } =
    useConsent();

  const [draft, setDraft] = useState(consent);
  const dialogRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => setDraft(consent), [consent]);

  // Modal behaviour for the settings dialog.
  useEffect(() => {
    if (!settingsOpen) return undefined;

    lastFocused.current = document.activeElement;
    const node = dialogRef.current;
    node?.querySelector('button, input, a')?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSettings();
        return;
      }
      if (event.key !== 'Tab' || !node) return;

      const focusable = node.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus();
    };
  }, [settingsOpen, closeSettings]);

  if (!ready) return null;

  const categories = [
    { id: 'necessary', locked: true },
    { id: 'analytics', locked: false },
    { id: 'marketing', locked: false },
  ];

  return (
    <>
      {!decided && !settingsOpen ? (
        <section className={styles.banner} aria-label={t('title')}>
          <div className={styles.bannerInner}>
            <div className={styles.bannerText}>
              <h2 className={styles.title}>
                <Icon name="cookie" size={20} className={styles.titleIcon} />
                {t('title')}
              </h2>
              <p className={styles.body}>
                {t('body')}{' '}
                <Link href={policyHref} className={styles.policyLink}>
                  {t('policy')}
                </Link>
              </p>
            </div>

            <div className={styles.bannerActions}>
              <Button label={t('acceptAll')} onClick={acceptAll} size="sm" />
              <Button label={t('rejectAll')} onClick={rejectAll} variant="secondary" size="sm" />
              <Button label={t('settings')} onClick={openSettings} variant="ghost" size="sm" />
            </div>
          </div>
        </section>
      ) : null}

      {settingsOpen ? (
        <div className={styles.overlay}>
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
          >
            <div className={styles.dialogHeader}>
              <h2 id="cookie-settings-title" className={styles.dialogTitle}>
                {t('settings')}
              </h2>
              <button type="button" className={styles.close} onClick={closeSettings}>
                <Icon name="close" size={22} strokeWidth={2} />
                <span className="sr-only">{t('close')}</span>
              </button>
            </div>

            <div className={styles.dialogBody}>
              <p className={styles.body}>{t('body')}</p>

              <ul className={styles.categories}>
                {categories.map(({ id, locked }) => (
                  <li key={id} className={styles.category}>
                    <div className={styles.categoryHeader}>
                      <label className={styles.switchLabel} htmlFor={`consent-${id}`}>
                        {t(`categories.${id}.name`)}
                      </label>

                      {locked ? (
                        <span className={styles.always}>
                          {t('categories.necessary.always')}
                        </span>
                      ) : null}

                      <input
                        id={`consent-${id}`}
                        type="checkbox"
                        className={styles.switch}
                        checked={locked ? true : Boolean(draft[id])}
                        disabled={locked}
                        onChange={(e) => setDraft((d) => ({ ...d, [id]: e.target.checked }))}
                        aria-describedby={`consent-${id}-desc`}
                      />
                    </div>
                    <p id={`consent-${id}-desc`} className={styles.categoryDesc}>
                      {t(`categories.${id}.description`)}
                    </p>
                  </li>
                ))}
              </ul>

              <p className={styles.policyRow}>
                <Link href={policyHref} className={styles.policyLink}>
                  {t('policy')}
                </Link>
              </p>
            </div>

            <div className={styles.dialogFooter}>
              <Button label={t('save')} onClick={() => save(draft)} size="sm" />
              <Button label={t('acceptAll')} onClick={acceptAll} variant="secondary" size="sm" />
              <Button label={t('rejectAll')} onClick={rejectAll} variant="ghost" size="sm" />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}


