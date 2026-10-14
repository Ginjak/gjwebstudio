import { notFound } from 'next/navigation';
import Link from 'next/link';

import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { locales, path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatDate, slugify, countWords, isoDuration } from '@/lib/utils';
import { siteConfig } from '@/config/site.config';

import { posts, getPost, getRelatedPosts, postCategories } from '@/lib/content/posts';
import { authorPortrait } from '@/lib/content/images';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Media from '@/components/ui/Media';
import Prose from '@/components/ui/Prose';
import Tag from '@/components/ui/Tag';
import BlogTeaser from '@/components/sections/BlogTeaser';
import Newsletter from '@/components/sections/Newsletter';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, article, webPage } from '@/lib/schema/builders';

import styles from './post.module.scss';

/** Only the generated paths exist; anything else is a real 404, not a soft one. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => posts.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return buildMetadata({
    locale,
    routeKey: 'blog',
    segments: [slug],
    title: pick(post.title, locale),
    description: pick(post.excerpt, locale),
    image: post.image?.src,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.updated ?? post.date,
  });
}

/** Renders one content block. Nothing is injected as raw HTML. */
function Block({ block, locale }) {
  switch (block.type) {
    case 'h2':
      return <h2 id={slugify(pick(block.text, locale))}>{pick(block.text, locale)}</h2>;
    case 'h3':
      return <h3 id={slugify(pick(block.text, locale))}>{pick(block.text, locale)}</h3>;
    case 'ul':
      return (
        <ul>
          {pick(block.items, locale).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {pick(block.items, locale).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <figure className={styles.quote}>
          <blockquote>
            <p>{pick(block.text, locale)}</p>
          </blockquote>
          {block.cite ? <figcaption>{pick(block.cite, locale)}</figcaption> : null}
        </figure>
      );
    case 'callout':
      return <aside className={styles.callout}>{pick(block.text, locale)}</aside>;
    default:
      return <p>{pick(block.text, locale)}</p>;
  }
}

export default async function PostPage({ params }) {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const dict = await getDictionary(locale);
  const t = createTranslator(dict);
  const title = pick(post.title, locale);
  const category = pick(postCategories.find((c) => c.id === post.category)?.name, locale);

  const toc = post.body
    .filter((block) => block.type === 'h2')
    .map((block) => ({ id: slugify(pick(block.text, locale)), text: pick(block.text, locale) }));

  const related = getRelatedPosts(slug).map((item) => ({
    slug: item.slug,
    href: path(locale, 'blog', item.slug),
    title: pick(item.title, locale),
    excerpt: pick(item.excerpt, locale),
    image: item.image,
    date: formatDate(item.date, locale),
    dateISO: item.date,
  }));

  const schema = [
    webPage({
      locale,
      url: path(locale, 'blog', slug),
      name: title,
      description: pick(post.excerpt, locale),
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      image: post.image?.src,
    }),
    breadcrumb(locale, [
      { name: t('nav.blog'), url: path(locale, 'blog') },
      { name: title, url: path(locale, 'blog', slug) },
    ]),
    article({
      locale,
      url: path(locale, 'blog', slug),
      headline: title,
      description: pick(post.excerpt, locale),
      image: post.image?.src,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      section: category,
      wordCount: countWords(post.body, locale),
      timeRequired: isoDuration(post.readingTime),
    }),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero eyebrow={category} title={title} body={pick(post.excerpt, locale)}>
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[
            { name: t('nav.blog'), href: path(locale, 'blog') },
            { name: title, href: path(locale, 'blog', slug) },
          ]}
        />

        <p className={styles.meta}>
          <time dateTime={post.date}>{t('common.publishedOn', { date: formatDate(post.date, locale) })}</time>
          {post.updated ? (
            <>
              <span aria-hidden="true"> · </span>
              <time dateTime={post.updated}>
                {t('common.updatedOn', { date: formatDate(post.updated, locale) })}
              </time>
            </>
          ) : null}
          <span aria-hidden="true"> · </span>
          {t('common.minRead', { minutes: post.readingTime })}
        </p>
      </Hero>

      <Section header={false} space={0.6}>
        <Media image={post.image} ratio="16/9" priority sizes="(min-width: 1280px) 1100px, 100vw" />
      </Section>

      <Section header={false} space={0.4}>
        <div className={styles.layout}>
          {toc.length ? (
            <nav className={styles.toc} aria-labelledby="toc-title">
              <h2 id="toc-title" className={styles.tocTitle}>
                {t('blog.tableOfContents')}
              </h2>
              <ol className={styles.tocList}>
                {toc.map((entry) => (
                  <li key={entry.id}>
                    <a href={`#${entry.id}`}>{entry.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <article className={styles.article}>
            <Prose size="lg">
              {post.body.map((block, i) => (
                <Block key={i} block={block} locale={locale} />
              ))}
            </Prose>

            <footer className={styles.author}>
              <Media image={authorPortrait} ratio="1/1" className={styles.authorPhoto} sizes="96px" />
              <div>
                <p className={styles.authorLabel}>{t('blog.author')}</p>
                <p className={styles.authorName}>{siteConfig.owner.name}</p>
                <p className={styles.authorRole}>{pick(siteConfig.owner.jobTitle, locale)}</p>
              </div>
            </footer>

            <p className={styles.backRow}>
              <Link href={path(locale, 'blog')}>&larr; {t('blog.backToBlog')}</Link>
              <Tag size="sm">{category}</Tag>
            </p>
          </article>
        </div>
      </Section>

      <Section background="alt" title={t('blog.relatedTitle')}>
        <BlogTeaser items={related} readMoreLabel={t('common.readMore')} featureFirst={false} />
      </Section>

      <Section header={false} space={0.75}>
        <Newsletter labels={{ newsletter: dict.newsletter, form: dict.form }} locale={locale} />
      </Section>
    </>
  );
}
