import Card, { CardLink } from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import styles from './ServiceCards.module.scss';

/** Grid of service cards. items: [{ id, name, excerpt, href, icon, priceFrom }] */
export default function ServiceCards({ items = [], readMoreLabel, fromLabel, columns = 3 }) {
  return (
    <ul className={styles.grid} data-columns={columns}>
      {items.map((item, i) => (
        <li key={item.id}>
          <Reveal animation="fade-up" delay={i * 60}>
            <Card className={styles.card} href={item.href}>
              <span className={styles.icon} aria-hidden="true">
                <Icon name={item.icon ?? 'sparkles'} size={26} />
              </span>

              <h3 className={styles.title}>
                <CardLink href={item.href}>{item.name}</CardLink>
              </h3>

              <p className={styles.excerpt}>{item.excerpt}</p>

              <div className={styles.footer}>
                {item.price ? <span className={styles.price}>{`${fromLabel} ${item.price}`}</span> : null}
                <span className={styles.more}>
                  {readMoreLabel}
                  <Icon name="arrowRight" size={17} />
                </span>
              </div>
            </Card>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
