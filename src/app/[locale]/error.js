'use client';

import { useEffect } from 'react';
import styles from './not-found.module.scss';

/**
 * Route-level error boundary. Keeps the header and footer in place and offers
 * a retry, rather than dropping the visitor on a blank page.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Replace with your error reporting service if you add one.
    console.error(error);
  }, [error]);

  return (
    <div className={styles.wrap} style={{ paddingBlock: '6rem 4rem' }}>
      <h1 className={styles.title}>Kažkas nepavyko / Something went wrong</h1>
      <p className={styles.body}>
        Įvyko netikėta klaida. Pabandykite dar kartą.
        <br />
        An unexpected error occurred. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          minHeight: 48,
          padding: '0.75rem 1.5rem',
          borderRadius: 999,
          border: '2px solid var(--brand-700)',
          background: 'var(--brand-700)',
          color: '#fff',
          fontWeight: 600,
        }}
      >
        Bandyti dar kartą / Try again
      </button>
    </div>
  );
}
