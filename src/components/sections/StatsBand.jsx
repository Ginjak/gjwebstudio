import Reveal from '@/components/ui/Reveal';
import styles from './StatsBand.module.scss';

/** Row of headline numbers. items: [{ value, label }] */
export default function StatsBand({ items = [] }) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={item.label}>
          <Reveal animation="fade-up" delay={i * 80} className={styles.item}>
            <span className={styles.value}>{item.value}</span>
            <span className={styles.label}>{item.label}</span>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
