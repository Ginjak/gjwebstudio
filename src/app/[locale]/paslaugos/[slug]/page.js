import { notFound } from 'next/navigation';

import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { locales, path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatPrice } from '@/lib/utils';

import { services, getService } from '@/lib/content/services';
import { getServiceDetails } from '@/lib/content/service-details';
import { projects } from '@/lib/content/projects';
import { faq, testimonials, processSteps } from '@/lib/content/site-content';
import { servicesDevelopment, servicesMaintenance, servicesSeo } from '@/lib/content/images';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Prose from '@/components/ui/Prose';
import Icon from '@/components/ui/Icon';
import ImageText from '@/components/sections/ImageText';
import { ServiceFacts, IncludedGrid, ProblemSolution } from '@/components/sections/ServiceDetail';
import StatsBand from '@/components/sections/StatsBand';
import Testimonials from '@/components/sections/Testimonials';
import ProcessSteps from '@/components/sections/ProcessSteps';
import ServiceCards from '@/components/sections/ServiceCards';
import WorkGrid from '@/components/sections/WorkGrid';
import CTABanner from '@/components/sections/CTABanner';
import Accordion from '@/components/ui/Accordion';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, service as serviceNode, faqPage, webPage } from '@/lib/schema/builders';

const heroImages = [servicesDevelopment, servicesMaintenance, servicesSeo];

/** Max headline numbers in the results band. */
const MAX_RESULTS = 4;

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return buildMetadata({
    locale,
    routeKey: 'services',
    segments: [slug],
    title: pick(service.name, locale),
    description: pick(service.excerpt, locale),
  });
}

export default async function ServiceDetailPage({ params }) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const t = createTranslator(await getDictionary(locale));
  const details = getServiceDetails(slug);

  const name = pick(service.name, locale);
  const excerpt = pick(service.excerpt, locale);
  const image = heroImages[(service.order - 1) % heroImages.length];

  // --- Quick facts -----------------------------------------------------------
  const facts = [
    service.priceFrom && {
      icon: 'tag',
      label: t('services.startingFrom'),
      value: `${formatPrice(service.priceFrom, locale)}${service.recurring ? ` ${t('common.perMonth')}` : ''}`,
      note: t('common.vatNote'),
    },
    details.timeline && {
      icon: 'clock',
      label: t('services.timeline'),
      value: pick(details.timeline, locale),
    },
    service.idealFor && {
      icon: 'users',
      label: t('services.idealFor'),
      value: pick(service.idealFor, locale),
    },
  ].filter(Boolean);

  // --- Projects that used this service (work grid, results, quote) ---------
  const serviceProjects = projects.filter((p) => p.services?.includes(slug));

  const relatedProjects = serviceProjects.slice(0, 3).map((p) => ({
    slug: p.slug,
    href: path(locale, 'work', p.slug),
    title: pick(p.title, locale),
    excerpt: pick(p.excerpt, locale),
    image: p.image,
  }));

  // One headline number per project, so the band shows breadth, not one case.
  const results = serviceProjects
    .map((p) => p.metrics?.[0])
    .filter(Boolean)
    .slice(0, MAX_RESULTS)
    .map((m) => ({ value: m.value, label: pick(m.label, locale) }));

  const quote = testimonials.find((item) => serviceProjects.some((p) => p.slug === item.project));

  // --- FAQ: service-specific, falling back to the general list ---------------
  const faqSource = details.faq?.length ? details.faq : faq.slice(0, 4);
  const faqItems = faqSource.map((f) => ({
    question: pick(f.question, locale),
    answer: pick(f.answer, locale),
  }));

  const related = services
    .filter((s) => s.slug !== slug)
    .slice(0, 3)
    .map((s) => ({
      id: s.slug,
      icon: s.icon,
      name: pick(s.name, locale),
      excerpt: pick(s.excerpt, locale),
      href: path(locale, 'services', s.slug),
    }));

  const schema = [
    webPage({ locale, url: path(locale, 'services', slug), name, description: excerpt }),
    breadcrumb(locale, [
      { name: t('nav.services'), url: path(locale, 'services') },
      { name, url: path(locale, 'services', slug) },
    ]),
    serviceNode({
      name,
      description: pick(service.body, locale),
      url: path(locale, 'services', slug),
      priceFrom: service.priceFrom,
      recurring: Boolean(service.recurring),
    }),
    faqPage(faqItems),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero
        eyebrow={t('nav.services')}
        title={name}
        body={excerpt}
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
            { name, href: path(locale, 'services', slug) },
          ]}
        />
      </Hero>

      {/* Quick facts: price, timeline, who it's for */}
      {facts.length ? (
        <Section header={false} space={0.6}>
          <ServiceFacts items={facts} />
        </Section>
      ) : null}

      {/* What you get + what's included */}
      <Section header={false}>
        <ImageText
          title={t('services.whatYouGet')}
          headingLevel={2}
          body={pick(service.body, locale)}
          image={image}
          actions={[
            {
              label: t('common.getInTouch'),
              href: path(locale, 'contact'),
              variant: 'link',
              icon: <Icon name="arrowRight" size={18} />,
            },
          ]}
        />
      </Section>

      <Section background="alt" title={t('services.included')}>
        <IncludedGrid items={pick(service.features, locale)} />
      </Section>

      {/* Problems this service solves */}
      {details.problems?.length ? (
        <Section title={t('services.problemsTitle')} lead={t('services.problemsLead')} align="center">
          <ProblemSolution
            items={details.problems.map((item) => ({
              problem: pick(item.problem, locale),
              solution: pick(item.solution, locale),
            }))}
            labels={{ problem: t('services.problemLabel'), solution: t('services.solutionLabel') }}
          />
        </Section>
      ) : null}

      {/* Real numbers from projects that used this service */}
      {results.length >= 2 ? (
        <Section background="dark" title={t('services.resultsTitle')} align="center">
          <StatsBand items={results} />
        </Section>
      ) : null}

      {quote ? (
        <Section background="alt" header={false} space={0.85}>
          <Testimonials
            variant="single"
            items={[{ id: quote.id, quote: pick(quote.quote, locale), author: pick(quote.author, locale) }]}
          />
        </Section>
      ) : null}

      <Section title={t('services.processTitle')} align="center">
        <ProcessSteps
          items={processSteps.map((step) => ({
            step: step.step,
            name: pick(step.name, locale),
            description: pick(step.description, locale),
            duration: pick(step.duration, locale),
          }))}
        />
      </Section>

      {relatedProjects.length ? (
        <Section background="alt" title={t('home.workTitleShort')}>
          <WorkGrid items={relatedProjects} readMoreLabel={t('common.readMore')} featureFirst={false} />
        </Section>
      ) : null}

      <Section title={t('services.faqTitle')} width="narrow">
        <Prose>
          <Accordion
            items={faqItems.map((f) => ({ question: f.question, answer: <p>{f.answer}</p> }))}
            headingLevel={3}
          />
        </Prose>
      </Section>

      <Section background="alt" title={t('services.relatedTitle')}>
        <ServiceCards items={related} readMoreLabel={t('common.readMore')} fromLabel={t('common.from')} />
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
