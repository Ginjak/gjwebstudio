import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatPrice } from '@/lib/utils';

import { plans, comparison, packages, addons, calculator, hourlyRate } from '@/lib/content/pricing';
import { faq } from '@/lib/content/site-content';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PricingTable from '@/components/sections/PricingTable';
import ComparisonTable from '@/components/sections/ComparisonTable';
import AddonCards from '@/components/sections/AddonCards';
import PackageCards from '@/components/sections/PackageCards';
import PricingCalculator from '@/components/sections/PricingCalculator';
import CTABanner from '@/components/sections/CTABanner';
import Accordion from '@/components/ui/Accordion';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, offerCatalog, faqPage, webPage } from '@/lib/schema/builders';

import styles from './pricing.module.scss';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  return buildMetadata({
    locale,
    routeKey: 'pricing',
    title: t('pricing.title'),
    description: t('pricing.lead'),
  });
}

export default async function PricingPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  const planItems = plans.map((plan) => ({
    id: plan.id,
    name: pick(plan.name, locale),
    tagline: pick(plan.tagline, locale),
    bestFor: pick(plan.bestFor, locale),
    features: pick(plan.features, locale),
    monthly: plan.monthly,
    annual: plan.annual,
    featured: plan.featured,
    custom: plan.custom,
    ctaHref: path(locale, 'contact'),
  }));

  const columns = plans.map((plan) => ({ id: plan.id, name: pick(plan.name, locale) }));

  const groups = comparison.map((group) => ({
    name: pick(group.group, locale),
    rows: group.rows.map((row) => ({
      label: pick(row.label, locale),
      values: Object.fromEntries(
        Object.entries(row.values).map(([key, value]) => [
          key,
          typeof value === 'object' ? pick(value, locale) : value,
        ]),
      ),
    })),
  }));

  const pricingFaq = faq
    .filter((f) => f.group === 'pricing')
    .map((f) => ({ question: pick(f.question, locale), answer: <p>{pick(f.answer, locale)}</p> }));

  const schema = [
    webPage({ locale, url: path(locale, 'pricing'), name: t('pricing.title'), description: t('pricing.lead') }),
    breadcrumb(locale, [{ name: t('nav.pricing'), url: path(locale, 'pricing') }]),
    offerCatalog({
      name: t('pricing.title'),
      url: path(locale, 'pricing'),
      offers: [
        ...plans.map((plan) => ({
          name: pick(plan.name, locale),
          description: pick(plan.tagline, locale),
          price: plan.monthly,
          url: path(locale, 'pricing'),
          recurring: true,
        })),
        ...packages.map((pkg) => ({
          name: pick(pkg.name, locale),
          description: pick(pkg.description, locale),
          price: pkg.from,
          url: path(locale, 'pricing'),
        })),
      ],
    }),
    faqPage(
      faq
        .filter((f) => f.group === 'pricing')
        .map((f) => ({ question: pick(f.question, locale), answer: pick(f.answer, locale) })),
    ),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero
        eyebrow={t('nav.pricing')}
        title={t('pricing.title')}
        body={t('pricing.lead')}
        actions={[
          { label: t('common.getQuote'), href: path(locale, 'contact'), variant: 'primary' },
          { label: t('common.freeAudit'), href: path(locale, 'audit'), variant: 'secondary' },
        ]}
      >
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.pricing'), href: path(locale, 'pricing') }]}
        />
      </Hero>

      <Section header={false}>
        <PricingTable
          plans={planItems}
          labels={{
            monthly: t('pricing.monthly'),
            annual: t('pricing.annual'),
            annualSaving: t('pricing.annualSaving'),
            billedAnnually: t('pricing.billedAnnually'),
            choosePlan: t('pricing.choosePlan'),
            mostPopular: t('common.mostPopular'),
            perMonth: t('common.perMonth'),
            from: t('common.from'),
            bestFor: t('services.idealFor'),
            vatNote: t('common.vatNote'),
            billing: t('pricing.monthly'),
          }}
        />
      </Section>

      <Section background="alt" title={t('pricing.compareTitle')}>
        <ComparisonTable
          columns={columns}
          groups={groups}
          caption={t('pricing.compareTitle')}
          labels={{
            feature: t('pricing.feature'),
            included: t('pricing.included'),
            notIncluded: t('pricing.notIncluded'),
          }}
        />
      </Section>

      <Section title={t('pricing.oneOffTitle')} lead={t('pricing.oneOffLead')}>
        <PackageCards
          items={packages.map((pkg) => ({
            id: pkg.id,
            icon: pkg.icon,
            name: pick(pkg.name, locale),
            price: formatPrice(pkg.from, locale),
            duration: pick(pkg.duration, locale),
            description: pick(pkg.description, locale),
            includes: pick(pkg.includes, locale),
            featured: pkg.featured,
            href: path(locale, 'contact'),
          }))}
          labels={{
            from: t('common.from'),
            cta: t('common.getQuote'),
            mostPopular: t('common.mostPopular'),
          }}
        />

        <p className={styles.hourly}>
          {formatPrice(hourlyRate, locale)}
          {t('common.perHour')} · {t('common.vatNote')}
        </p>
      </Section>

      <Section background="alt" title={t('pricing.addonsTitle')}>
        <AddonCards
          items={addons.map((addon) => ({
            id: addon.id,
            icon: addon.icon,
            name: pick(addon.name, locale),
            description: pick(addon.description, locale),
            price: formatPrice(addon.price, locale),
            oneOff: addon.oneOff,
            href: path(locale, 'contact'),
          }))}
          labels={{
            perMonth: t('common.perMonth'),
            oneOff: t('common.oneOff'),
            askAbout: t('common.askAbout'),
          }}
        />
      </Section>

      <Section title={t('pricing.calculatorTitle')} lead={t('pricing.calculatorLead')}>
        <PricingCalculator
          config={{
            rangeFactor: calculator.rangeFactor,
            pages: calculator.pages,
            options: calculator.options.map((option) => ({
              id: option.id,
              price: option.price,
              name: pick(option.name, locale),
              hint: pick(option.hint, locale),
            })),
          }}
          locale={locale}
          contactHref={path(locale, 'contact')}
          labels={{
            pages: t('pricing.calculatorPages'),
            optionsLegend: t('form.service'),
            result: t('pricing.calculatorResult'),
            note: t('pricing.calculatorNote'),
            cta: t('pricing.calculatorCta'),
          }}
        />
      </Section>

      <Section background="alt" title={t('pricing.faqTitle')} width="narrow">
        <Accordion items={pricingFaq} headingLevel={3} />
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
