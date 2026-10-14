import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick } from '@/lib/utils';
import { siteConfig } from '@/config/site.config';

import { auditChecks } from '@/lib/content/site-content';
import { auditReport } from '@/lib/content/images';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactForm from '@/components/sections/ContactForm';
import Media from '@/components/ui/Media';
import Icon from '@/components/ui/Icon';
import Reveal from '@/components/ui/Reveal';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, service as serviceNode, webPage } from '@/lib/schema/builders';

import styles from './audit.module.scss';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'audit',
    title: t('audit.title'),
    description: t('audit.lead'),
  });
}

export default async function AuditPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);
  const responseTime = pick(siteConfig.responseTime, locale);

  const schema = [
    webPage({ locale, url: path(locale, 'audit'), name: t('audit.title'), description: t('audit.lead') }),
    breadcrumb(locale, [{ name: t('nav.audit'), url: path(locale, 'audit') }]),
    serviceNode({
      name: t('audit.title'),
      description: t('audit.lead'),
      url: path(locale, 'audit'),
      priceFrom: 0,
    }),
  ];

  return (
    <>
      <JsonLd locale={locale} nodes={schema} />

      <Hero
        eyebrow={t('nav.audit')}
        title={t('audit.title')}
        body={t('audit.lead')}
        image={auditReport}
      >
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.audit'), href: path(locale, 'audit') }]}
        />
      </Hero>

      <Section header={false}>
        <div className={styles.layout}>
          <div>
            <h2 className={styles.title}>{t('audit.whatTitle')}</h2>
            <ul className={styles.checks}>
              {auditChecks.map((check, i) => (
                <li key={check.name.lt}>
                  <Reveal animation="fade-up" delay={i * 60} className={styles.check}>
                    <span className={styles.checkIcon} aria-hidden="true">
                      <Icon name="check" size={18} strokeWidth={2.4} />
                    </span>
                    <div>
                      <h3 className={styles.checkTitle}>{pick(check.name, locale)}</h3>
                      <p className={styles.checkText}>{pick(check.description, locale)}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.formCard}>
            <h2 className={styles.title}>{t('audit.formTitle')}</h2>
            <ContactForm
              labels={{ form: dict.form, audit: dict.audit }}
              locale={locale}
              variant="audit"
              privacyHref={path(locale, 'privacy')}
              responseTime={responseTime}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
