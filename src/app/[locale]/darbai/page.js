import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick } from '@/lib/utils';

import { projects, projectCategories, projectCategoryBadges } from '@/lib/content/projects';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import FilterBar from '@/components/sections/FilterBar';
import WorkGrid from '@/components/sections/WorkGrid';
import CTABanner from '@/components/sections/CTABanner';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, itemList, webPage } from '@/lib/schema/builders';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'work',
    title: t('work.title'),
    description: t('work.lead'),
  });
}

export default async function WorkPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  const items = projects.map((project) => ({
    slug: project.slug,
    categories: project.categories,
    badges: projectCategoryBadges(project, locale),
    href: path(locale, 'work', project.slug),
    title: pick(project.title, locale),
    excerpt: pick(project.excerpt, locale),
    image: project.image,
    tags: [pick(project.client, locale)],
    metric: project.metrics?.[0]
      ? { value: project.metrics[0].value, label: pick(project.metrics[0].label, locale) }
      : undefined,
  }));

  const categories = projectCategories.map((c) => ({ id: c.id, name: pick(c.name, locale) }));

  const schema = [
    webPage({ locale, url: path(locale, 'work'), name: t('work.title'), description: t('work.lead') }),
    breadcrumb(locale, [{ name: t('nav.work'), url: path(locale, 'work') }]),
    itemList({
      name: t('work.title'),
      items: projects.map((p) => ({ name: pick(p.title, locale), url: path(locale, 'work', p.slug) })),
    }),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero eyebrow={t('nav.work')} title={t('work.title')} body={t('work.lead')}>
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.work'), href: path(locale, 'work') }]}
        />
      </Hero>

      <Section header={false}>
        <FilterBar
          categories={categories}
          label={t('work.filterLabel')}
          allLabel={t('common.all')}
          emptyLabel={t('work.noResults')}
        >
          <WorkGrid items={items} readMoreLabel={t('common.readMore')} featureFirst={false} />
        </FilterBar>
      </Section>

      <Section background="alt" header={false} space={0.85}>
        <CTABanner
          title={t('home.ctaTitle')}
          body={t('home.ctaBody')}
          actions={[{ label: t('common.getInTouch'), href: path(locale, 'contact'), variant: 'primary' }]}
        />
      </Section>
    </>
  );
}
