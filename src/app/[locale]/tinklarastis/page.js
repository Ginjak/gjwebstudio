import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatDateShort } from '@/lib/utils';

import { sortedPosts, postCategories } from '@/lib/content/posts';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FilterBar from '@/components/sections/FilterBar';
import BlogTeaser from '@/components/sections/BlogTeaser';
import Newsletter from '@/components/sections/Newsletter';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, itemList, webPage } from '@/lib/schema/builders';

/** First batch, and each "load more" step. 7 = the wide featured card plus
 *  two full rows of three on desktop. */
const POSTS_PER_PAGE = 7;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'blog',
    title: t('blog.title'),
    description: t('blog.lead'),
  });
}

export default async function BlogPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);
  const posts = sortedPosts();

  const items = posts.map((post) => ({
    slug: post.slug,
    categoryId: post.category,
    category: pick(postCategories.find((c) => c.id === post.category)?.name, locale),
    href: path(locale, 'blog', post.slug),
    title: pick(post.title, locale),
    excerpt: pick(post.excerpt, locale),
    image: post.image,
    date: formatDateShort(post.date, locale),
    dateISO: post.date,
    readingTime: t('common.minRead', { minutes: post.readingTime }),
  }));

  const categories = postCategories.map((c) => ({ id: c.id, name: pick(c.name, locale) }));

  const schema = [
    webPage({ locale, url: path(locale, 'blog'), name: t('blog.title'), description: t('blog.lead') }),
    breadcrumb(locale, [{ name: t('nav.blog'), url: path(locale, 'blog') }]),
    itemList({
      name: t('blog.title'),
      items: posts.map((p) => ({ name: pick(p.title, locale), url: path(locale, 'blog', p.slug) })),
    }),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero eyebrow={t('nav.blog')} title={t('blog.title')} body={t('blog.lead')}>
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.blog'), href: path(locale, 'blog') }]}
        />
      </Hero>

      <Section header={false}>
        <FilterBar
          categories={categories}
          label={t('blog.categories')}
          allLabel={t('common.all')}
          emptyLabel={t('blog.noPosts')}
          pageSize={POSTS_PER_PAGE}
          loadMoreLabel={t('common.loadMore')}
          shownOfLabel={t('common.shownOf')}
        >
          <BlogTeaser
            items={items}
            readMoreLabel={t('common.readMore')}
            initialCount={POSTS_PER_PAGE}
          />
        </FilterBar>
      </Section>

      <Section background="alt" header={false} space={0.75}>
        <Newsletter labels={{ newsletter: dict.newsletter, form: dict.form }} locale={locale} />
      </Section>
    </>
  );
}
