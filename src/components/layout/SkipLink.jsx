import styles from './SkipLink.module.scss';

/** First focusable element on the page — jumps straight to <main>. */
export default function SkipLink({ label, target = '#main' }) {
  return (
    <a href={target} className={styles.skip}>
      {label}
    </a>
  );
}
