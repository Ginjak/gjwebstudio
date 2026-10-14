import { notFound } from 'next/navigation';

import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { locales, path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick } from '@/lib/utils';

import { projects, getProject, projectCategories } from '@/lib/content/projects';
import { getService } from '@/lib/content/services';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Media from '@/components/ui/Media';
import Tag from '@/components/ui/Tag';
import Prose from '@/components/ui/Prose';
import Reveal from '@/components/ui/Reveal';
import Testimonials from '@/components/sections/Testimonials';
import WorkGrid from '@/components/sections/WorkGrid';
import CTABanner from '@/components/sections/CTABanner';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, creativeWork, webPage } from '@/lib/schema/builders';

import styles from './case-study.module.scss';

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return buildMetadata({
    locale,
    routeKey: 'work',
    segments: [slug],
    title: pick(project.title, locale),
    description: pick(project.excerpt, locale),
    image: project.image?.src,
    type: 'article',
  });
}

export default async function CaseStudyPage({ params }) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const t = createTranslator(await getDictionary(locale));
  const title = pick(project.title, locale);

  const next = projects[(projects.findIndex((p) => p.slug === slug) + 1) % projects.length];

  const schema = [
    webPage({ locale, url: path(locale, 'work', slug), name: title, description: pick(project.excerpt, locale) }),
    breadcrumb(locale, [
      { name: t('nav.work'), url: path(locale, 'work') },
      { name: title, url: path(locale, 'work', slug) },
    ]),
    creativeWork({
      locale,
      url: path(locale, 'work', slug),
      name: title,
      description: pick(project.excerpt, locale),
      image: project.image?.src,
      datePublished: `${project.year}-01-01`,
      keywords: project.categories,
    }),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero eyebrow={pick(project.client, locale)} title={title} body={pick(project.excerpt, locale)}>
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[
            { name: t('nav.work'), href: path(locale, 'work') },
            { name: title, href: path(locale, 'work', slug) },
          ]}
        />
      </Hero>

      <Section header={false} space={0.6}>
        <Media
          image={project.image}
          ratio="16/9"
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
        />

        <dl className={styles.facts}>
          <div>
            <dt>{t('work.client')}</dt>
            <dd>{pick(project.client, locale)}</dd>
          </div>
          <div>
            <dt>{t('work.year')}</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>{t('common.category')}</dt>
            <dd>
              {project.categories
                .map((id) => pick(projectCategories.find((c) => c.id === id)?.name, locale))
                .join(', ')}
            </dd>
          </div>
          <div>
            <dt>{t('work.servicesUsed')}</dt>
            <dd className={styles.tagList}>
              {project.services?.map((id) => {
                const service = getService(id);
                if (!service) return null;
                return (
                  <Tag key={id} size="sm" href={path(locale, 'services', id)}>
                    {pick(service.name, locale)}
                  </Tag>
                );
              })}
            </dd>
          </div>
        </dl>
      </Section>

      <Section background="alt" header={false}>
        <ul className={styles.metrics}>
          {project.metrics?.map((metric, i) => (
            <li key={metric.value}>
              <Reveal animation="fade-up" delay={i * 70} className={styles.metric}>
                <span className={styles.metricValue}>{metric.value}</span>
                <span className={styles.metricLabel}>{pick(metric.label, locale)}</span>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section header={false}>
        <div className={styles.story}>
          <Prose size="lg">
            <h2>{t('common.challenge')}</h2>
            <p>{pick(project.challenge, locale)}</p>

            <h2>{t('common.solution')}</h2>
            <p>{pick(project.solution, locale)}</p>

            <h2>{t('common.outcome')}</h2>
            <p>{pick(project.outcome, locale)}</p>
          </Prose>
        </div>

        {project.gallery?.length ? (
          <ul className={styles.gallery}>
            {project.gallery.map((image, i) => (
              <li key={image.src}>
                <Reveal animation="zoom" delay={i * 80}>
                  <Media image={image} ratio="16/10" sizes="(min-width: 1024px) 50vw, 100vw" />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : null}
      </Section>

      {project.testimonial ? (
        <Section background="accent" header={false} space={0.85}>
          <Testimonials
            variant="single"
            items={[
              {
                id: slug,
                quote: pick(project.testimonial.quote, locale),
                author: pick(project.testimonial.author, locale),
              },
            ]}
          />
        </Section>
      ) : null}

      <Section title={t('work.nextProject')}>
        <WorkGrid
          featureFirst={false}
          readMoreLabel={t('common.readMore')}
          items={[
            {
              slug: next.slug,
              href: path(locale, 'work', next.slug),
              title: pick(next.title, locale),
              excerpt: pick(next.excerpt, locale),
              image: next.image,
            },
          ]}
        />
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
