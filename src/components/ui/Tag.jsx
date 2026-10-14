import Link from 'next/link';
import { cn } from '@/lib/utils';
import styles from './Tag.module.scss';

/** Small pill label. Renders a link when `href` is provided. */
export default function Tag({ children, href, active = false, size = 'md', className, ...rest }) {
  const classes = cn(styles.tag, styles[size], active && styles.active, className);

  if (href) {
    return (
      <Link href={href} className={classes} aria-current={active ? 'true' : undefined} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
