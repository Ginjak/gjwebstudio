import Link from 'next/link';
import { getDictionary, createTranslator } from '@/i18n/dictionaries';
import { defaultLocale, path } from '@/config/routes';

import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import styles from './not-found.module.scss';

/**
 * Localised 404.
 *
 * Next.js cannot pass params to not-found.js, so this falls back to the
 * default locale. Links point at the Lithuanian URLs, which is correct for
 * the primary audience.
 */
export default async function NotFound() {
  const locale = defaultLocale;
  const t = createTranslator(await getDictionary(locale));

  const suggestions = [
    { label: t('nav.services'), href: path(locale, 'services') },
    { label: t('nav.pricing'), href: path(locale, 'pricing') },
    { label: t('nav.work'), href: path(locale, 'work') },
    { label: t('nav.blog'), href: path(locale, 'blog') },
    { label: t('nav.contact'), href: path(locale, 'contact') },
  ];

  return (
    <Section header={false} space={1.3}>
      <div className={styles.wrap}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 className={styles.title}>{t('notFound.title')}</h1>
        <p className={styles.body}>{t('notFound.body')}</p>

        <Button href={path(locale, 'home')} label={t('common.goHome')} size="lg" />

        <nav className={styles.suggestions} aria-labelledby="suggestions-title">
          <h2 id="suggestions-title" className={styles.suggestionsTitle}>
            {t('notFound.suggestions')}
          </h2>
          <ul>
            {suggestions.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Section>
  );
}
