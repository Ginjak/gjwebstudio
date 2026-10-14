'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import styles from './ComparisonTable.module.scss';

/**
 * Feature comparison.
 *
 *  • lg and up: the full matrix as a real <table>
 *  • below lg: a plan picker (segmented control) and that plan's features as
 *    a vertical list — no sideways scrolling on phones
 *
 * Only one of the two is displayed at a time (CSS), so assistive tech never
 * meets both.
 *
 * columns: [{ id, name }]
 * groups:  [{ name, rows: [{ label, values: { [columnId]: true|false|string } }] }]
 *
 * Boolean values render an icon *and* visually-hidden text, so the meaning is
 * never carried by an icon alone.
 */
export default function ComparisonTable({ columns = [], groups = [], labels = {}, caption }) {
  const [planIndex, setPlanIndex] = useState(0);
  const plan = columns[planIndex];

  return (
    <>
      {/* --- Desktop: matrix ---------------------------------------------- */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr>
              <th scope="col" className={styles.rowHead}>
                {labels.feature}
              </th>
              {columns.map((col) => (
                <th key={col.id} scope="col" className={styles.colHead}>
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>

          {groups.map((group) => (
            <tbody key={group.name}>
              <tr>
                <th scope="colgroup" colSpan={columns.length + 1} className={styles.groupHead}>
                  {group.name}
                </th>
              </tr>
              {group.rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className={styles.rowHead}>
                    {row.label}
                  </th>
                  {columns.map((col) => (
                    <td key={col.id} className={styles.cell}>
                      <Value value={row.values[col.id]} labels={labels} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* --- Mobile: plan picker + list --------------------------------- */}
      <div className={styles.mobile}>
        <div
          className={styles.picker}
          role="group"
          aria-label={caption}
          style={{
            '--index': planIndex,
            '--count': columns.length,
            // Position in the 2×2 layout used on very narrow phones.
            '--col2': planIndex % 2,
            '--row2': Math.floor(planIndex / 2),
          }}
        >
          <span className={styles.thumb} aria-hidden="true" />
          {columns.map((col, i) => (
            <button
              key={col.id}
              type="button"
              className={cn(styles.pickerBtn, i === planIndex && styles.pickerActive)}
              aria-pressed={i === planIndex}
              onClick={() => setPlanIndex(i)}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Keyed by plan so the list replays its entrance on every switch. */}
        <div key={plan?.id} className={styles.planList}>
          {groups.map((group) => (
            <section key={group.name} className={styles.group}>
              <h3 className={styles.groupTitle}>{group.name}</h3>
              <ul className={styles.rows}>
                {group.rows.map((row, i) => {
                  const value = row.values[plan?.id];
                  const off = value === false || value === undefined;
                  return (
                    <li
                      key={row.label}
                      className={cn(styles.row, off && styles.rowOff)}
                      style={{ '--i': i }}
                    >
                      <span className={styles.rowLabel}>{row.label}</span>
                      <span className={styles.rowValue}>
                        <Value value={value} labels={labels} />
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}

function Value({ value, labels }) {
  if (value === true) {
    return (
      <>
        <Icon name="check" size={20} className={styles.yes} />
        <span className="sr-only">{labels.included}</span>
      </>
    );
  }
  if (value === false || value === undefined) {
    return (
      <>
        <span className={styles.no} aria-hidden="true">
          –
        </span>
        <span className="sr-only">{labels.notIncluded}</span>
      </>
    );
  }
  return value;
}
