import { cn } from '@/lib/utils';
import styles from './Prose.module.scss';

/** Long-form text container with comfortable measure and vertical rhythm. */
export default function Prose({ children, size = 'md', className }) {
  return <div className={cn(styles.prose, styles[size], className)}>{children}</div>;
}
