import Link from 'next/link';
import styles from './Breadcrumbs.module.scss';

/**
 * Visual breadcrumb trail. Pair it with schema `breadcrumb()` so the same
 * information reaches search engines.
 *
 * items: [{ name, href }] — the last item is rendered as the current page.
 */
export default function Breadcrumbs({ items = [], label = 'Breadcrumb', homeLabel = 'Home', homeHref = '/' }) {
  const all = [{ name: homeLabel, href: homeHref }, ...items];

  return (
    <nav aria-label={label} className={styles.wrap}>
      <ol className={styles.list}>
        {all.map((item, i) => {
          const isLast = i === all.length - 1;
          return (
            <li key={`${item.href}-${i}`} className={styles.item}>
              {isLast ? (
                <span aria-current="page" className={styles.current}>
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.href} className={styles.link}>
                    {item.name}
                  </Link>
                  <span className={styles.sep} aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
