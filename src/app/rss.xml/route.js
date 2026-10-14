import { siteConfig } from '@/config/site.config';
import { defaultLocale, path, localeTags } from '@/config/routes';
import { sortedPosts } from '@/lib/content/posts';
import { pick } from '@/lib/utils';

/**
 * RSS 2.0 feed for the Lithuanian blog.
 * Duplicate this route under /en/rss.xml if you want a separate English feed.
 */
export const dynamic = 'force-static';

const base = siteConfig.url.replace(/\/$/, '');

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const locale = defaultLocale;
  const posts = sortedPosts();

  const items = posts
    .map((post) => {
      const link = base + path(locale, 'blog', post.slug);
      return `    <item>
      <title>${escapeXml(pick(post.title, locale))}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(pick(post.excerpt, locale))}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${base}</link>
    <description>${escapeXml(siteConfig.name)}</description>
    <language>${localeTags[locale]}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
