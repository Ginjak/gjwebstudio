import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import styles from './PackageCards.module.scss';

/**
 * One-off project packages. Rows (name, price, duration, text, includes,
 * button) line up across cards via subgrid, like the plan cards.
 *
 * items:  [{ id, icon, name, price (formatted), duration, description,
 *            includes: [], featured?, href }]
 * labels: { from, cta, mostPopular }
 */
export default function PackageCards({ items = [], labels = {} }) {
  return (
    <ul className={styles.grid}>
      {items.map((item, i) => (
        <li key={item.id}>
          <Reveal
            animation="fade-up"
            delay={i * 70}
            className={cn(styles.card, item.featured && styles.featured)}
          >
            {item.featured ? <p className={styles.badge}>{labels.mostPopular}</p> : null}

            <div className={styles.head}>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={item.icon ?? 'sparkles'} size={22} />
              </span>
              <h3 className={styles.name}>{item.name}</h3>
            </div>

            <p className={styles.price}>
              <span className={styles.from}>{labels.from}</span> {item.price}
            </p>

            <p className={styles.duration}>
              <Icon name="clock" size={14} strokeWidth={2} />
              {item.duration}
            </p>

            <p className={styles.text}>{item.description}</p>

            <ul className={styles.includes}>
              {item.includes.map((line, j) => (
                <li key={line} style={{ '--i': j }}>
                  <span className={styles.check} aria-hidden="true">
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                  {line}
                </li>
              ))}
            </ul>

            <Button
              href={item.href}
              label={labels.cta}
              variant={item.featured ? 'primary' : 'secondary'}
              full
              className={styles.cta}
            />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
