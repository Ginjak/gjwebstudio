import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Card.module.scss';

/**
 * Generic surface card. When `href` is given the whole card becomes clickable
 * via a stretched pseudo-element on the title link — so the accessible name
 * stays the title, not the whole block of text.
 */
export default function Card({
  children,
  href,
  variant = 'default', // 'default' | 'outline' | 'flat' | 'dark'
  padding = 'md', // 'sm' | 'md' | 'lg' | 'none'
  className,
  as: Tag = 'article',
  ...rest
}) {
  return (
    <Tag
      className={cn(
        styles.card,
        styles[variant],
        styles[`p-${padding}`],
        href && styles.interactive,
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Title that stretches its click area over the whole parent card. */
export function CardLink({ href, children, className }) {
  return (
    <Link href={href} className={cn(styles.stretchedLink, className)}>
      {children}
    </Link>
  );
}
