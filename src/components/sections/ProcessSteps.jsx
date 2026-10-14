'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import styles from './ProcessSteps.module.scss';

/** Delay between steps lighting up when the section scrolls into view. */
const STEP_MS = 550;

/**
 * Numbered process as a timeline. When it scrolls into view the steps light
 * up one after another and the connecting line fills; hovering a step makes
 * it the active one.
 *
 * items: [{ step, name, description, duration }]
 */
export default function ProcessSteps({ items = [] }) {
  const listRef = useRef(null);
  const [reached, setReached] = useState(-1); // auto sequence progress
  const [hovered, setHovered] = useState(null);
  const active = hovered ?? reached;

  useEffect(() => {
    const node = listRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      setReached(items.length - 1);
      return undefined;
    }

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const reduceMotion =
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          document.documentElement.dataset.reduceMotion === 'true';
        if (reduceMotion) {
          setReached(items.length - 1);
          return;
        }

        let i = -1;
        timer = window.setInterval(() => {
          i += 1;
          setReached(i);
          if (i >= items.length - 1) window.clearInterval(timer);
        }, STEP_MS);
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
    };
  }, [items.length]);

  return (
    <ol ref={listRef} className={styles.list} onMouseLeave={() => setHovered(null)}>
      {items.map((item, i) => (
        <li
          key={item.step}
          className={cn(styles.item, i < active && styles.done, i === active && styles.current)}
          onMouseEnter={() => setHovered(i)}
        >
          {i < items.length - 1 ? <span className={styles.segment} aria-hidden="true" /> : null}

          <Reveal animation="fade-up" delay={i * 70} className={styles.inner}>
            <span className={styles.node} aria-hidden="true">
              {String(item.step).padStart(2, '0')}
            </span>
            <div className={styles.card}>
              <h3 className={styles.title}>{item.name}</h3>
              <p className={styles.text}>{item.description}</p>
              {item.duration ? <p className={styles.duration}>{item.duration}</p> : null}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
