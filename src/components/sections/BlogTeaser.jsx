import Card, { CardLink } from '@/components/ui/Card';
import Media from '@/components/ui/Media';
import Tag from '@/components/ui/Tag';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import styles from './BlogTeaser.module.scss';

/**
 * Post list. The first item is rendered larger.
 * items: [{ slug, href, title, excerpt, image, date, dateISO, category, readingTime }]
 *
 * initialCount: render only this many visible; the rest are in the HTML but
 * `hidden` until <FilterBar pageSize> reveals them ("load more").
 */
export default function BlogTeaser({
  items = [],
  readMoreLabel,
  featureFirst = true,
  columns = 3,
  initialCount = 0,
}) {
  if (!items.length) return null;

  return (
    <ul className={styles.grid} data-columns={columns}>
      {items.map((item, i) => {
        const featured = featureFirst && i === 0;

        return (
          <li
            key={item.slug}
            className={cn(featured && styles.featuredCell)}
            data-categories={item.categoryId ?? ''}
            hidden={initialCount > 0 && i >= initialCount}
          >
            <Reveal animation="fade-up" delay={Math.min(i, 4) * 70}>
              <Card className={styles.card} href={item.href} padding="none">
                <Media
                  image={item.image}
                  alt={item.imageAlt}
                  ratio="16/9"
                  rounded={false}
                  sizes={
                    featured
                      ? '(min-width: 1024px) 50vw, 100vw'
                      : '(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw'
                  }
                />

                <div className={styles.body}>
                  <p className={styles.meta}>
                    <time dateTime={item.dateISO}>{item.date}</time>
                    {item.readingTime ? (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{item.readingTime}</span>
                      </>
                    ) : null}
                  </p>

                  {item.category ? (
                    <p className={styles.tagRow}>
                      <Tag size="sm">{item.category}</Tag>
                    </p>
                  ) : null}

                  <h3 className={cn(styles.title, featured && styles.titleLarge)}>
                    <CardLink href={item.href}>{item.title}</CardLink>
                  </h3>

                  <p className={styles.excerpt}>{item.excerpt}</p>

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
