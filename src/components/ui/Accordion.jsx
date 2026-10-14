'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/utils';
import styles from './Accordion.module.scss';

/**
 * Accessible accordion.
 *  • each header is a real <button> inside a heading of the given level
 *  • aria-expanded / aria-controls wired correctly
 *  • panels stay in the DOM (good for SEO); closed ones collapse to zero
 *    height and get `visibility: hidden` (so screen readers skip them) once
 *    the closing animation has finished — see Accordion.module.scss
 *
 * items: [{ id?, question|title, answer|content }]
 */
export default function Accordion({
  items = [],
  headingLevel = 3,
  allowMultiple = false,
  defaultOpen = [],
  className,
}) {
  const baseId = useId();
  const [open, setOpen] = useState(() => new Set(defaultOpen));
  const Heading = `h${Math.min(Math.max(headingLevel, 2), 6)}`;

  function toggle(index) {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className={cn(styles.accordion, className)}>
      {items.map((item, index) => {
        const isOpen = open.has(index);
        const buttonId = `${baseId}-btn-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.id ?? index} className={cn(styles.item, isOpen && styles.itemOpen)}>
            <Heading className={styles.heading}>
              <button
                id={buttonId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span className={styles.triggerText}>
                  <span className={styles.label}>{item.question ?? item.title}</span>
                </span>
                <span className={styles.indicator} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" className={styles.plusV} />
                  </svg>
                </span>
              </button>
            </Heading>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={styles.panel}
            >
              <div className={styles.panelClip}>
                <div className={styles.panelInner}>{item.answer ?? item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
