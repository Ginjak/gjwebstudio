import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';
import styles from './Testimonials.module.scss';

/**
 * Testimonial list. Pass a single item for the large "pull quote" style,
 * or several for the grid.
 * items: [{ id, quote, author, rating }]
 */
export default function Testimonials({ items = [], variant = 'grid' }) {
  if (!items.length) return null;

  if (variant === 'single') {
    const item = items[0];
    return (
      <Reveal animation="fade-up" className={styles.single}>
        <Icon name="quote" size={40} className={styles.mark} />
        <blockquote className={styles.singleQuote}>
          <p>{item.quote}</p>
        </blockquote>
        <p className={styles.singleAuthor}>{item.author}</p>
      </Reveal>
    );
  }

  return (
    <ul className={styles.grid}>
      {items.map((item, i) => (
        <li key={item.id}>
          <Reveal animation="fade-up" delay={i * 70} className={styles.card}>
            {item.rating ? (
              <p className={styles.rating}>
                <span aria-hidden="true" className={styles.stars}>
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Icon key={s} name="star" size={17} strokeWidth={0} className={styles.star} />
                  ))}
                </span>
                <span className="sr-only">{`${item.rating}/5`}</span>
              </p>
            ) : null}

            <blockquote className={styles.quote}>
              <p>{item.quote}</p>
            </blockquote>

            <footer className={styles.author}>{item.author}</footer>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
