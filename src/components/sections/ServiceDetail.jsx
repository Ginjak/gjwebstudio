import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import styles from './ServiceDetail.module.scss';

/**
 * Building blocks for the service detail page (/paslaugos/<slug>).
 * Same hover language as the other cards: top accent line draws in, icon
 * tile fills and tilts, card lifts.
 */

/** Quick facts under the hero. items: [{ icon, label, value, note? }] */
export function ServiceFacts({ items = [] }) {
  return (
    <ul className={styles.facts}>
      {items.map((item, i) => (
        <li key={item.label}>
          <Reveal animation="fade-up" delay={i * 70} className={styles.fact}>
            <span className={styles.icon} aria-hidden="true">
              <Icon name={item.icon} size={22} />
            </span>
            <div>
              <p className={styles.factLabel}>{item.label}</p>
              <p className={styles.factValue}>{item.value}</p>
              {item.note ? <p className={styles.factNote}>{item.note}</p> : null}
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** "What's included": numbered feature cards. items: [string] */
export function IncludedGrid({ items = [] }) {
  return (
    <ol className={styles.included}>
      {items.map((item, i) => (
        <li key={item}>
          <Reveal animation="fade-up" delay={i * 50} className={styles.feature}>
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className={styles.check} aria-hidden="true">
              <Icon name="check" size={14} strokeWidth={3} />
            </span>
            <p className={styles.featureText}>{item}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

/**
 * Problem → solution cards. items: [{ problem, solution }]
 * labels: { problem, solution }
 */
export function ProblemSolution({ items = [], labels = {} }) {
  return (
    <ul className={styles.problems}>
      {items.map((item, i) => (
        <li key={item.problem}>
          <Reveal animation="fade-up" delay={i * 80} className={styles.ps}>
            <div className={styles.problem}>
              <p className={styles.psLabel}>
                <span className={styles.psMarkOff} aria-hidden="true">
                  !
                </span>
                {labels.problem}
              </p>
              <p className={styles.psText}>{item.problem}</p>
            </div>

            <span className={styles.arrow} aria-hidden="true">
              <Icon name="arrowRight" size={18} strokeWidth={2} />
            </span>

            <div className={styles.solution}>
              <p className={styles.psLabel}>
                <span className={styles.psMark} aria-hidden="true">
                  <Icon name="check" size={12} strokeWidth={3} />
                </span>
                {labels.solution}
              </p>
              <p className={styles.psText}>{item.solution}</p>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
