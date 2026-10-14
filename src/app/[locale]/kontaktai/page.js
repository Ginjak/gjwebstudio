import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick } from '@/lib/utils';
import { siteConfig } from '@/config/site.config';

import { services } from '@/lib/content/services';
import { budgetOptions, faq } from '@/lib/content/site-content';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactForm from '@/components/sections/ContactForm';
import Accordion from '@/components/ui/Accordion';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, contactPage, faqPage } from '@/lib/schema/builders';

import styles from './contact.module.scss';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  const responseTime = pick(siteConfig.responseTime, locale);

  return buildMetadata({
    locale,
    routeKey: 'contact',
    title: t('contact.title'),
    description: t('contact.lead', { responseTime }),
  });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = createTranslator(dict);

  const responseTime = pick(siteConfig.responseTime, locale);
  const a = siteConfig.address;

  const serviceOptions = services.map((s) => ({
    value: s.slug,
    label: pick(s.name, locale),
  }));

  const budgets = budgetOptions.map((b) => ({ value: b.id, label: pick(b.label, locale) }));

  const generalFaq = faq
    .filter((f) => f.group === 'general')
    .map((f) => ({ question: pick(f.question, locale), answer: <p>{pick(f.answer, locale)}</p> }));

  const schema = [
    contactPage({
      locale,
      url: path(locale, 'contact'),
      name: t('contact.title'),
      description: t('contact.lead', { responseTime }),
    }),
    breadcrumb(locale, [{ name: t('nav.contact'), url: path(locale, 'contact') }]),
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
        eyebrow={t('nav.contact')}
        title={t('contact.title')}
        body={t('contact.lead', { responseTime })}
      >
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: t('nav.contact'), href: path(locale, 'contact') }]}
        />
      </Hero>

      <Section header={false}>
        <div className={styles.layout}>
          <div className={styles.formCol}>
            <h2 className={styles.colTitle}>{t('contact.formTitle')}</h2>
            <ContactForm
              labels={{ form: dict.form, audit: dict.audit }}
              locale={locale}
              privacyHref={path(locale, 'privacy')}
              responseTime={responseTime}
              serviceOptions={serviceOptions}
              budgetOptions={budgets}
            />
          </div>

          <aside className={styles.sideCol} aria-labelledby="contact-details-title">
            <h2 id="contact-details-title" className={styles.colTitle}>
              {t('contact.detailsTitle')}
            </h2>

            <ul className={styles.details}>
              <li>
                <Icon name="mail" size={20} className={styles.detailIcon} />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
              <li>
                <Icon name="phone" size={20} className={styles.detailIcon} />
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}>{siteConfig.phoneDisplay}</a>
              </li>
              <li>
                <Icon name="pin" size={20} className={styles.detailIcon} />
                <address className={styles.address}>
                  {a.street}
                  <br />
                  {a.postalCode} {a.locality}
                  <br />
                  {pick(a.countryName, locale)}
                </address>
              </li>
            </ul>

            {siteConfig.bookingUrl ? (
              <Button
                href={siteConfig.bookingUrl}
                label={t('common.bookCall')}
                variant="secondary"
                external
                newWindowLabel={t('common.opensInNewWindow')}
                full
              />
            ) : null}

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <Icon name="clock" size={18} /> {t('contact.responseTitle')}
              </h3>
              <p className={styles.infoText}>{t('contact.responseBody', { responseTime })}</p>
            </div>

            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>
                <Icon name="calendar" size={18} /> {t('contact.hoursTitle')}
              </h3>
              <ul className={styles.hours}>
                {siteConfig.openingHours.map((entry) => (
                  <li key={entry.opens}>
                    <span>
                      {entry.days[0]}–{entry.days[entry.days.length - 1]}
                    </span>
                    <span>
                      {entry.opens}–{entry.closes}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Section>

      <Section background="alt" title={t('faq.title')} width="narrow">
        <Accordion items={generalFaq} headingLevel={3} />
      </Section>
    </>
  );
}
