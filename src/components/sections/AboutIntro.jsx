import Media from '@/components/ui/Media';
import Reveal from '@/components/ui/Reveal';
import styles from './AboutIntro.module.scss';

/**
 * About page personal intro: portrait (with brand shapes behind it), a short
 * first-person story signed with the owner's name, and the everyday tools.
 *
 * props: image, eyebrow, title, name, jobTitle, paragraphs: [], toolsTitle, tools: []
 */
export default function AboutIntro({
  image,
  eyebrow,
  title,
  name,
  jobTitle,
  paragraphs = [],
  toolsTitle,
  tools = [],
}) {
  return (
    <div className={styles.wrap}>
      <Reveal animation="zoom" className={styles.portrait}>
        <span className={styles.shapeBack} aria-hidden="true" />
        <span className={styles.shapeDot} aria-hidden="true" />
        <Media
          image={image}
          alt={name}
          ratio="1/1"
          rounded={false}
          className={styles.photo}
          sizes="(min-width: 1024px) 34vw, 80vw"
        />
        <p className={styles.nameTag}>
          <strong>{name}</strong>
          <span>{jobTitle}</span>
        </p>
      </Reveal>

      <div className={styles.content}>
        <Reveal animation="fade" as="p" className={styles.eyebrow}>
          {eyebrow}
        </Reveal>
        <Reveal animation="fade-up" delay={60}>
          <h2 className={styles.title}>{title}</h2>
        </Reveal>

        {paragraphs.map((paragraph, i) => (
          <Reveal key={paragraph} animation="fade-up" delay={120 + i * 60} as="p" className={styles.text}>
            {paragraph}
          </Reveal>
        ))}

        <Reveal animation="fade-up" delay={240} as="p" className={styles.signature}>
          — {name}
        </Reveal>

        {tools.length ? (
          <Reveal animation="fade-up" delay={300} className={styles.tools}>
            <h3 className={styles.toolsTitle}>{toolsTitle}</h3>
            <ul className={styles.toolList}>
              {tools.map((tool) => (
                <li key={tool} className={styles.tool}>
                  {tool}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
