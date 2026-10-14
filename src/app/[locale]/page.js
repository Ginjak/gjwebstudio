import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatDateShort } from '@/lib/utils';

import { services } from '@/lib/content/services';
import { projects, projectCategoryBadges } from '@/lib/content/projects';
import { sortedPosts, postCategories } from '@/lib/content/posts';
import { plans } from '@/lib/content/pricing';
import { stats, testimonials, techStack, processSteps } from '@/lib/content/site-content';
import { aboutDesk } from '@/lib/content/images';

import Hero from '@/components/sections/Hero';
import LogoStrip from '@/components/sections/LogoStrip';
import ServicesAccordion from '@/components/sections/ServicesAccordion';
import WorkGrid from '@/components/sections/WorkGrid';
import ImageText from '@/components/sections/ImageText';
import StatsBand from '@/components/sections/StatsBand';
import ProcessSteps from '@/components/sections/ProcessSteps';
import Testimonials from '@/components/sections/Testimonials';
import PricingTable from '@/components/sections/PricingTable';
import BlogTeaser from '@/components/sections/BlogTeaser';
import CTABanner from '@/components/sections/CTABanner';
import ShapesSeparator from '@/components/sections/ShapesSeparator';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, itemList, offerCatalog, webPage } from '@/lib/schema/builders';

/** How many services the home switcher shows; the rest are one click away. */
const HOME_SERVICES = 8;
/** One featured project plus a row of three. */
const HOME_PROJECTS = 4;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));

  return buildMetadata({
    locale,
    routeKey: 'home',
    title: t('meta.defaultTitle'),
    description: t('meta.defaultDescription'),
    keywords:
      locale === 'lt'
        ? [
            'svetainių kūrimas',
            'interneto svetainių kūrimas',
            'el. parduotuvės kūrimas',
            'svetainių priežiūra',
            'SEO paslaugos',
            'Google verslo profilis',
          ]
        : [
            'bespoke website design',
            'freelance web developer',
            'WordPress developer',
            'Shopify developer',
            'Next.js developer',
            'website maintenance packages',
          ],
  });
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);

  const serviceItems = services.slice(0, HOME_SERVICES).map((service) => ({
    id: service.slug,
    name: pick(service.name, locale),
    excerpt: pick(service.excerpt, locale),
    href: path(locale, 'services', service.slug),
    allLabel: t('common.viewServices'),
  }));

  const workItems = projects.slice(0, HOME_PROJECTS).map((project) => ({
    slug: project.slug,
    badges: projectCategoryBadges(project, locale),
    href: path(locale, 'work', project.slug),
    title: pick(project.title, locale),
    excerpt: pick(project.excerpt, locale),
    image: project.image,
    tags: project.categories.map((id) => pick(project.client, locale)).slice(0, 1),
    metric: project.metrics?.[0]
      ? { value: project.metrics[0].value, label: pick(project.metrics[0].label, locale) }
      : undefined,
  }));

  const postItems = sortedPosts()
    .slice(0, 3)
    .map((post) => ({
      slug: post.slug,
      href: path(locale, 'blog', post.slug),
      title: pick(post.title, locale),
      excerpt: pick(post.excerpt, locale),
      image: post.image,
      date: formatDateShort(post.date, locale),
      dateISO: post.date,
      readingTime: t('common.minRead', { minutes: post.readingTime }),
      category: pick(postCategories.find((c) => c.id === post.category)?.name, locale),
    }));

  const planItems = plans.map((plan) => ({
    id: plan.id,
    name: pick(plan.name, locale),
    tagline: pick(plan.tagline, locale),
    bestFor: pick(plan.bestFor, locale),
    features: pick(plan.features, locale).slice(0, 4),
    monthly: plan.monthly,
    annual: plan.annual,
    featured: plan.featured,
    custom: plan.custom,
    ctaHref: path(locale, 'pricing'),
  }));

  const schema = [
    webPage({
      locale,
      url: path(locale, 'home'),
      name: t('meta.defaultTitle'),
      description: t('meta.defaultDescription'),
    }),
    breadcrumb(locale, []),
    itemList({
      name: t('services.title'),
      items: services.map((service) => ({
        name: pick(service.name, locale),
        url: path(locale, 'services', service.slug),
      })),
    }),
    offerCatalog({
      name: t('pricing.title'),
      url: path(locale, 'pricing'),
      offers: plans.map((plan) => ({
        name: pick(plan.name, locale),
        description: pick(plan.tagline, locale),
        price: plan.monthly,
        url: path(locale, 'pricing'),
        recurring: true,
      })),
    }),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero
        variant="home"
        eyebrow={t('home.heroEyebrow')}
        title={t('home.heroTitle')}
        body={t('home.heroBody')}
        actions={[
          { label: t('common.getQuote'), href: path(locale, 'contact'), variant: 'primary' },
          { label: t('common.viewPricing'), href: path(locale, 'pricing'), variant: 'secondary' },
        ]}
        bullets={
          locale === 'lt'
            ? ['Individualus dizainas, ne šablonas', 'Priežiūra nuo 39 €/mėn.', 'Atsakymas per 1 darbo dieną']
            : ['Custom design, never a template', 'Care plans from €39/mo', 'Reply within 1 business day']
        }
      />

      <Section background="alt" space={0.55} header={false}>
        <LogoStrip
          title={t('home.logosTitle')}
          items={techStack}
        />
      </Section>

      <Section
        id="services"
        eyebrow={t('home.servicesEyebrow')}
        title={t('home.servicesTitle')}
        lead={t('home.servicesLead')}
        wideHeader
        actions={
          <Button
            href={path(locale, 'services')}
            label={t('common.viewServices')}
            variant="secondary"
          />
        }
      >
        <ServicesAccordion items={serviceItems} ctaLabel={t('common.learnMore')} />
      </Section>

      <Section
        id="work"
        background="alt"
        eyebrow={t('home.workEyebrow')}
        title={t('home.workTitle')}
        lead={t('home.workLead')}
        wideHeader
        actions={
          <Button href={path(locale, 'work')} label={t('common.viewAllWork')} variant="secondary" />
        }
      >
        <WorkGrid items={workItems} readMoreLabel={t('common.readMore')} />
      </Section>

      <Section id="about">
        <ImageText
          eyebrow={t('home.aboutEyebrow')}
          title={t('home.aboutTitle')}
          body={t('home.aboutBody')}
          image={aboutDesk}
          bullets={
            locale === 'lt'
              ? [
                  'Tiesioginis kontaktas su kūrėju',
                  'Fiksuota kaina ir aiškūs terminai',
                  'WordPress, Next.js ar Shopify — pagal jūsų poreikius',
                  'Svetainė ir prieigos priklauso jums',
                ]
              : [
                  'Direct contact with the developer',
                  'Fixed price and clear deadlines',
                  'WordPress, Next.js or Shopify — whichever fits your business',
                  'The site and all credentials are yours',
                ]
          }
          actions={[
            { label: t('nav.about'), href: path(locale, 'about'), variant: 'secondary' },
            {
              label: t('common.bookCall'),
              href: path(locale, 'contact'),
              variant: 'link',
              icon: <Icon name="arrowRight" size={18} />,
            },
          ]}
        />
      </Section>

      <Section background="dark" title={t('home.statsTitle')} align="center">
        <StatsBand
          items={stats.map((stat) => ({ value: stat.value, label: pick(stat.label, locale) }))}
        />
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

      <Section background="accent" header={false} space={0.85}>
        <Testimonials
          variant="single"
          items={[
            {
              id: testimonials[0].id,
              quote: pick(testimonials[0].quote, locale),
              author: pick(testimonials[0].author, locale),
            },
          ]}
        />
      </Section>

      <Section
        id="pricing"
        eyebrow={t('home.pricingEyebrow')}
        title={t('home.pricingTitle')}
        lead={t('home.pricingBody')}
        align="center"
      >
        <PricingTable
          plans={planItems}
          locale={locale}
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
          }}
        />
      </Section>

      <Section
        background="alt"
        eyebrow={t('home.blogEyebrow')}
        title={t('home.blogTitle')}
        actions={
          <Button href={path(locale, 'blog')} label={t('common.viewAllPosts')} variant="secondary" />
        }
      >
        <BlogTeaser items={postItems} readMoreLabel={t('common.readMore')} featureFirst={false} />
      </Section>

      <Section header={false} space={0.4}>
        <ShapesSeparator />
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
