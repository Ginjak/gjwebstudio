'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import styles from './TestimonialSlider.module.scss';

/**
 * Testimonial carousel.
 *
 *  • one large quote card at a time; arrows, swipe, ←/→ keys and the review
 *    chips underneath all switch it
 *  • rotates on its own, and the active chip fills as a progress bar. There
 *    is no pause button; instead the movement stops by itself:
 *      – it pauses while the pointer or keyboard focus is inside
 *      – it stops for good as soon as the visitor uses any control
 *      – it stops after one full round of all the reviews
 *      – it never starts with reduced motion (OS setting or the a11y panel)
 *  • every quote is in the HTML (inactive ones are `hidden`) for SEO
 *
 * The progress bar's CSS animation *is* the timer: when it ends we advance,
 * so the bar and the rotation can never drift apart.
 *
 * items:  [{ id, quote, author, rating, project?: { title, href } }]
 * labels: { region, slideOf, previous, next, viewProject, choose }
 */
export default function TestimonialSlider({ items = [], labels = {}, interval = 7000 }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [stopped, setStopped] = useState(false); // used a control, or finished a round
  const [held, setHeld] = useState(false); // pointer/focus inside
  const [reduced, setReduced] = useState(false);
  const autoSteps = useRef(0);
  const pointerX = useRef(null);
  const baseId = useId();
  const count = items.length;

  // Reduced motion = no rotation. Watch both the OS setting and the
  // accessibility panel's toggle *live*: the global reduce-motion CSS shortens
  // animations to ~0ms, which would otherwise make the progress-bar timer
  // fire instantly and race through the slides.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () =>
      setReduced(query.matches || document.documentElement.dataset.reduceMotion === 'true');
    update();
    query.addEventListener('change', update);
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-reduce-motion'],
    });
    return () => {
      query.removeEventListener('change', update);
      observer.disconnect();
    };
  }, []);

  const rotating = count > 1 && !stopped && !reduced;

  function show(target, direction) {
    setDir(direction ?? (target > index ? 1 : -1));
    setIndex((target + count) % count);
  }

  // Anything the visitor does ends the rotation for good.
  function userGo(target, direction) {
    setStopped(true);
    show(target, direction);
  }

  const prev = () => userGo(index - 1, -1);
  const next = () => userGo(index + 1, 1);

  // Timer tick (end of the progress bar): advance, and stop after one round.
  function autoAdvance() {
    autoSteps.current += 1;
    if (autoSteps.current >= count) {
      setStopped(true);
      show(0, 1); // finish the round back on the first review
      return;
    }
    show(index + 1, 1);
  }

  function onKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      prev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    }
  }

  // Swipe on touch screens.
  function onPointerDown(event) {
    if (event.pointerType === 'mouse') return;
    pointerX.current = event.clientX;
  }

  function onPointerUp(event) {
    if (pointerX.current === null) return;
    const dx = event.clientX - pointerX.current;
    pointerX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  }

  if (!count) return null;

  const fill = (template, vars) =>
    (template ?? '').replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? vars[k] : ''));

  return (
    <section
      className={styles.slider}
      aria-roledescription="carousel"
      aria-label={labels.region}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHeld(false);
      }}
    >
      <div
        className={styles.card}
        data-dir={dir > 0 ? 'next' : 'prev'}
        style={{ '--active': index }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          pointerX.current = null;
        }}
      >
        <span className={styles.glow} aria-hidden="true" />
        <Icon name="quote" size={56} className={styles.mark} />

        {/* Announce changes only once rotation has stopped (i.e. the visitor drives it). */}
        <div className={styles.slides} aria-live={rotating ? 'off' : 'polite'}>
          {items.map((item, i) => (
            <div
              key={item.id}
              id={`${baseId}-slide-${i}`}
              role="group"
              aria-roledescription="slide"
              aria-label={fill(labels.slideOf, { n: i + 1, total: count })}
              className={styles.slide}
              hidden={i !== index}
            >
              {item.rating ? (
                <p className={styles.rating}>
                  <span className={styles.stars} aria-hidden="true">
                    {Array.from({ length: item.rating }).map((_, s) => (
                      <Icon key={s} name="star" size={18} strokeWidth={0} className={styles.star} />
                    ))}
                  </span>
                  <span className="sr-only">{`${item.rating}/5`}</span>
                </p>
              ) : null}

              <blockquote className={styles.quote}>
                <p>{item.quote}</p>
              </blockquote>

              <footer className={styles.footer}>
                <span className={styles.author}>{item.author}</span>
                {item.project ? (
                  <Link href={item.project.href} className={styles.project}>
                    {labels.viewProject}: {item.project.title}
                    <Icon name="arrowRight" size={16} />
                  </Link>
                ) : null}
              </footer>
            </div>
          ))}
        </div>

        {count > 1 ? (
          <div className={styles.controls}>
            <p className={styles.counter} aria-hidden="true">
              <strong>{String(index + 1).padStart(2, '0')}</strong>
              <span> / {String(count).padStart(2, '0')}</span>
            </p>

            <div className={styles.buttons}>
              <button
                type="button"
                className={cn(styles.iconBtn, styles.prev)}
                onClick={prev}
                aria-label={labels.previous}
              >
                <Icon name="arrowRight" size={20} strokeWidth={2} />
              </button>
              <button type="button" className={styles.iconBtn} onClick={next} aria-label={labels.next}>
                <Icon name="arrowRight" size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Review chips: jump straight to one; the active one shows progress. */}
      {count > 1 ? (
        <div className={styles.chips} role="group" aria-label={labels.choose}>
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className={cn(styles.chip, i === index && styles.chipActive)}
              aria-pressed={i === index}
              aria-controls={`${baseId}-slide-${i}`}
              onClick={() => userGo(i)}
            >
              <span className={styles.chipNum} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.chipLabel}>{chipLabel(item.author)}</span>
              {i === index && rotating ? (
                <span
                  key={index}
                  className={styles.progress}
                  aria-hidden="true"
                  style={{
                    '--interval': `${interval}ms`,
                    animationPlayState: held ? 'paused' : 'running',
                  }}
                  onAnimationEnd={autoAdvance}
                />
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/** "Vadovas, baldų prekyba" → "Baldų prekyba" — the part that tells reviews apart. */
function chipLabel(author = '') {
  const part = author.includes(',') ? author.split(',').pop().trim() : author;
  return part.charAt(0).toUpperCase() + part.slice(1);
}
