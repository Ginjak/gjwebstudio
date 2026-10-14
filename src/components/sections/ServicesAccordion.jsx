'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import styles from './ServicesAccordion.module.scss';

/**
 * Two-column service switcher: a list of services on the left, the detail
 * panel on the right (sticky on desktop).
 *
 * Accessibility: implemented as a proper tablist/tabpanel with roving
 * arrow-key navigation. On small screens the panel is stacked under each
 * item instead, so nothing is hidden behind an interaction.
 *
 * items: [{ id, name, excerpt, href }]
 */
export default function ServicesAccordion({ items = [], ctaLabel, ctaHref }) {
  const [active, setActive] = useState(0);

  function onKeyDown(event) {
    const last = items.length - 1;
    let next = null;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;

    if (next !== null) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`service-tab-${next}`)?.focus();
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tabs} role="tablist" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {items.map((item, index) => {
          const selected = index === active;
          return (
            <div key={item.id} className={styles.tabWrap}>
              <button
                id={`service-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`service-panel-${index}`}
                tabIndex={selected ? 0 : -1}
                className={cn(styles.tab, selected && styles.tabActive)}
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
              >
                <span className={styles.tabText}>{item.name}</span>
                <Icon name="arrowRight" size={22} className={styles.tabIcon} />
              </button>

              {/* Mobile: the panel content sits under its own item. */}
              <div className={cn(styles.mobilePanel, selected && styles.mobilePanelOpen)} hidden={!selected}>
                <p className={styles.excerpt}>{item.excerpt}</p>
                <Link href={item.href} className={styles.inlineLink}>
                  {ctaLabel}
                  <Icon name="arrowRight" size={18} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.panels}>
        {/* One persistent card; only its content swaps (and animates in). */}
        <Reveal animation="fade" className={styles.card} style={{ '--active': active }}>
          <span className={styles.glow} aria-hidden="true" />

          {items.map((item, index) => (
            <div
              key={item.id}
              id={`service-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`service-tab-${index}`}
              className={styles.panel}
              hidden={index !== active}
            >
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.panelTitle}>{item.name}</h3>
              <p className={styles.panelExcerpt}>{item.excerpt}</p>
              <div className={styles.panelActions}>
                <Button href={item.href} label={ctaLabel} />
                {ctaHref ? <Button href={ctaHref} label={item.allLabel} variant="link" icon={<Icon name="arrowRight" size={18} />} /> : null}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
