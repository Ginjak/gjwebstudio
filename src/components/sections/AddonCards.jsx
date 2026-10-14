import Card, { CardLink } from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import styles from './AddonCards.module.scss';

/**
 * Add-on cards: icon, name, short description, price (monthly or one-off) and
 * an "ask about it" link. The whole card is clickable via CardLink.
 *
 * items: [{ id, icon, name, description, price (formatted), oneOff, href }]
 * labels: { perMonth, oneOff, askAbout }
 */
export default function AddonCards({ items = [], labels = {} }) {
  return (
    <ul className={styles.grid}>
      {items.map((item, i) => (
        <li key={item.id}>
          <Reveal animation="fade-up" delay={i * 60}>
            <Card className={styles.card} href={item.href} padding="none">
              {/* Layout lives on this wrapper: Card's own display/padding rules
                  load after ours and would otherwise override them. */}
              <div className={styles.layout}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon name={item.icon ?? 'sparkles'} size={22} />
                </span>

                <div className={styles.body}>
                  <h3 className={styles.name}>
                    <CardLink href={item.href}>{item.name}</CardLink>
                  </h3>
                  <p className={styles.text}>{item.description}</p>
                  <span className={styles.more}>
                    {labels.askAbout}
                    <Icon name="arrowRight" size={16} />
                  </span>
                </div>

                <p className={styles.price}>
                  <span className={styles.amount}>{item.price}</span>
                  <span className={styles.period}>
                    {item.oneOff ? labels.oneOff : labels.perMonth}
                  </span>
                </p>
              </div>
            </Card>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
