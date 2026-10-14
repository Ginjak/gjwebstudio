'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './Reveal.module.scss';

/**
 * Scroll-triggered reveal.
 *
 * Uses IntersectionObserver plus CSS transitions — about 1 KB of JavaScript
 * instead of a 35 KB animation library, and it degrades to "always visible"
 * when JS is off or the user prefers reduced motion.
 *
 * Props
 *  animation  'fade-up' | 'fade' | 'zoom' | 'slide-left' | 'slide-right' | 'none'
 *  delay      ms before the transition starts (stagger children with this)
 *  as         element tag, default 'div'
 *  once       stop observing after the first reveal (default true)
 */
export default function Reveal({
  children,
  animation = 'fade-up',
  delay = 0,
  as: Tag = 'div',
  once = true,
  className,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Respect the OS setting and the accessibility panel toggle.
    const reduced =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.reduceMotion === 'true';

    if (reduced || animation === 'none' || !('IntersectionObserver' in window)) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [animation, once]);

  return (
    <Tag
      ref={ref}
      className={cn(styles.reveal, styles[animation], visible && styles.visible, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
