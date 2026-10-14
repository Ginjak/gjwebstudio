import Card, { CardLink } from '@/components/ui/Card';
import Media from '@/components/ui/Media';
import Tag from '@/components/ui/Tag';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import styles from './WorkGrid.module.scss';

/**
 * Case-study grid. The first item can be rendered as a wide featured card.
 * items: [{ slug, href, title, excerpt, image, tags: [], metric?: {value,label},
 *          badges?: [{ id, icon, name }] }]   badges = category chips on the image
 */
export default function WorkGrid({ items = [], readMoreLabel, featureFirst = true }) {
  if (!items.length) return null;

  return (
    <ul className={styles.grid}>
      {items.map((item, i) => {
        const featured = featureFirst && i === 0;

        return (
          <li
            key={item.slug}
            className={cn(featured && styles.featuredCell)}
            data-categories={(item.categories ?? []).join(',')}
          >
            <Reveal animation="fade-up" delay={Math.min(i, 4) * 70}>
              <Card
                className={cn(styles.card, featured && styles.featured)}
                href={item.href}
                padding="none"
              >
                <div className={styles.mediaWrap}>
                  <Media
                    image={item.image}
                    alt={item.imageAlt}
                    ratio={featured ? '16/10' : '4/3'}
                    rounded={false}
                    className={styles.media}
                    sizes={
                      featured
                        ? '(min-width: 1024px) 60vw, 100vw'
                        : '(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw'
                    }
                  />

                  {item.badges?.length ? (
                    <ul className={styles.badges}>
                      {item.badges.map((badge) => (
                        <li key={badge.id} className={styles.badge}>
                          <Icon name={badge.icon} size={14} strokeWidth={2} />
                          {badge.name}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div className={styles.body}>
                  {item.tags?.length ? (
                    <ul className={styles.tags}>
                      {item.tags.map((tag) => (
                        <li key={tag}>
                          <Tag size="sm">{tag}</Tag>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <h3 className={styles.title}>
                    <CardLink href={item.href}>{item.title}</CardLink>
                  </h3>

                  <p className={styles.excerpt}>{item.excerpt}</p>

                  {item.metric ? (
                    <p className={styles.metric}>
                      <strong>{item.metric.value}</strong> {item.metric.label}
                    </p>
                  ) : null}

                  <span className={styles.more}>
                    {readMoreLabel}
                    <Icon name="arrowRight" size={17} />
                  </span>
                </div>
              </Card>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
