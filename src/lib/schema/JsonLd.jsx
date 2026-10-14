import { buildGraph, globalNodes } from './builders';
import { aggregateRating } from '@/lib/content/site-content';

/**
 * Renders a single JSON-LD <script> containing the global nodes plus any
 * page-specific nodes.
 *
 *   <JsonLd locale={locale} nodes={[breadcrumb(...), service(...)]} />
 *
 * Set `global={false}` if you only want the page nodes (rare — the root
 * layout already prints the global ones on every page).
 */
export default function JsonLd({ locale = 'lt', nodes = [], global = false }) {
  const all = global ? [...globalNodes(locale, aggregateRating), ...nodes] : nodes;
  const graph = buildGraph(all);

  if (!graph['@graph'].length) return null;

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for safe inline embedding.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, '\\u003c'),
      }}
    />
  );
}
