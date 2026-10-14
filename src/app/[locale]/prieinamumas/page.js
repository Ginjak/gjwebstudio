import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatDate } from '@/lib/utils';
import { accessibilityStatement } from '@/lib/content/legal';

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
    routeKey: 'accessibility',
    title: t('a11y.statement'),
    description: pick(accessibilityStatement.sections[0].body, locale),
  });
}

export default async function AccessibilityPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  const title = t('a11y.statement');

  return (
    <>
      <JsonLd
        locale={locale}
        nodes={[
          webPage({ locale, url: path(locale, 'accessibility'), name: title }),
          breadcrumb(locale, [{ name: title, url: path(locale, 'accessibility') }]),
        ]}
      />

      <Hero
        title={title}
        body={pick(accessibilityStatement.sections[0].body, locale)}
        bullets={[accessibilityStatement.level]}
      >
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: title, href: path(locale, 'accessibility') }]}
        />
      </Hero>

      <Section header={false} width="narrow">
        <Prose>
          <p>
            <em>
              {t('common.updatedOn', { date: formatDate(accessibilityStatement.updated, locale) })}
            </em>
          </p>

          {accessibilityStatement.sections.map((section) => (
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
