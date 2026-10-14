'use client';

import { useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import { cn, formatPrice } from '@/lib/utils';
import styles from './PricingCalculator.module.scss';

/**
 * Indicative project cost calculator.
 *
 * Deliberately simple: a page count plus a set of add-on options, shown as a
 * range rather than a single number so it reads as an estimate. The chosen
 * options are passed to the contact form via query string, so an enquiry
 * arrives with context already attached.
 */
export default function PricingCalculator({ config, labels = {}, locale = 'lt', contactHref = '/kontaktai' }) {
  const [pages, setPages] = useState(config.pages.default);
  const [selected, setSelected] = useState(() => new Set());

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const { low, high } = useMemo(() => {
    const optionsTotal = config.options
      .filter((o) => selected.has(o.id))
      .reduce((sum, o) => sum + o.price, 0);

    const base = config.pages.base + pages * config.pages.pricePerPage + optionsTotal;
    return {
      low: Math.round(base / 50) * 50,
      high: Math.round((base * config.rangeFactor) / 50) * 50,
    };
  }, [pages, selected, config]);

  const query = new URLSearchParams({
    pages: String(pages),
    options: Array.from(selected).join(','),
    estimate: `${low}-${high}`,
  }).toString();

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <div className={styles.sliderBlock}>
          <label className={styles.label} htmlFor="calc-pages">
            {labels.pages}: <strong>{pages}</strong>
          </label>
          <input
            id="calc-pages"
            type="range"
            className={styles.slider}
            min={config.pages.min}
            max={config.pages.max}
            step={1}
            value={pages}
            onChange={(e) => setPages(Number(e.target.value))}
            aria-valuetext={`${pages}`}
          />
          <div className={styles.sliderScale} aria-hidden="true">
            <span>{config.pages.min}</span>
            <span>{config.pages.max}</span>
          </div>
        </div>

        <fieldset className={styles.options}>
          <legend className={styles.legend}>{labels.optionsLegend}</legend>
          <ul className={styles.optionList}>
            {config.options.map((option) => {
              const checked = selected.has(option.id);
              return (
                <li key={option.id}>
                  <label className={cn(styles.option, checked && styles.optionChecked)}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={checked}
                      onChange={() => toggle(option.id)}
                    />
                    <span className={styles.optionText}>
                      <span className={styles.optionName}>{option.name}</span>
                      <span className={styles.optionHint}>{option.hint}</span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </div>

      <aside className={styles.result} aria-live="polite">
        <p className={styles.resultLabel}>{labels.result}</p>
        <p className={styles.resultValue}>
          {formatPrice(low, locale)} – {formatPrice(high, locale)}
        </p>
        <p className={styles.resultNote}>{labels.note}</p>
        <Button href={`${contactHref}?${query}`} label={labels.cta} full />
      </aside>
    </div>
  );
}
