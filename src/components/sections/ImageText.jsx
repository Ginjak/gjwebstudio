import Button from '@/components/ui/Button';
import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';
import styles from './ImageText.module.scss';

/**
 * Two-column image + text block.
 * `reverse` flips the order on desktop; the DOM order stays text-first so the
 * reading order is always sensible.
 */
export default function ImageText({
  eyebrow,
  title,
  headingLevel = 2,
  body,
  bullets = [],
  actions = [],
  image,
  imageAlt,
  reverse = false,
  ratio = '4/3',
}) {
  const Heading = `h${headingLevel}`;

  return (
    <div className={cn(styles.grid, reverse && styles.reverse)}>
      <Reveal animation={reverse ? 'slide-right' : 'slide-left'} className={styles.content}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <Heading className={styles.title}>{title}</Heading>
        {body ? <p className={styles.body}>{body}</p> : null}

        {bullets.length ? (
          <ul className={styles.bullets}>
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}

        {actions.length ? (
          <div className={styles.actions}>
            {actions.map((action) => (
              <Button key={action.href ?? action.label} {...action} />
            ))}
          </div>
        ) : null}
      </Reveal>

      <Reveal animation="zoom" delay={80} className={styles.media}>
        <Media image={image} alt={imageAlt} ratio={ratio} sizes="(min-width: 1024px) 45vw, 100vw" />
      </Reveal>
    </div>
  );
}
