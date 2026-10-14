import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import styles from './CTABanner.module.scss';

/**
 * Closing call to action. The waving hand is decorative, mirroring the
 * reference site's footer CTA.
 */
export default function CTABanner({ title, body, actions = [], emoji = '👋' }) {
  return (
    <Reveal animation="fade-up" className={styles.wrap}>
      <span className={styles.bubble} aria-hidden="true">
        <svg viewBox="0 0 162 154" className={styles.bubbleShape}>
          <path
            fill="currentColor"
            d="M.78 77c0 42.16 34.18 76.3 76.3 76.3 15.02 0 29.02-4.34 40.83-11.83l38.87 6.57c3.28.41 6.02-2.67 5.01-5.6l-14.32-35.97A76.1 76.1 0 0 0 153.37 77c0-42.12-34.13-76.29-76.29-76.29C34.92.71.78 34.84.78 77Z"
          />
        </svg>
        <span className={styles.emoji}>
          <span className={styles.hand}>{emoji}</span>
        </span>
      </span>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {body ? <p className={styles.body}>{body}</p> : null}

        {actions.length ? (
          <div className={styles.actions}>
            {actions.map((action) => (
              <Button key={action.href ?? action.label} size="lg" {...action} />
            ))}
          </div>
        ) : null}
      </div>
    </Reveal>
  );
}
