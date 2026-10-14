'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Field, { CheckboxField } from '@/components/ui/Field';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import { validateContact, translateErrors } from '@/lib/forms/validation';
import { createTranslator } from '@/i18n/translator';
import styles from './ContactForm.module.scss';

/**
 * Contact / audit form.
 *
 * Accessibility
 *  • every field is labelled and errors are linked via aria-describedby
 *  • an error summary appears at the top and receives focus on failure
 *  • success and failure are announced through a live region
 *
 * Anti-spam (invisible to real visitors)
 *  • honeypot field that only bots fill in
 *  • a timestamp — submissions faster than 3 seconds are rejected
 *  • server-side IP rate limiting (see app/api/contact/route.js)
 */
export default function ContactForm({
  labels,
  locale,
  variant = 'contact', // 'contact' | 'audit'
  privacyHref,
  responseTime,
  budgetOptions = [],
  serviceOptions = [],
  defaultMessage = '',
}) {
  const t = createTranslator(labels);
  const isAudit = variant === 'audit';

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    budget: '',
    service: '',
    message: defaultMessage,
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [serverError, setServerError] = useState(null);

  const summaryRef = useRef(null);
  const startedAt = useRef(Date.now());

  const set = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    setServerError(null);

    const raw = validateContact(values, {
      requireMessage: !isAudit,
      requireWebsite: isAudit,
    });

    if (Object.keys(raw).length) {
      setErrors(translateErrors(raw, t));
      setStatus('idle');
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setErrors({});
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          locale,
          variant,
          // Bot traps
          company_website: event.target.company_website?.value ?? '',
          elapsed: Date.now() - startedAt.current,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'request_failed');
      }

      setStatus('success');
      setValues((prev) => ({ ...prev, message: '', consent: false }));
    } catch (error) {
      setStatus('error');
      setServerError(error.message === 'rate_limited' ? t('form.rateLimited') : null);
    }
  }

  if (status === 'success') {
    return (
      <Alert variant="success" title={t('form.successTitle')} live>
        <p>{t('form.successBody', { responseTime })}</p>
      </Alert>
    );
  }

  const errorList = Object.entries(errors).filter(([, value]) => Boolean(value));

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {errorList.length ? (
        <div
          ref={summaryRef}
          tabIndex={-1}
          className={styles.summary}
          role="alert"
          aria-labelledby="form-error-title"
        >
          <p id="form-error-title" className={styles.summaryTitle}>
            {t('form.errorsSummary')}
          </p>
          <ul>
            {errorList.map(([field, message]) => (
              <li key={field}>{message}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === 'error' ? (
        <Alert variant="error" title={t('form.errorTitle')} live>
          <p>{serverError ?? t('form.errorBody')}</p>
        </Alert>
      ) : null}

      <div className={styles.row}>
        <Field
          name="name"
          label={t('form.name')}
          placeholder={t('form.namePlaceholder')}
          autoComplete="name"
          required
          value={values.name}
          onChange={set('name')}
          error={errors.name}
        />
        <Field
          name="email"
          type="email"
          label={t('form.email')}
          placeholder={t('form.emailPlaceholder')}
          autoComplete="email"
          inputMode="email"
          required
          value={values.email}
          onChange={set('email')}
          error={errors.email}
        />
      </div>

      <div className={styles.row}>
        <Field
          name="phone"
          type="tel"
          label={t('form.phoneOptional')}
          autoComplete="tel"
          inputMode="tel"
          value={values.phone}
          onChange={set('phone')}
        />
        <Field
          name="company"
          label={t('form.companyOptional')}
          autoComplete="organization"
          value={values.company}
          onChange={set('company')}
        />
      </div>

      <Field
        name="website"
        type="url"
        label={t('form.website')}
        placeholder={t('form.websitePlaceholder')}
        autoComplete="url"
        inputMode="url"
        required={isAudit}
        optionalLabel={isAudit ? undefined : t('form.optional')}
        value={values.website}
        onChange={set('website')}
        error={errors.website}
      />

      {!isAudit && serviceOptions.length ? (
        <div className={styles.row}>
          <Field
            as="select"
            name="service"
            label={t('form.service')}
            placeholder={t('form.serviceSelect')}
            options={serviceOptions}
            value={values.service}
            onChange={set('service')}
          />
          <Field
            as="select"
            name="budget"
            label={t('form.budget')}
            placeholder={t('form.budgetSelect')}
            options={budgetOptions}
            value={values.budget}
            onChange={set('budget')}
          />
        </div>
      ) : null}

      <Field
        as="textarea"
        name="message"
        label={t('form.message')}
        placeholder={t('form.messagePlaceholder')}
        required={!isAudit}
        optionalLabel={isAudit ? t('form.optional') : undefined}
        value={values.message}
        onChange={set('message')}
        error={errors.message}
      />

      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <CheckboxField
        name="consent"
        required
        checked={values.consent}
        onChange={set('consent')}
        error={errors.consent}
        label={`${t('form.consent')} `}
      >
        <Link href={privacyHref} className={styles.privacyLink}>
          {t('form.consentLink')}
        </Link>
      </CheckboxField>

      <Button
        type="submit"
        label={status === 'sending' ? t('form.submitting') : isAudit ? t('audit.submit') : t('form.submit')}
        size="lg"
        disabled={status === 'sending'}
      />

      <p className={styles.srStatus} role="status" aria-live="polite">
        {status === 'sending' ? t('form.submitting') : ''}
      </p>
    </form>
  );
}
