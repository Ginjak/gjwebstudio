'use client';

import { useEffect, useRef, useState } from 'react';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import styles from './FilterBar.module.scss';

/**
 * Category filter (and optional "load more") for the work and blog listings.
 *
 * The full list is rendered on the server (so every card is in the HTML and
 * crawlable). This component only toggles `hidden` on the items that do not
 * match, which keeps the markup server-rendered and avoids passing a render
 * function across the server/client boundary.
 *
 * Each item element must carry `data-categories="id1,id2"`.
 *
 * `pageSize`: show this many matching items at first; a "load more" button
 * reveals the next batch. Switching category starts from the first batch
 * again. Items past the first batch should also be rendered `hidden` on the
 * server (see BlogTeaser `initialCount`) so they don't flash on load.
 */
export default function FilterBar({
  categories = [],
  label,
  allLabel,
  emptyLabel,
  pageSize = 0,
  loadMoreLabel,
  shownOfLabel,
  children,
}) {
  const [active, setActive] = useState('all');
  const [limit, setLimit] = useState(pageSize || Infinity);
  const [counts, setCounts] = useState(null); // { shown, total }
  const listRef = useRef(null);
  const userFiltered = useRef(false);
  const firstNewRef = useRef(-1); // focus target after "load more"

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;

    const nodes = root.querySelectorAll('[data-categories]');
    let matched = 0;
    let shown = 0;

    // After the first user action, newly shown items animate in (see CSS),
    // staggered by their position within the batch.
    if (userFiltered.current) root.dataset.filtered = 'true';

    nodes.forEach((node) => {
      const ids = (node.dataset.categories || '').split(',').filter(Boolean);
      const match = active === 'all' || ids.includes(active);
      const visible = match && matched < limit;
      if (match) matched += 1;

      node.hidden = !visible;
      if (visible) {
        const batchIndex = pageSize ? shown % pageSize : shown;
        node.style.setProperty('--i', String(batchIndex));
        shown += 1;
      }
    });

    // Keyboard users: after "load more", move focus to the first new item.
    if (firstNewRef.current >= 0) {
      const visibleNodes = [...nodes].filter((n) => !n.hidden);
      visibleNodes[firstNewRef.current]?.querySelector('a')?.focus();
      firstNewRef.current = -1;
    }

    setCounts({ shown, total: matched });
  }, [active, limit, pageSize, children]);

  function choose(id) {
    userFiltered.current = true;
    setActive(id);
    setLimit(pageSize || Infinity);
  }

  function loadMore() {
    userFiltered.current = true;
    firstNewRef.current = counts?.shown ?? -1;
    setLimit((n) => n + pageSize);
  }

  const all = [{ id: 'all', name: allLabel }, ...categories];
  const hasMore = pageSize > 0 && counts && counts.shown < counts.total;
  const status = counts
    ? (shownOfLabel ?? '{shown}/{total}')
        .replace('{shown}', counts.shown)
        .replace('{total}', counts.total)
    : '';

  return (
    <div className={styles.wrap}>
      <div className={styles.bar} role="group" aria-label={label}>
        {all.map((category) => (
          <button
            key={category.id}
            type="button"
            className={styles.button}
            aria-pressed={active === category.id}
            onClick={() => choose(category.id)}
          >
            <Tag active={active === category.id}>{category.name}</Tag>
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {status}
      </p>

      <div ref={listRef} className={styles.list}>
        {children}
      </div>

      {counts?.total === 0 ? <p className={styles.empty}>{emptyLabel}</p> : null}

      {hasMore ? (
        <div className={styles.more}>
          <p className={styles.count} aria-hidden="true">
            {status}
          </p>
          <Button label={loadMoreLabel} variant="secondary" onClick={loadMore} />
        </div>
      ) : null}

      {/* Without JavaScript there is no button, so show everything. */}
      {pageSize ? (
        <noscript>
          <style>{`.${styles.list} [data-categories][hidden]{display:flex!important}`}</style>
        </noscript>
      ) : null}
    </div>
  );
}
