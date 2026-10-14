import { cn } from '@/lib/utils';
import Reveal from './Reveal';
import styles from './Section.module.scss';

/**
 * Standard page section wrapper.
 *
 * Props
 *  id           anchor id; also used for aria-labelledby
 *  eyebrow      small label above the title
 *  title        section heading text
 *  headingLevel 1..4 (default 2) — keeps the document outline correct
 *  lead         intro paragraph under the title
 *  background   'default' | 'alt' | 'dark' | 'accent' | 'none'
 *  align        'left' | 'center'
 *  width        'default' | 'wide' | 'narrow'
 *  space        vertical rhythm multiplier (default 1)
 *  actions      ReactNode rendered under the header
 *  wideHeader   let the title and lead run wider (for long, keyword-rich headings)
 *  header       set false to render children only
 */
export default function Section({
  id,
  eyebrow,
  title,
  headingLevel = 2,
  lead,
  children,
  background = 'default',
  align = 'left',
  width = 'default',
  space = 1,
  actions,
  wideHeader = false,
  header = true,
  animate = 'fade-up',
  className,
  ...rest
}) {
  const Heading = `h${Math.min(Math.max(headingLevel, 1), 6)}`;
  const headingId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={cn(styles.section, styles[`bg-${background}`], styles[align], className)}
      style={space !== 1 ? { '--section-scale': space } : undefined}
      aria-labelledby={title && headingId ? headingId : undefined}
      {...rest}
    >
      <div className={cn(styles.inner, styles[`w-${width}`])}>
        {header && (eyebrow || title || lead) ? (
          <Reveal animation={animate} className={cn(styles.header, wideHeader && styles.wideHeader)}>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            {title ? (
              <Heading id={headingId} className={styles.title}>
                {title}
              </Heading>
            ) : null}
            {lead ? <p className={styles.lead}>{lead}</p> : null}
            {actions ? <div className={styles.actions}>{actions}</div> : null}
          </Reveal>
        ) : null}

        {children}
      </div>
    </section>
  );
}
