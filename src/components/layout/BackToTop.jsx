'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { isDarkAt } from '@/lib/dark-behind';
import styles from './BackToTop.module.scss';

/** Appears after one viewport of scrolling. Moves focus to <main> on click. */
export default function BackToTop({ label }) {
  const [visible, setVisible] = useState(false);
  const buttonRef = useRef(null);
  // Is the page behind the button dark? Checked as the pointer arrives, so the
  // hover colour never blends into the section underneath.
  const [onDark, setOnDark] = useState(false);

  const checkBehind = useCallback(() => {
    const node = buttonRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    setOnDark(isDarkAt(rect.left + rect.width / 2, rect.top + rect.height / 2, node));
  }, []);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toTop() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    const main = document.getElementById('main');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className={cn(styles.button, onDark && styles.onDark)}
      onPointerEnter={checkBehind}
      onClick={toTop}
      hidden={!visible}
      data-visible={visible}
    >
      <Icon name="arrowUp" size={20} strokeWidth={2} />
      <span className="sr-only">{label}</span>
    </button>
  );
}
