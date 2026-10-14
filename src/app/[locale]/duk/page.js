import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick } from '@/lib/utils';

import { faq, faqGroups } from '@/lib/content/site-content';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Accordion from '@/components/ui/Accordion';
import CTABanner from '@/components/sections/CTABanner';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, faqPage, webPage } from '@/lib/schema/builders';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'faq',
    title: t('faq.title'),
    description: t('faq.lead'),
  });
}

export default async function FaqPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  const schema = [
    webPage({ locale, url: path(locale, 'faq'), name: t('faq.title'), description: t('faq.lead') }),
    breadcrumb(locale, [{ name: t('nav.faq'), url: path(locale, 'faq') }]),
    faqPage(
      faq.map((f) => ({ question: pick(f.question, locale), answer: pick(f.answer, locale) })),
    ),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero eyebrow={t('nav.faq')} title={t('faq.title')} body={t('faq.lead')}>
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.faq'), href: path(locale, 'faq') }]}
        />
      </Hero>

      {faqGroups.map((group, index) => {
        const items = faq
          .filter((f) => f.group === group.id)
          .map((f) => ({
            question: pick(f.question, locale),
            answer: <p>{pick(f.answer, locale)}</p>,
          }));

        if (!items.length) return null;

        return (
          <Section
            key={group.id}
            id={`faq-${group.id}`}
            title={pick(group.name, locale)}
            headingLevel={2}
            width="narrow"
            background={index % 2 === 1 ? 'alt' : 'default'}
            space={0.7}
          >
            <Accordion items={items} headingLevel={3} allowMultiple />
          </Section>
        );
      })}

      <Section header={false} space={0.85} background="alt">
        <CTABanner
          title={t('home.ctaTitle')}
          body={t('home.ctaBody')}
          actions={[{ label: t('common.getInTouch'), href: path(locale, 'contact'), variant: 'primary' }]}
        />
      </Section>
    </>
  );
}
