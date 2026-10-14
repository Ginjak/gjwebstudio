import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { path } from '@/config/routes';
import { buildMetadata } from '@/lib/seo/metadata';
import { pick, formatDate } from '@/lib/utils';
import { cookiePolicy } from '@/lib/content/legal';

import Hero from '@/components/sections/Hero';
import Section from '@/components/ui/Section';
import Prose from '@/components/ui/Prose';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CookieSettingsButton from '@/components/cookies/CookieSettingsButton';

import JsonLd from '@/lib/schema/JsonLd';
import { breadcrumb, webPage } from '@/lib/schema/builders';

import styles from './cookies.module.scss';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  return buildMetadata({
    locale,
    routeKey: 'cookies',
    title: t('cookies.policy'),
    description: t('cookies.body'),
  });
}

export default async function CookiePolicyPage({ params }) {
  const { locale } = await params;
  const t = createTranslator(await getDictionary(locale));
  const title = t('cookies.policy');

  return (
    <>
      <JsonLd
        locale={locale}
        nodes={[
          webPage({ locale, url: path(locale, 'cookies'), name: title }),
          breadcrumb(locale, [{ name: title, url: path(locale, 'cookies') }]),
        ]}
      />

      <Hero title={title} body={pick(cookiePolicy.intro, locale)}>
        <Breadcrumbs
          label={t('nav.breadcrumbLabel')}
          homeLabel={t('nav.home')}
          homeHref={path(locale, 'home')}
          items={[{ name: title, href: path(locale, 'cookies') }]}
        />
      </Hero>

      <Section header={false} width="narrow">
        <Prose>
          <p>
            <em>{t('common.updatedOn', { date: formatDate(cookiePolicy.updated, locale) })}</em>
          </p>

          <div className={styles.scroller} tabIndex={0} role="region" aria-label={title}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col">Slapukas</th>
                  <th scope="col">{t('common.category')}</th>
                  <th scope="col">{t('cookies.title')}</th>
                  <th scope="col">{t('common.page')}</th>
                </tr>
              </thead>
              <tbody>
                {cookiePolicy.table.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <code>{row.name}</code>
                    </td>
                    <td>{pick(row.category, locale)}</td>
                    <td>{pick(row.purpose, locale)}</td>
                    <td>{pick(row.duration, locale)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className={styles.manageRow}>
            <CookieSettingsButton label={t('cookies.manage')} className={styles.manageButton} />
          </p>
        </Prose>
      </Section>
    </>
  );
}
