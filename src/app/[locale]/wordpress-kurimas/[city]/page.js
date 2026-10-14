import { notFound } from 'next/navigation';

import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { locales, path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick } from '@/lib/utils';
import { siteConfig } from '@/config/site.config';

import { cities, getCity, faq, processSteps } from '@/lib/content/site-content';
import { getService } from '@/lib/content/services';

import { projects } from '@/lib/content/projects';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ImageText from '@/components/sections/ImageText';
import ServiceCards from '@/components/sections/ServiceCards';
import WorkGrid from '@/components/sections/WorkGrid';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Accordion from '@/components/ui/Accordion';
import CTABanner from '@/components/sections/CTABanner';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, service as serviceNode, faqPage, webPage, localBusiness } from '@/lib/schema/builders';

/** City pages target WordPress searches, so they feature the WordPress services. */
const CITY_SERVICES = ['wordpress-kurimas', 'wordpress-prieziura', 'seo-optimizavimas'];

/** Only the generated paths exist; anything else is a real 404, not a soft one. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => cities.map((city) => ({ locale, city: city.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) return {};

  const t = createTranslator(await getDictionary(locale));
  const title = t('locations.titleTemplate', { city: pick(city.name, locale) });

  return buildMetadata({
    locale,
    routeKey: 'locations',
    segments: [citySlug],
    title,
    description: t('locations.lead', { cityGen: pick(city.nameGen, locale) }),
    image: city.image?.src,
  });
}

export default async function CityPage({ params }) {
  const { locale, city: citySlug } = await params;
  const city = getCity(citySlug);
  if (!city) notFound();

  const t = createTranslator(await getDictionary(locale));
  const title = t('locations.titleTemplate', { city: pick(city.name, locale) });
  const lead = t('locations.lead', { cityGen: pick(city.nameGen, locale) });

  const serviceItems = CITY_SERVICES.map(getService).map((s) => ({
    id: s.slug,
    icon: s.icon,
    name: pick(s.name, locale),
    excerpt: pick(s.excerpt, locale),
    href: path(locale, 'services', s.slug),
  }));

  const workItems = projects.slice(0, 3).map((p) => ({
    slug: p.slug,
    href: path(locale, 'work', p.slug),
    title: pick(p.title, locale),
    excerpt: pick(p.excerpt, locale),
    image: p.image,
  }));

  const localFaq = faq
    .filter((f) => f.group === 'general')
    .map((f) => ({ question: pick(f.question, locale), answer: <p>{pick(f.answer, locale)}</p> }));

  const schema = [
    webPage({ locale, url: path(locale, 'locations', citySlug), name: title, description: lead, image: city.image?.src }),
    breadcrumb(locale, [
      { name: t('nav.services'), url: path(locale, 'services') },
      { name: pick(city.nameNom, locale), url: path(locale, 'locations', citySlug) },
    ]),
    serviceNode({
      name: title,
      description: lead,
      url: path(locale, 'locations', citySlug),
      priceFrom: 900,
      areaServed: [pick(city.nameNom, locale)],
    }),
    localBusiness(locale),
    faqPage(
      faq
        .filter((f) => f.group === 'general')
        .map((f) => ({ question: pick(f.question, locale), answer: pick(f.answer, locale) })),
    ),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero
        eyebrow={siteConfig.name}
        title={title}
        body={lead}
        actions={[
          { label: t('common.getQuote'), href: path(locale, 'contact'), variant: 'primary' },
          { label: t('common.viewPricing'), href: path(locale, 'pricing'), variant: 'secondary' },
        ]}
      >
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[
            { name: t('nav.services'), href: path(locale, 'services') },
            { name: pick(city.nameNom, locale), href: path(locale, 'locations', citySlug) },
          ]}
        />
      </Hero>

      <Section header={false}>
        <ImageText
          title={pick(city.nameNom, locale)}
          body={pick(city.intro, locale)}
          bullets={pick(city.highlights, locale)}
          image={city.image}
          actions={[{ label: t('common.getInTouch'), href: path(locale, 'contact'), variant: 'secondary' }]}
        />
      </Section>

      <Section background="alt" title={t('services.title')}>
        <ServiceCards items={serviceItems} readMoreLabel={t('common.readMore')} fromLabel={t('common.from')} />
      </Section>

      <Section title={t('home.processTitle')} align="center">
        <ProcessSteps
          items={processSteps.map((step) => ({
            step: step.step,
            name: pick(step.name, locale),
            description: pick(step.description, locale),
            duration: pick(step.duration, locale),
          }))}
        />
      </Section>

      <Section background="alt" title={t('home.workTitleShort')}>
        <WorkGrid items={workItems} readMoreLabel={t('common.readMore')} featureFirst={false} />
      </Section>

      <Section title={t('faq.title')} width="narrow">
        <Accordion items={localFaq} headingLevel={3} />
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
