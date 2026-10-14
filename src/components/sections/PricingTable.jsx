'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import styles from './PricingTable.module.scss';

/**
 * Retainer plan cards with a monthly / annual billing toggle.
 *
 * plans: [{
 *   id, name, tagline, bestFor, features: [], monthly, annual,
 *   featured?, custom?, responseTime, ctaHref, ctaLabel
 * }]
 */
export default function PricingTable({
  plans = [],
  labels = {},
  currency = '€',
  showToggle = true,
}) {
  const [annual, setAnnual] = useState(false);
  // Bumped on every switch so the card animation can replay (see .swapA/.swapB).
  const [switches, setSwitches] = useState(0);

  function choose(next) {
    if (next === annual) return;
    setAnnual(next);
    setSwitches((n) => n + 1);
  }

  const swapClass = switches === 0 ? null : switches % 2 ? styles.swapA : styles.swapB;

  return (
    <div className={styles.wrap}>
      {showToggle ? (
        <div className={styles.toggleRow}>
          <div
            className={cn(styles.toggle, annual && styles.toggleAnnual)}
            role="group"
            aria-label={labels.billing ?? 'Billing period'}
          >
            <span className={styles.thumb} aria-hidden="true" />
            <button
              type="button"
              className={cn(styles.toggleBtn, !annual && styles.toggleActive)}
              aria-pressed={!annual}
              onClick={() => choose(false)}
            >
              {labels.monthly}
            </button>
            <button
              type="button"
              className={cn(styles.toggleBtn, annual && styles.toggleActive)}
              aria-pressed={annual}
              onClick={() => choose(true)}
            >
              {labels.annual}
              <span className={styles.saving}>{labels.annualSaving}</span>
            </button>
          </div>
        </div>
      ) : null}

      <ul className={styles.grid}>
        {plans.map((plan, i) => {
          const price = annual ? plan.annual : plan.monthly;

          return (
            <li key={plan.id} className={swapClass} style={{ '--i': i }}>
              <Reveal
                animation="fade-up"
                delay={i * 70}
                className={cn(styles.card, plan.featured && styles.featured)}
              >
                {plan.featured ? <p className={styles.badge}>{labels.mostPopular}</p> : null}

                <h3 className={styles.name}>{plan.name}</h3>
                <p className={styles.tagline}>{plan.tagline}</p>

                <p className={styles.priceRow}>
                  {plan.custom ? <span className={styles.from}>{labels.from}</span> : null}
                  <span className={styles.price}>
                    {currency}
                    <TweenedNumber value={price} />
                  </span>
                  <span className={styles.period}>{labels.perMonth}</span>
                </p>

                {annual && !plan.custom ? (
                  <p className={cn(styles.billed, styles.billedIn)}>{labels.billedAnnually}</p>
                ) : (
                  <p className={styles.billed}>&nbsp;</p>
                )}

                <Button
                  href={plan.ctaHref}
                  label={plan.ctaLabel ?? labels.choosePlan}
                  variant={plan.featured ? 'primary' : 'secondary'}
                  className={styles.cta}
                  full
                />

                {plan.bestFor ? (
                  <p className={styles.bestFor}>
                    <strong>{labels.bestFor}</strong> {plan.bestFor}
                  </p>
                ) : null}

                <ul className={styles.features}>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Icon name="check" size={18} className={styles.check} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {labels.vatNote ? <p className={styles.vat}>{labels.vatNote}</p> : null}
    </div>
  );
}

/** Counts from the previous value to the new one when `value` changes. */
function TweenedNumber({ value, duration = 600 }) {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    if (from === value) return undefined;

    const reduceMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.dataset.reduceMotion === 'true';

    let frame = 0;
    const start = performance.now();

    const tick = (now) => {
      const t = reduceMotion ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - t) ** 3; // ease-out cubic
      const current = Math.round(from + (value - from) * eased);
      fromRef.current = current;
      setDisplay(current);
      if (t < 1) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value, duration]);

  return display;
}
