import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import Media from '@/components/ui/Media';
import { cn } from '@/lib/utils';
import styles from './Hero.module.scss';

/**
 * Page hero.
 *
 * Props
 *  eyebrow, title, body       text content
 *  actions                    [{label, href, variant}]
 *  bullets                    small list under the buttons
 *  image                      registry image object (optional)
 *  variant  'home' | 'page'   home = dark with floating shapes
 *  align    'left' | 'center'
 *  wide     let a long title and intro use more of the width
 *  children rendered above the eyebrow (used for breadcrumbs)
 */
export default function Hero({
  eyebrow,
  title,
  body,
  actions = [],
  bullets = [],
  image,
  imageAlt,
  variant = 'page',
  align = 'left',
  wide = false,
  children,
}) {
  const isHome = variant === 'home';

  return (
    <section
      className={cn(styles.hero, styles[variant], styles[align], wide && styles.wide)}
      data-header-theme={isHome ? 'dark' : undefined}
    >
      {isHome ? <Shapes /> : null}

      <div className={cn(styles.inner, image && styles.withImage)}>
        <div className={styles.content}>
          {/* Breadcrumbs — styled to sit above the heading (margin-bottom only). */}
          {children}

          {eyebrow ? (
            <Reveal animation="fade" as="p" className={styles.eyebrow}>
              {eyebrow}
            </Reveal>
          ) : null}

          <Reveal animation="fade-up" delay={60}>
            <h1 className={styles.title}>{title}</h1>
          </Reveal>

          {body ? (
            <Reveal animation="fade-up" delay={120} as="p" className={styles.body}>
              {body}
            </Reveal>
          ) : null}

          {actions.length ? (
            <Reveal animation="fade-up" delay={180} className={styles.actions}>
              {actions.map((action) => (
                <Button key={action.href ?? action.label} {...action} size="lg" />
              ))}
            </Reveal>
          ) : null}

          {bullets.length ? (
            <Reveal animation="fade" delay={240} as="ul" className={styles.bullets}>
              {bullets.map((bullet) => (
                <li key={bullet}>
                  <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.check}>
                    <path
                      d="m4 10.5 4 4 8-9"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {bullet}
                </li>
              ))}
            </Reveal>
          ) : null}
        </div>

        {image ? (
          <Reveal animation="zoom" delay={120} className={styles.media}>
            <Media
              image={image}
              alt={imageAlt}
              priority
              ratio="4/3"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

/** Decorative floating shapes — purely presentational, hidden from AT. */
function Shapes() {
  return (
    <div className={styles.shapes} aria-hidden="true">
      <span className={cn(styles.shape, styles.hexagon)}>
        <svg viewBox="0 0 22 25">
          <path
            fill="currentColor"
            d="M22 17.61V7.39c0-.81-.43-1.56-1.12-1.97L12.12.3a2.25 2.25 0 0 0-2.24 0L1.12 5.42A2.25 2.25 0 0 0 0 7.39v10.22c0 .82.43 1.57 1.12 1.97l8.76 5.12c.7.4 1.54.4 2.24 0l8.76-5.12c.69-.4 1.12-1.15 1.12-1.97Z"
          />
        </svg>
      </span>
      <span className={cn(styles.shape, styles.triangle)}>
        <svg viewBox="0 0 23 21">
          <path
            fill="currentColor"
            d="M9.7 1.04.25 18.09C-.49 19.41.5 21 2.05 21h18.9c1.55 0 2.54-1.59 1.8-2.91L13.3 1.04c-.77-1.39-2.83-1.39-3.6 0Z"
          />
        </svg>
      </span>
      <span className={cn(styles.shape, styles.circle)}>
        <svg viewBox="0 0 22 22">
          <circle cx="11" cy="11" r="11" fill="currentColor" />
        </svg>
      </span>
      <span className={cn(styles.shape, styles.diamond)}>
        <svg viewBox="0 0 25 24">
          <path
            fill="currentColor"
            d="M11.18.84 1.4 10.54a2 2 0 0 0 0 2.82l9.78 9.7c.78.78 2.05.78 2.84 0l9.77-9.7a2 2 0 0 0 0-2.82L14.02.84a2.02 2.02 0 0 0-2.84 0Z"
          />
        </svg>
      </span>
    </div>
  );
}
