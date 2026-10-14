import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatPrice } from '@/lib/utils';

import { services } from '@/lib/content/services';
import { processSteps, faq, techStack } from '@/lib/content/site-content';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import ServiceCards from '@/components/sections/ServiceCards';
import ProcessSteps from '@/components/sections/ProcessSteps';
import LogoStrip from '@/components/sections/LogoStrip';
import CTABanner from '@/components/sections/CTABanner';
import Accordion from '@/components/ui/Accordion';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

import JsonLd from '@/lib/schema/JsonLd';
import {
  breadcrumb,
  service as serviceNode,
  faqPage,
  itemList,
  webPage,
  howTo,
} from '@/lib/schema/builders';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  return buildMetadata({
    locale,
    routeKey: 'services',
    title: t('services.title'),
    description: t('services.lead'),
  });
}

export default async function ServicesPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  const items = services.map((s) => ({
    id: s.slug,
    icon: s.icon,
    name: pick(s.name, locale),
    excerpt: pick(s.excerpt, locale),
    href: path(locale, 'services', s.slug),
    price: s.priceFrom ? `${formatPrice(s.priceFrom, locale)}${s.recurring ? t('common.perMonth') : ''}` : null,
  }));

  const processFaq = faq.filter((f) => f.group === 'process').map((f) => ({
    question: pick(f.question, locale),
    answer: <p>{pick(f.answer, locale)}</p>,
  }));

  const schema = [
    webPage({ locale, url: path(locale, 'services'), name: t('services.title'), description: t('services.lead') }),
    breadcrumb(locale, [{ name: t('nav.services'), url: path(locale, 'services') }]),
    itemList({
      name: t('services.title'),
      items: services.map((s) => ({ name: pick(s.name, locale), url: path(locale, 'services', s.slug) })),
    }),
    ...services.map((s) =>
      serviceNode({
        name: pick(s.name, locale),
        description: pick(s.excerpt, locale),
        url: path(locale, 'services', s.slug),
        priceFrom: s.priceFrom,
        recurring: Boolean(s.recurring),
      }),
    ),
    howTo({
      name: t('home.processTitle'),
      steps: processSteps.map((step) => ({
        name: pick(step.name, locale),
        text: pick(step.description, locale),
      })),
    }),
    faqPage(
      faq
        .filter((f) => f.group === 'process')
        .map((f) => ({ question: pick(f.question, locale), answer: pick(f.answer, locale) })),
    ),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero
        eyebrow={t('nav.services')}
        title={t('services.title')}
        body={t('services.lead')}
        actions={[
          { label: t('common.viewPricing'), href: path(locale, 'pricing'), variant: 'primary' },
          { label: t('common.getInTouch'), href: path(locale, 'contact'), variant: 'secondary' },
        ]}
      >
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.services'), href: path(locale, 'services') }]}
        />
      </Hero>

      <Section header={false}>
        <ServiceCards
          items={items}
          readMoreLabel={t('common.readMore')}
          fromLabel={t('common.from')}
        />
      </Section>

      <Section background="alt" title={t('home.processTitle')} align="center">
        <ProcessSteps
          items={processSteps.map((step) => ({
            step: step.step,
            name: pick(step.name, locale),
            description: pick(step.description, locale),
            duration: pick(step.duration, locale),
          }))}
        />
      </Section>

      <Section header={false} space={0.6}>
        <LogoStrip
          title={t('home.logosTitle')}
          items={techStack}
        />
      </Section>

      <Section background="alt" title={t('faq.title')} width="narrow">
        <Accordion items={processFaq} headingLevel={3} />
      </Section>

      <Section header={false} space={0.85}>
        <CTABanner
          title={t('home.ctaTitle')}
          body={t('home.ctaBody')}
          actions={[
            { label: t('common.getInTouch'), href: path(locale, 'contact'), variant: 'primary' },
            { label: t('common.freeAudit'), href: path(locale, 'audit'), variant: 'ghost' },
          ]}
        />
      </Section>
    </>
  );
}
