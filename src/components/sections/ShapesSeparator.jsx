import styles from './ShapesSeparator.module.scss';

/** Decorative divider built from the brand shapes. Hidden from assistive tech. */
export default function ShapesSeparator() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg viewBox="0 0 261 99" className={styles.svg}>
        <path
          fill="var(--brand-500)"
          d="M191.9 25V14.6c0-1-.5-1.8-1.4-2.3l-9.3-5.3a2.6 2.6 0 0 0-2.8 0l-9.3 5.3c-.9.5-1.4 1.4-1.4 2.3V25c0 1 .5 1.9 1.4 2.4l9.3 5.2c.9.5 2 .5 2.8 0l9.3-5.2c.9-.5 1.4-1.4 1.4-2.4Z"
        />
        <circle fill="var(--accent-3)" cx="80.8" cy="13.5" r="12.6" />
        <path
          fill="var(--accent-2)"
          d="M125.1 62.3h-22.5c-1.5 0-2.4-1.5-1.7-2.7l11.3-19.6c.7-1.2 2.5-1.2 3.3 0l11.2 19.6c.7 1.2-.2 2.7-1.6 2.7Z"
        />
        <circle fill="var(--accent-3)" cx="212.8" cy="57.5" r="12.6" />
        <path
          fill="var(--brand-500)"
          d="M60 77.2V66.7c0-1-.5-1.8-1.4-2.3l-9.3-5.2a2.6 2.6 0 0 0-2.8 0l-9.4 5.2c-.8.5-1.4 1.4-1.4 2.3v10.5c0 1 .6 1.8 1.4 2.3l9.4 5.3c.8.4 1.9.4 2.8 0l9.3-5.3c.9-.5 1.4-1.3 1.4-2.3Z"
        />
        <path
          fill="var(--accent)"
          d="M27.9 22.4 16.1 10.7a1.4 1.4 0 0 0-2 0L2.3 22.4c-.6.7-.6 1.8 0 2.5L14.1 36.7c.6.7 1.7.7 2.3 0l11.5-11.8c.7-.7.7-1.8 0-2.5Z"
        />
        <path
          fill="var(--accent-2)"
          d="M257 44.9h-22.5c-1.4 0-2.3-1.5-1.6-2.7l11.3-19.6c.7-1.2 2.5-1.2 3.3 0l11.2 19.6c.7 1.2-.2 2.7-1.6 2.7Z"
        />
        <path
          fill="var(--accent)"
          d="m159.8 82.7-11.7-11.8a1.4 1.4 0 0 0-2.3 0l-11.8 11.8c-.7.7-.7 1.8 0 2.5l11.8 11.7c.6.7 1.7.7 2.3 0l11.7-11.7c.7-.7.7-1.8 0-2.5Z"
        />
      </svg>
    </div>
  );
}
