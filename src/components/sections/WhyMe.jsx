import Icon from '@/components/ui/Icon';
import Logo from '@/components/layout/Logo';
import Reveal from '@/components/ui/Reveal';
import styles from './WhyMe.module.scss';

/**
 * "Why me": one specialist vs. an agency, point by point.
 *
 * Desktop: three columns (topic | with me | with an agency); the "with me"
 * cells join into one highlighted purple column. Phones: each point becomes
 * its own small card. Every value carries a visually hidden column label, so
 * screen readers hear "With me: …" / "With an agency: …" in both layouts.
 *
 * items:  [{ id, icon, topic, me, agency }]
 * labels: { me, agency, note }
 */
export default function WhyMe({ items = [], labels = {} }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.head} aria-hidden="true">
        <span />
        <span className={styles.headMe}>
          <Logo width={30} withWordmark={false} />
          {labels.me}
        </span>
        <span className={styles.headAgency}>{labels.agency}</span>
      </div>

      <ul className={styles.rows}>
        {items.map((item, i) => (
          <Reveal key={item.id} as="li" animation="fade-up" delay={i * 60} className={styles.row}>
            <h3 className={styles.topic}>
              <span className={styles.topicIcon} aria-hidden="true">
                <Icon name={item.icon} size={18} />
              </span>
              {item.topic}
            </h3>

            <p className={styles.me}>
              <span className={styles.mark} aria-hidden="true">
                <Icon name="check" size={13} strokeWidth={3} />
              </span>
              <span>
                <span className="sr-only">{labels.me}: </span>
                {item.me}
              </span>
            </p>

            <p className={styles.agency}>
              <span className={styles.markOff} aria-hidden="true">
                –
              </span>
              <span>
                <span className="sr-only">{labels.agency}: </span>
                {item.agency}
              </span>
            </p>
          </Reveal>
        ))}
      </ul>

      {labels.note ? <p className={styles.note}>{labels.note}</p> : null}
    </div>
  );
}
