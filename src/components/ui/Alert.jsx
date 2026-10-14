import { cn } from '@/lib/utils';
import styles from './Alert.module.scss';

/**
 * Status message. `live` makes it an ARIA live region so screen readers
 * announce it when it appears (used for form success/error).
 */
export default function Alert({
  variant = 'info', // 'info' | 'success' | 'error' | 'warning'
  title,
  children,
  live = false,
  className,
}) {
  return (
    <div
      className={cn(styles.alert, styles[variant], className)}
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live={live ? (variant === 'error' ? 'assertive' : 'polite') : undefined}
    >
      <span className={styles.icon} aria-hidden="true">
        {variant === 'success' ? (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="10" cy="10" r="9" />
            <path d="m6 10.5 2.6 2.6L14.5 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : variant === 'error' ? (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="10" cy="10" r="9" />
            <path d="M10 5.5v5.5M10 14.2h.01" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="10" cy="10" r="9" />
            <path d="M10 9v5.5M10 5.8h.01" strokeLinecap="round" />
          </svg>
        )}
      </span>
      <div className={styles.body}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <div className={styles.text}>{children}</div> : null}
      </div>
    </div>
  );
}
