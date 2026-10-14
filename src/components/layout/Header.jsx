'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import LocaleSwitcher from './LocaleSwitcher';
import MegaPanel from './MegaPanel';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import { path } from '@/config/routes';
import { cn } from '@/lib/utils';
import { isDarkAt } from '@/lib/dark-behind';
import { createTranslator } from '@/i18n/translator';
import styles from './Header.module.scss';

/**
 * Site header.
 *
 * Behaviour (matching the reference site):
 *  • transparent while over the hero; scrolling down keeps that look and
 *    slides it away after 120px
 *  • reappears as a solid + blurred bar when scrolling up
 *  • never hides while the mobile menu is open or focus is inside it
 *  • scroll handling is throttled with requestAnimationFrame
 *
 * Items with `mega` data (see src/lib/content/navigation.js) open a mega menu
 * on desktop — on hover (with a short delay so passing over doesn't flicker)
 * or with the chevron button next to the link (keyboard / touch). In the
 * mobile menu the same items expand as accordions.
 */
export default function Header({ locale, nav, navItems, ctaLabel }) {
  const t = createTranslator(nav);
  const pathname = usePathname();
  const [state, setState] = useState('top'); // look: 'top' (transparent) | 'up' (solid)
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [prevMenuOpen, setPrevMenuOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const headerRef = useRef(null);
  const lastY = useRef(0);
  const ticking = useRef(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const [openMega, setOpenMega] = useState(null); // href of the open mega menu
  const [mobileSub, setMobileSub] = useState(null); // href of the expanded mobile submenu
  const megaTimer = useRef(0);
  const megaButtons = useRef({});

  /* --- Scroll direction ---------------------------------------------------- */
  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;

        if (y < 24) {
          setState('top');
          setHidden(false);
        } else if (delta > 6) {
          // Scrolling down: keep the current look, slide away once past 120px.
          if (y > 120) {
            setHidden(true);
            setOpenMega(null);
          }
        } else if (delta < -6) {
          // Scrolling up: bring it back as the solid bar.
          setState('up');
          setHidden(false);
        }

        lastY.current = y;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --- Is the page behind the (transparent) header dark? ------------------- */
  useEffect(() => {
    let frame = 0;

    const detect = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const header = headerRef.current;
        if (!header) return;
        const rect = header.getBoundingClientRect();
        setOnDark(isDarkAt(window.innerWidth / 2, rect.top + rect.height / 2, header));
      });
    };

    detect();
    // Page CSS can land after this effect runs (notably in dev) — check again.
    window.addEventListener('load', detect);
    window.addEventListener('resize', detect);
    // Re-check when the theme / contrast mode changes.
    const observer = new MutationObserver(detect);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-contrast'],
    });
    // Re-check when page content is swapped in. Switching language mounts a
    // fresh header before the new page is on screen, and no `load` follows.
    const contentObserver = new MutationObserver(detect);
    contentObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('load', detect);
      window.removeEventListener('resize', detect);
      observer.disconnect();
      contentObserver.disconnect();
    };
  }, [pathname]);

  /* --- Close the menu on navigation ---------------------------------------- */
  useEffect(() => {
    setMenuOpen(false);
    setMobileSub(null);
    setOpenMega(null);
  }, [pathname]);

  /* --- Mega menu: hover intent + Escape ------------------------------------ */
  const openMegaSoon = useCallback((href) => {
    window.clearTimeout(megaTimer.current);
    // Switching between items is instant; the first open waits a moment so
    // sweeping the pointer across the bar doesn't flash panels.
    setOpenMega((current) => (current ? href : current));
    megaTimer.current = window.setTimeout(() => setOpenMega(href), 90);
  }, []);

  const closeMegaSoon = useCallback(() => {
    window.clearTimeout(megaTimer.current);
    megaTimer.current = window.setTimeout(() => setOpenMega(null), 180);
  }, []);

  useEffect(() => () => window.clearTimeout(megaTimer.current), []);

  useEffect(() => {
    if (!openMega) return undefined;
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      const button = megaButtons.current[openMega];
      setOpenMega(null);
      // Only move focus if it was inside the header.
      if (headerRef.current?.contains(document.activeElement)) button?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openMega]);

  /* --- Keep the panel visible while its close animation plays -------------- */
  // Set during render (not in an effect) so the panel never gets a frame
  // where it is already hidden before the closing class applies.
  if (menuOpen !== prevMenuOpen) {
    setPrevMenuOpen(menuOpen);
    setMenuClosing(!menuOpen);
  }

  useEffect(() => {
    if (!menuClosing) return undefined;

    // OS setting or the accessibility panel's toggle.
    const reduceMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.reduceMotion === 'true';
    // Matches the CSS: reverse link stagger, then the panel fade.
    const timer = window.setTimeout(
      () => setMenuClosing(false),
      reduceMotion ? 0 : navItems.length * 45 + 320,
    );
    return () => window.clearTimeout(timer);
  }, [menuClosing, navItems.length]);

  /* --- Body scroll lock + Escape + focus trap ------------------------------ */
  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
    panelRef.current?.querySelector('a, button')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  const isActive = useCallback(
    (href) => {
      if (href === path(locale, 'home')) return pathname === href;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [locale, pathname],
  );

  // A top-level item is current if its own page or any page in its menu is.
  const isItemActive = (item) =>
    isActive(item.href) ||
    Boolean(item.mega?.items.some((child) => isActive(child.href)));

  return (
    <header
      ref={headerRef}
      className={cn(
        styles.header,
        styles[state],
        onDark && styles.onDark,
        hidden && styles.down,
        (menuOpen || menuClosing || openMega) && styles.opened,
      )}
      data-scroll-state={hidden ? 'down' : state}
    >
      <div className={styles.inner}>
        <Link href={path(locale, 'home')} className={styles.brand} aria-label={t('home')}>
          <Logo width={51} withWordmark={false} />
        </Link>

        <nav className={styles.desktopNav} aria-label={t('mainLabel')}>
          <ul className={styles.navList}>
            {navItems.map((item) => {
              const open = openMega === item.href;
              const panelId = `mega-${item.href.replace(/\W+/g, '-')}`;

              return (
                <li
                  key={item.href}
                  className={styles.navItem}
                  onMouseEnter={item.mega ? () => openMegaSoon(item.href) : closeMegaSoon}
                  onMouseLeave={item.mega ? closeMegaSoon : undefined}
                  onBlur={
                    item.mega
                      ? (event) => {
                          if (!event.currentTarget.contains(event.relatedTarget)) {
                            setOpenMega((current) =>
                              current === item.href ? null : current,
                            );
                          }
                        }
                      : undefined
                  }
                >
                  {item.mega ? (
                    <>
                      {/* Link + chevron share one hover bubble. */}
                      <div className={cn(styles.navPill, open && styles.navPillOpen)}>
                        <Link
                          href={item.href}
                          className={cn(
                            styles.navLink,
                            styles.navLinkInPill,
                            isItemActive(item) && styles.navLinkActive,
                          )}
                          aria-current={isActive(item.href) ? 'page' : undefined}
                        >
                          {item.label}
                        </Link>
                        <button
                          ref={(node) => {
                            megaButtons.current[item.href] = node;
                          }}
                          type="button"
                          className={cn(styles.megaToggle, open && styles.megaToggleOpen)}
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() =>
                            setOpenMega((current) =>
                              current === item.href ? null : item.href,
                            )
                          }
                        >
                          <span className="sr-only">
                            {t('submenu', { label: item.label })}
                          </span>
                          <Icon name="chevronDown" size={14} strokeWidth={2.5} />
                        </button>
                      </div>

                      <div
                        id={panelId}
                        className={cn(styles.mega, open && styles.megaOpen)}
                        inert={!open}
                      >
                        <MegaPanel mega={item.mega} isActive={isActive} />
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        styles.navLink,
                        isItemActive(item) && styles.navLinkActive,
                      )}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <LocaleSwitcher
            locale={locale}
            label={t('languageLabel')}
            switchLabel={t('switchTo')}
          />
          <Button
            href={path(locale, 'contact')}
            label={ctaLabel}
            size="sm"
            className={styles.cta}
          />
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? t('closeMenu') : t('openMenu')}</span>
            <span
              className={cn(styles.burger, menuOpen && styles.burgerOpen)}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        ref={panelRef}
        className={cn(styles.panel, menuClosing && styles.panelClosing)}
        style={{ '--n': navItems.length }}
        hidden={!menuOpen && !menuClosing}
        role="dialog"
        aria-modal="true"
        aria-label={t('mainLabel')}
      >
        <nav aria-label={t('mainLabel')}>
          <ul className={styles.panelList}>
            {navItems.map((item, i) => {
              const expanded = mobileSub === item.href;
              const subId = `mobile-sub-${item.href.replace(/\W+/g, '-')}`;
              const children = item.mega
                ? [...item.mega.items, ...(item.mega.all ? [item.mega.all] : [])]
                : [];

              return (
                <li key={item.href} className={styles.panelItem} style={{ '--i': i }}>
                  <div className={styles.panelRow}>
                    <Link
                      href={item.href}
                      className={cn(
                        styles.panelLink,
                        isItemActive(item) && styles.panelLinkActive,
                      )}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>

                    {item.mega ? (
                      <button
                        type="button"
                        className={cn(
                          styles.panelSubToggle,
                          expanded && styles.panelSubToggleOpen,
                        )}
                        aria-expanded={expanded}
                        aria-controls={subId}
                        onClick={() =>
                          setMobileSub((current) =>
                            current === item.href ? null : item.href,
                          )
                        }
                      >
                        <span className="sr-only">
                          {t('submenu', { label: item.label })}
                        </span>
                        <Icon name="chevronDown" size={20} strokeWidth={2.25} />
                      </button>
                    ) : null}
                  </div>

                  {item.mega ? (
                    <div
                      id={subId}
                      className={cn(styles.panelSub, expanded && styles.panelSubOpen)}
                    >
                      <ul className={styles.panelSubList}>
                        {children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={cn(
                                styles.panelSubLink,
                                child === item.mega.all && styles.panelSubLinkAll,
                              )}
                              aria-current={isActive(child.href) ? 'page' : undefined}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.panelFooter}>
          <Button href={path(locale, 'contact')} label={ctaLabel} full />
        </div>
      </div>
    </header>
  );
}
