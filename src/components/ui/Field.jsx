'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';
import styles from './Field.module.scss';

/**
 * Accessible form field wrapper.
 * Handles: <label> association, required marking, hint text, error text,
 * aria-describedby, aria-invalid and error styling that is not colour-only
 * (an icon and text are always shown too).
 *
 * `as`: 'input' | 'textarea' | 'select'
 */
export default function Field({
  as = 'input',
  name,
  label,
  type = 'text',
  hint,
  error,
  required = false,
  optionalLabel,
  options = [],
  placeholder,
  rows = 6,
  className,
  ...rest
}) {
  const id = useId();
  const fieldId = `${id}-${name}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const shared = {
    id: fieldId,
    name,
    required,
    'aria-required': required || undefined,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    className: cn(styles.control, error && styles.controlError),
    placeholder,
    ...rest,
  };

  return (
    <div className={cn(styles.field, className)}>
      <label className={styles.label} htmlFor={fieldId}>
        {label}
        {required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : optionalLabel ? (
          <span className={styles.optional}> ({optionalLabel})</span>
        ) : null}
      </label>

      {hint ? (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      ) : null}

      {as === 'textarea' ? (
        <textarea rows={rows} {...shared} />
      ) : as === 'select' ? (
        <select {...shared}>
          {placeholder ? <option value="">{placeholder}</option> : null}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...shared} />
      )}

      {error ? (
        <p id={errorId} className={styles.error}>
          <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
            <circle cx="10" cy="10" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M10 5.5v5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="14.2" r="1.1" fill="currentColor" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Checkbox with the same accessibility wiring. */
export function CheckboxField({ name, label, error, required, children, ...rest }) {
  const id = useId();
  const fieldId = `${id}-${name}`;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className={styles.field}>
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id={fieldId}
          name={name}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          className={styles.checkbox}
          {...rest}
        />
        <label htmlFor={fieldId} className={styles.checkboxLabel}>
          {label}
          {children}
          {required ? (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      </div>
      {error ? (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
