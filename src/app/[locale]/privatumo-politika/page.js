import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatDate } from '@/lib/utils';
import { privacyPolicy } from '@/lib/content/legal';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Prose from '@/components/ui/Prose';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, webPage } from '@/lib/schema/builders';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'privacy',
    title: t('form.consentLink'),
    description: t('meta.defaultDescription'),
    noindex: false,
  });
}

export default async function PrivacyPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  const title = t('form.consentLink');

  return (
    <>
      <JsonLd
        locale={locale}
        nodes={[
          webPage({ locale, url: path(locale, 'privacy'), name: title }),
          breadcrumb(locale, [{ name: title, url: path(locale, 'privacy') }]),
        ]}
      />

      <Hero title={title}>
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: title, href: path(locale, 'privacy') }]}
        />
      </Hero>

      <Section header={false} width="narrow">
        <Prose>
          <p>
            <em>{t('common.updatedOn', { date: formatDate(privacyPolicy.updated, locale) })}</em>
          </p>

          {privacyPolicy.sections.map((section) => (
            <section key={section.title.lt}>
              <h2>{pick(section.title, locale)}</h2>
              {section.body ? <p>{pick(section.body, locale)}</p> : null}
              {section.list ? (
                <ul>
                  {pick(section.list, locale).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </Prose>
      </Section>
    </>
  );
}
