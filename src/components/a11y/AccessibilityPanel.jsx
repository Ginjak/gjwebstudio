'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { isDarkAt } from '@/lib/dark-behind';
import { createTranslator } from '@/i18n/translator';
import styles from './AccessibilityPanel.module.scss';

/**
 * ---------------------------------------------------------------------------
 * ACCESSIBILITY PANEL
 * ---------------------------------------------------------------------------
 * A floating button that opens a dialog of display preferences. Every setting
 * writes a data-attribute onto <html>, which globals.scss reacts to, and is
 * persisted in localStorage so it survives navigation and future visits.
 *
 * Settings:
 *   fontScale     1 | 1.15 | 1.3
 *   theme         light | dark
 *   contrast      normal | high
 *   reduceMotion  true | false
 *   underline     true | false
 *   dyslexic      true | false
 *   spacing       normal | wide
 *
 * These are *display* preferences, not a replacement for building the site
 * accessibly in the first place — the underlying markup is WCAG 2.2 AA either
 * way.
 * ---------------------------------------------------------------------------
 */

const STORAGE_KEY = 'gj_a11y';

const DEFAULTS = {
  fontScale: 1,
  theme: 'light',
  contrast: 'normal',
  reduceMotion: false,
  underline: false,
  dyslexic: false,
  spacing: 'normal',
};

export function applyA11ySettings(settings) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--font-scale', String(settings.fontScale));
  root.dataset.theme = settings.theme;
  root.dataset.contrast = settings.contrast;
  root.dataset.reduceMotion = String(settings.reduceMotion);
  root.dataset.underlineLinks = String(settings.underline);
  root.dataset.dyslexic = String(settings.dyslexic);
  root.dataset.spacing = settings.spacing;
}

export default function AccessibilityPanel({ labels }) {
  const t = createTranslator(labels);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULTS);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  // Is the page behind the floating button dark? Checked as the pointer
  // arrives, so the hover colour never blends into the section underneath.
  const [onDark, setOnDark] = useState(false);

  const checkBehind = useCallback(() => {
    const node = triggerRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setOnDark(isDarkAt(rect.left + rect.width / 2, rect.top + rect.height / 2, node));
  }, []);

  /* --- Load saved preferences --------------------------------------------- */
  useEffect(() => {
    let saved = null;
    try {
      saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    } catch {
      saved = null;
    }

    const prefersDark =
      window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;

    const next = { ...DEFAULTS, theme: prefersDark ? 'dark' : 'light', ...(saved || {}) };
    setSettings(next);
    applyA11ySettings(next);
  }, []);

  const update = useCallback((patch) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      applyA11ySettings(next);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable — settings still apply for this page */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULTS);
    applyA11ySettings(DEFAULTS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  /* --- Modal behaviour ----------------------------------------------------- */
  useEffect(() => {
    if (!open) return undefined;
    const node = dialogRef.current;
    node?.querySelector('button, input')?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !node) return;

      const focusable = node.querySelectorAll('button:not([disabled]), input, a[href]');
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
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const toggles = [
    { key: 'theme', label: t('theme'), on: settings.theme === 'dark', set: (v) => update({ theme: v ? 'dark' : 'light' }) },
    { key: 'contrast', label: t('contrast'), on: settings.contrast === 'high', set: (v) => update({ contrast: v ? 'high' : 'normal' }) },
    { key: 'reduceMotion', label: t('motion'), on: settings.reduceMotion, set: (v) => update({ reduceMotion: v }) },
    { key: 'underline', label: t('underline'), on: settings.underline, set: (v) => update({ underline: v }) },
    { key: 'dyslexic', label: t('dyslexic'), on: settings.dyslexic, set: (v) => update({ dyslexic: v }) },
    { key: 'spacing', label: t('spacing'), on: settings.spacing === 'wide', set: (v) => update({ spacing: v ? 'wide' : 'normal' }) },
  ];

  const sizes = [
    { value: 1, label: t('textSizeNormal') },
    { value: 1.15, label: t('textSizeLarge') },
    { value: 1.3, label: t('textSizeXl') },
  ];

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(styles.trigger, onDark && styles.onDark)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        onPointerEnter={checkBehind}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="accessibility" size={22} strokeWidth={2} />
        <span className="sr-only">{open ? t('close') : t('open')}</span>
      </button>

      {open ? (
        <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div
            id="a11y-panel"
            ref={dialogRef}
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="a11y-title"
          >
            <div className={styles.header}>
              <h2 id="a11y-title" className={styles.title}>
                {t('title')}
              </h2>
              <button type="button" className={styles.close} onClick={() => setOpen(false)}>
                <Icon name="close" size={22} strokeWidth={2} />
                <span className="sr-only">{t('close')}</span>
              </button>
            </div>

            <div className={styles.body}>
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>{t('textSize')}</legend>
                <div className={styles.segmented} role="group">
                  {sizes.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      className={cn(
                        styles.segment,
                        settings.fontScale === size.value && styles.segmentActive,
                      )}
                      aria-pressed={settings.fontScale === size.value}
                      onClick={() => update({ fontScale: size.value })}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <ul className={styles.toggles}>
                {toggles.map((item) => (
                  <li key={item.key} className={styles.toggleRow}>
                    <span id={`a11y-${item.key}-label`} className={styles.toggleLabel}>
                      {item.label}
                    </span>
                    <button
                      type="button"
                      className={cn(styles.switch, item.on && styles.switchOn)}
                      role="switch"
                      aria-checked={item.on}
                      aria-labelledby={`a11y-${item.key}-label`}
                      onClick={() => item.set(!item.on)}
                    >
                      <span className={styles.knob} aria-hidden="true" />
                      <span className="sr-only">{item.on ? t('on') : t('off')}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <Button label={t('reset')} onClick={reset} variant="ghost" size="sm" full />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
