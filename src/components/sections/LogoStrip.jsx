'use client';

import { useEffect, useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import styles from './LogoStrip.module.scss';

const STOP_MS = 1000;
const START_MS = 1300;

/** Smoothstep: gentle at both ends, so speed changes never feel abrupt. */
const ease = (t) => t * t * (3 - 2 * t);

/**
 * Wordmark marquee. Uses plain text rather than third-party logo files so there
 * are no trademark or licensing issues and nothing extra to download.
 *
 * The list is rendered twice and the track slides by exactly one copy, so the
 * loop is seamless. The copy is hidden from assistive tech. The CSS animation
 * does the sliding; on mouse hover its playbackRate is eased down to 0 (the
 * strip glides to a stop) and back up on leave. With reduced motion there is
 * no animation at all — just a still, swipeable row.
 *
 * props: title, items: []
 */
export default function LogoStrip({ title, items = [] }) {
  const trackRef = useRef(null);
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function easeSpeedTo(target, duration) {
    const animation = trackRef.current?.getAnimations()[0];
    if (!animation) return;

    cancelAnimationFrame(frame.current);
    const from = animation.playbackRate;
    // Scale by how far we have to go, so a quick in-and-out doesn't take a full second.
    const span = duration * Math.abs(target - from);
    const start = performance.now();

    const step = (now) => {
      const t = span ? Math.min(1, (now - start) / span) : 1;
      animation.playbackRate = from + (target - from) * ease(t);
      if (t < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }

  // Mouse only: on touch, "hover" would stick after a tap and freeze the strip.
  const onEnter = (event) => event.pointerType === 'mouse' && easeSpeedTo(0, STOP_MS);
  const onLeave = (event) => event.pointerType === 'mouse' && easeSpeedTo(1, START_MS);

  return (
    <div className={styles.wrap}>
      {title ? <p className={styles.title}>{title}</p> : null}

      <Reveal animation="fade" className={styles.marquee}>
        <div
          ref={trackRef}
          className={styles.track}
          onPointerEnter={onEnter}
          onPointerLeave={onLeave}
        >
          <WordList items={items} />
          <WordList items={items} copy />
        </div>
      </Reveal>
    </div>
  );
}

function WordList({ items, copy = false }) {
  return (
    <ul className={copy ? `${styles.list} ${styles.copy}` : styles.list} aria-hidden={copy || undefined}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
