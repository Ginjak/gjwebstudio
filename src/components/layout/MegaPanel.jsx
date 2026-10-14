import { memo } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import Media from '@/components/ui/Media';
import { cn } from '@/lib/utils';
import styles from './MegaPanel.module.scss';

/**
 * Contents of one desktop mega menu: an intro column on the left and the
 * links on the right. `mega` is built in src/lib/content/navigation.js.
 *
 *   kind 'services' → icon list in two columns + promo card
 *   kind 'cards'    → three image cards (latest work / posts)
 *   kind 'links'    → a few larger links with a one-line description
 */
function MegaPanel({ mega, isActive }) {
  const { kind, title, text, all, items = [], promo } = mega;

  return (
    <div className={cn(styles.inner, promo && styles.withPromo)}>
      <div className={styles.intro}>
        <p className={styles.title}>{title}</p>
        {text ? <p className={styles.text}>{text}</p> : null}
        {all ? (
          <Link href={all.href} className={styles.all}>
            {all.label}
            <Icon name="arrowRight" size={16} strokeWidth={2} />
          </Link>
        ) : null}
      </div>

      {kind === 'cards' ? (
        <ul className={styles.cards}>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={styles.card}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <Media
                  image={item.image}
                  alt=""
                  ratio="16/10"
                  sizes="(min-width: 1280px) 300px, 25vw"
                  className={styles.cardMedia}
                />
                <span className={styles.cardMeta}>{item.meta}</span>
                <span className={styles.cardTitle}>
                  <span className={styles.cardTitleText}>{item.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className={cn(styles.links, kind === 'services' && styles.linksTwoCol)}>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(styles.link, isActive(item.href) && styles.linkActive)}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.icon ? (
                  <span className={styles.linkIcon} aria-hidden="true">
                    <Icon name={item.icon} size={18} />
                  </span>
                ) : null}
                <span className={styles.linkText}>
                  <span className={styles.linkLabel}>{item.label}</span>
                  {item.meta ? (
                    <span className={styles.linkMeta}>{item.meta}</span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {promo ? (
        <div className={styles.promo}>
          <span className={styles.promoIcon} aria-hidden="true">
            <Icon name="chart" size={20} />
          </span>
          <p className={styles.promoTitle}>{promo.title}</p>
          <p className={styles.promoText}>{promo.text}</p>
          <Link href={promo.href} className={styles.promoLink}>
            {promo.label}
            <Icon name="arrowRight" size={16} strokeWidth={2} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}

// Memoised: opening / closing a menu only changes the header's state, not the
// panel contents, so skip re-rendering every panel (and its images) each time.
export default memo(MegaPanel);
