import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatPrice } from '@/lib/utils';

import { testimonials, aggregateRating } from '@/lib/content/site-content';
import { projects } from '@/lib/content/projects';
import { services } from '@/lib/content/services';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TestimonialSlider from '@/components/sections/TestimonialSlider';
import ServiceCards from '@/components/sections/ServiceCards';
import WorkGrid from '@/components/sections/WorkGrid';
import CTABanner from '@/components/sections/CTABanner';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, reviews, webPage } from '@/lib/schema/builders';

/** How many "services these clients chose" cards to show. */
const SERVICES_SHOWN = 3;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'testimonials',
    title: t('testimonials.title'),
    description: t('testimonials.lead'),
  });
}

export default async function TestimonialsPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  const projectFor = (item) => projects.find((p) => p.slug === item.project);

  const items = testimonials.map((item) => {
    const project = projectFor(item);
    return {
      id: item.id,
      quote: pick(item.quote, locale),
      author: pick(item.author, locale),
      rating: item.rating,
      project: project
        ? { title: pick(project.title, locale), href: path(locale, 'work', project.slug) }
        : undefined,
    };
  });

  // The services the reviewed projects actually used, most common first
  // (ties keep the order of the services list).
  const usage = new Map();
  testimonials.forEach((item) => {
    projectFor(item)?.services?.forEach((slug) => usage.set(slug, (usage.get(slug) ?? 0) + 1));
  });
  const chosenServices = services
    .filter((s) => usage.has(s.slug))
    .sort((a, b) => usage.get(b.slug) - usage.get(a.slug))
    .slice(0, SERVICES_SHOWN)
    .map((s) => ({
      id: s.slug,
      icon: s.icon,
      name: pick(s.name, locale),
      excerpt: pick(s.excerpt, locale),
      href: path(locale, 'services', s.slug),
      price: s.priceFrom
        ? `${formatPrice(s.priceFrom, locale)}${s.recurring ? t('common.perMonth') : ''}`
        : null,
    }));

  // Projects behind the reviews; when none are linked, show the latest work instead.
  const reviewed = testimonials.map(projectFor).filter(Boolean);
  const linkedProjects = (reviewed.length ? reviewed : projects)
    .slice(0, 3)
    .map((project) => ({
      slug: project.slug,
      href: path(locale, 'work', project.slug),
      title: pick(project.title, locale),
      excerpt: pick(project.excerpt, locale),
      image: project.image,
    }));

  const schema = [
    webPage({
      locale,
      url: path(locale, 'testimonials'),
      name: t('testimonials.title'),
      description: t('testimonials.lead'),
    }),
    breadcrumb(locale, [{ name: t('nav.testimonials'), url: path(locale, 'testimonials') }]),
    ...reviews(
      testimonials.map((item) => ({
        author: pick(item.author, locale),
        quote: pick(item.quote, locale),
        rating: item.rating,
        date: item.date,
      })),
    ),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero
        eyebrow={t('nav.testimonials')}
        title={t('testimonials.title')}
        body={t('testimonials.lead')}
        bullets={[`${aggregateRating.ratingValue}/5 · ${aggregateRating.reviewCount}`]}
      >
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.testimonials'), href: path(locale, 'testimonials') }]}
        />
      </Hero>

      <Section header={false}>
        <TestimonialSlider
          items={items}
          labels={{
            region: t('testimonials.sliderLabel'),
            slideOf: t('testimonials.slideOf'),
            previous: t('common.previous'),
            next: t('common.next'),
            viewProject: t('testimonials.viewProject'),
            choose: t('testimonials.chooseReview'),
          }}
        />
      </Section>

      {chosenServices.length ? (
        <Section
          background="alt"
          title={t('testimonials.servicesTitle')}
          lead={t('testimonials.servicesLead')}
        >
          <ServiceCards
            items={chosenServices}
            readMoreLabel={t('common.readMore')}
            fromLabel={t('common.from')}
          />
        </Section>
      ) : null}

      <Section title={t('home.workTitleShort')}>
        <WorkGrid items={linkedProjects} readMoreLabel={t('common.readMore')} featureFirst={false} />
      </Section>

      <Section header={false} space={0.85}>
        <CTABanner
          title={t('home.ctaTitle')}
          body={t('home.ctaBody')}
          actions={[{ label: t('common.getInTouch'), href: path(locale, 'contact'), variant: 'primary' }]}
        />
      </Section>
    </>
  );
}
