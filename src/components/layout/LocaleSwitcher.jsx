'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, localeShort, switchLocalePath, defaultLocale } from '@/config/routes';
import { cn } from '@/lib/utils';
import styles from './LocaleSwitcher.module.scss';

/** How long the thumb slides before we navigate — matches the CSS transition. */
const SLIDE_MS = 300;

/**
 * Two-locale switcher rendered as a small segmented control.
 * Each option is a real link, so it works without JavaScript and is
 * crawlable. The current option is marked with aria-current.
 *
 * Switching locale loads a new layout (and a fresh header), so the thumb is
 * slid first and the navigation happens once it has landed.
 */
export default function LocaleSwitcher({ locale, label = 'Language', switchLabel, className }) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [pending, setPending] = useState(null);
  const [navigating, setNavigating] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const [prevLocale, setPrevLocale] = useState(locale);

  // Locale changed (our switch landed, or e.g. browser back) → reset.
  if (locale !== prevLocale) {
    setPrevLocale(locale);
    setPending(null);
    setNavigating(false);
  }

  const switching = pending !== null && pending !== locale;
  const shown = switching ? pending : locale;
  const index = Math.max(locales.indexOf(shown), 0);
  // Spinner from the moment we navigate until the new page has rendered.
  const loading = switching && (navigating || isLoading);

  function onClick(event, target, href) {
    if (target === locale || switching) return;
    // Let modified clicks (new tab / window) behave like a normal link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;

    const reduceMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.reduceMotion === 'true';

    event.preventDefault();
    setPending(target);
    window.setTimeout(
      () => {
        setNavigating(true);
        startTransition(() => router.push(href));
      },
      reduceMotion ? 0 : SLIDE_MS,
    );
  }

  return (
    <nav aria-label={label} aria-busy={loading || undefined} className={cn(styles.switcher, className)}>
      <ul className={styles.list} style={{ '--index': index }}>
        {locales.map((target) => {
          const active = target === locale;
          const href = active
            ? pathname
            : switchLocalePath(pathname, locale ?? defaultLocale, target);

          return (
            <li key={target}>
              <Link
                href={href}
                hrefLang={target}
                lang={target}
                className={cn(styles.item, target === shown && styles.active)}
                aria-current={active ? 'true' : undefined}
                onClick={(event) => onClick(event, target, href)}
              >
                {loading && target === pending ? (
                  <span className={styles.spinner} aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{localeShort[target]}</span>
                )}
                <span className="sr-only">
                  {active
                    ? localeNames[target]
                    : switchLabel
                      ? switchLabel.replace('{language}', localeNames[target])
                      : localeNames[target]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
