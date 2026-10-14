import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { siteConfig } from '@/config/site.config';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick } from '@/lib/utils';

import {
  values,
  processSteps,
  stats,
  techStack,
  testimonials,
  aboutStory,
  whyMe,
} from '@/lib/content/site-content';
import { authorPortrait } from '@/lib/content/images';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import AboutIntro from '@/components/sections/AboutIntro';
import WhyMe from '@/components/sections/WhyMe';
import Testimonials from '@/components/sections/Testimonials';
import ProcessSteps from '@/components/sections/ProcessSteps';
import StatsBand from '@/components/sections/StatsBand';
import CTABanner from '@/components/sections/CTABanner';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, webPage, howTo } from '@/lib/schema/builders';

import styles from './about.module.scss';

/** The testimonial that best backs up "one specialist vs. an agency". */
const FEATURED_TESTIMONIAL = 't2';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'about',
    title: t('about.title'),
    description: t('about.lead'),
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  const owner = siteConfig.owner;
  const quote = testimonials.find((item) => item.id === FEATURED_TESTIMONIAL) ?? testimonials[0];

  const schema = [
    webPage({ locale, url: path(locale, 'about'), name: t('about.title'), description: t('about.lead') }),
    breadcrumb(locale, [{ name: t('nav.about'), url: path(locale, 'about') }]),
    howTo({
      name: t('about.processTitle'),
      steps: processSteps.map((s) => ({
        name: pick(s.name, locale),
        text: pick(s.description, locale),
      })),
    }),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero
        eyebrow={t('nav.about')}
        title={t('about.title')}
        body={t('about.lead')}
        actions={[{ label: t('common.getInTouch'), href: path(locale, 'contact'), variant: 'primary' }]}
      >
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.about'), href: path(locale, 'about') }]}
        />
      </Hero>

      {/* Who I am — portrait, story, tools */}
      <Section header={false}>
        <AboutIntro
          image={authorPortrait}
          eyebrow={t('about.introEyebrow')}
          title={t('about.introTitle', { name: owner.name })}
          name={owner.name}
          jobTitle={pick(owner.jobTitle, locale)}
          paragraphs={pick(aboutStory, locale)}
          toolsTitle={t('about.toolsTitle')}
          tools={techStack}
        />
      </Section>

      <Section background="dark" header={false}>
        <StatsBand items={stats.map((s) => ({ value: s.value, label: pick(s.label, locale) }))} />
      </Section>

      {/* Why me — one specialist vs. an agency (answers the hero's promise) */}
      <Section title={t('about.whyTitle')} lead={t('about.whyLead')} align="center">
        <WhyMe
          items={whyMe.map((item) => ({
            id: item.id,
            icon: item.icon,
            topic: pick(item.topic, locale),
            me: pick(item.me, locale),
            agency: pick(item.agency, locale),
          }))}
          labels={{
            me: t('about.whyMeLabel'),
            agency: t('about.whyAgencyLabel'),
            note: t('about.whyNote'),
          }}
        />
      </Section>

      <Section background="alt" header={false} space={0.85}>
        <Testimonials
          variant="single"
          items={[{ id: quote.id, quote: pick(quote.quote, locale), author: pick(quote.author, locale) }]}
        />
      </Section>

      <Section title={t('about.valuesTitle')} align="center">
        <ul className={styles.values}>
          {values.map((value, i) => (
            <li key={value.id}>
              <Reveal animation="fade-up" delay={i * 70}>
                <Card padding="lg" className={styles.valueCard}>
                  <span className={styles.valueIcon} aria-hidden="true">
                    <Icon name={value.icon} size={24} />
                  </span>
                  <h3 className={styles.valueTitle}>{pick(value.name, locale)}</h3>
                  <p className={styles.valueText}>{pick(value.description, locale)}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section background="alt" title={t('about.processTitle')} align="center">
        <ProcessSteps
          items={processSteps.map((step) => ({
            step: step.step,
            name: pick(step.name, locale),
            description: pick(step.description, locale),
            duration: pick(step.duration, locale),
          }))}
        />
      </Section>

      <Section header={false} space={0.85}>
        <CTABanner
          title={t('home.ctaTitle')}
          body={t('home.ctaBody')}
          actions={[
            { label: t('common.getInTouch'), href: path(locale, 'contact'), variant: 'primary' },
            { label: t('common.viewAllWork'), href: path(locale, 'work'), variant: 'ghost' },
          ]}
        />
      </Section>
    </>
  );
}
