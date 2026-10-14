import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Button.module.scss';

/**
 * Button / link with shared visual variants.
 *
 * Props
 *  label     string                     visible text
 *  href      string                     renders <Link> (or <a> when external)
 *  onClick   function                   renders <button>
 *  variant   'primary'|'secondary'|'ghost'|'link'|'icon'   default 'primary'
 *  size      'sm'|'md'|'lg'             default 'md'
 *  icon      ReactNode                  rendered after the label
 *  iconLeft  ReactNode                  rendered before the label
 *  external  boolean                    adds rel + a hidden "opens in new window"
 *  full      boolean                    100% width
 *  disabled  boolean
 *  type      'button'|'submit'          only for <button>
 */
export default function Button({
  label,
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  iconLeft,
  external = false,
  full = false,
  disabled = false,
  type = 'button',
  className,
  newWindowLabel = 'opens in a new window',
  ...rest
}) {
  const content = (
    <>
      {iconLeft ? <span className={styles.icon} aria-hidden="true">{iconLeft}</span> : null}
      <span className={styles.label}>{label ?? children}</span>
      {icon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null}
      {external ? <span className="sr-only"> ({newWindowLabel})</span> : null}
    </>
  );

  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    full && styles.full,
    disabled && styles.disabled,
    className,
  );

  if (href && !disabled) {
    if (external || /^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a
          className={classes}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...rest}
        >
          {content}
        </a>
      );
    }
    return (
      <Link className={classes} href={href} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
