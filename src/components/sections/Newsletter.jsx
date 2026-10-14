'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { createTranslator } from '@/i18n/translator';
import styles from './Newsletter.module.scss';

/**
 * Newsletter sign-up.
 *
 * Provider-agnostic: it posts to /api/contact with variant "newsletter".
 * Swap in Mailchimp / Brevo / Buttondown by changing that one route.
 */
export default function Newsletter({ labels, locale }) {
  const t = createTranslator(labels);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  async function onSubmit(event) {
    event.preventDefault();
    if (!email.includes('@')) return;

    setStatus('sending');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          variant: 'newsletter',
          name: 'Newsletter',
          email,
          consent: true,
          locale,
          elapsed: 9999,
        }),
      });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.text}>
        <h2 className={styles.title}>{t('newsletter.title')}</h2>
        <p className={styles.body}>{t('newsletter.body')}</p>
      </div>

      {status === 'success' ? (
        <Alert variant="success" live>
          <p>{t('newsletter.success')}</p>
        </Alert>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.inputRow}>
            <label htmlFor="newsletter-email" className="sr-only">
              {t('form.email')}
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              className={styles.input}
              placeholder={t('newsletter.placeholder')}
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              label={status === 'sending' ? t('form.submitting') : t('newsletter.submit')}
              disabled={status === 'sending'}
              className={styles.submit}
            />
          </div>
          <p className={styles.consent}>{t('newsletter.consent')}</p>
        </form>
      )}
    </div>
  );
}
