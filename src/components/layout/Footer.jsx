import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import CookieSettingsButton from '@/components/cookies/CookieSettingsButton';
import { siteConfig } from '@/config/site.config';
import { path } from '@/config/routes';
import { services } from '@/lib/content/services';
import { pick } from '@/lib/utils';
import styles from './Footer.module.scss';

const socialIcons = {
  linkedin: 'linkedin',
  facebook: 'facebook',
  instagram: 'instagram',
  github: 'github',
};

export default function Footer({ locale, t }) {
  const year = new Date().getFullYear();
  const a = siteConfig.address;

  const serviceLinks = services
    .slice(0, 6)
    .map((s) => ({ label: pick(s.name, locale), href: path(locale, 'services', s.slug) }));

  const companyLinks = [
    { label: t('nav.about'), href: path(locale, 'about') },
    { label: t('nav.work'), href: path(locale, 'work') },
    { label: t('nav.pricing'), href: path(locale, 'pricing') },
    { label: t('nav.blog'), href: path(locale, 'blog') },
    { label: t('nav.testimonials'), href: path(locale, 'testimonials') },
    { label: t('nav.faq'), href: path(locale, 'faq') },
  ];

  const legalLinks = [
    { label: t('cookies.policy'), href: path(locale, 'cookies') },
    { label: t('form.consentLink'), href: path(locale, 'privacy') },
    { label: t('a11y.statement'), href: path(locale, 'accessibility') },
  ];

  const socials = Object.entries(siteConfig.social).filter(([, url]) => Boolean(url));

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Link href={path(locale, 'home')} className={styles.brand} aria-label={t('nav.home')}>
            <Image
              src="/GJ-Web-Studio-H-2-White.svg"
              alt=""
              width={160}
              height={64}
              unoptimized
            />
          </Link>
          <p className={styles.tagline}>{t('footer.tagline')}</p>

          {socials.length ? (
            <ul className={styles.socials} aria-label={t('footer.socialLabel')}>
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    className={styles.social}
                    target="_blank"
                    rel="noopener noreferrer me"
                  >
                    <Icon name={socialIcons[key] ?? 'globe'} size={24} />
                    <span className="sr-only">
                      {key} ({t('common.opensInNewWindow')})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          {siteConfig.features.uptimeBadge ? (
            <p className={styles.status}>
              <span className={styles.statusDot} aria-hidden="true" />
              {t('footer.status')}
            </p>
          ) : null}
        </div>

        <nav className={styles.navCol} aria-labelledby="footer-services">
          <h2 id="footer-services" className={styles.colTitle}>
            {t('footer.servicesTitle')}
          </h2>
          <ul className={styles.list}>
            {serviceLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.navCol} aria-labelledby="footer-company">
          <h2 id="footer-company" className={styles.colTitle}>
            {t('footer.companyTitle')}
          </h2>
          <ul className={styles.list}>
            {companyLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.navCol}>
          <h2 className={styles.colTitle}>{t('footer.contactTitle')}</h2>
          <ul className={styles.list}>
            <li>
              <a href={`mailto:${siteConfig.email}`} className={styles.link}>
                <Icon name="mail" size={17} /> {siteConfig.email}
              </a>
            </li>
            <li>
              <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className={styles.link}>
                <Icon name="phone" size={17} /> {siteConfig.phoneDisplay}
              </a>
            </li>
          </ul>

          <address className={styles.address}>
            {a.street}
            <br />
            {a.postalCode} {a.locality}
            <br />
            {pick(a.countryName, locale)}
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {year} {siteConfig.legalName}. {t('footer.rights')}
            {siteConfig.registry?.companyCode ? (
              <>
                {' '}
                {t('footer.companyCode')}: {siteConfig.registry.companyCode}.
              </>
            ) : null}
            {siteConfig.registry?.vatCode ? (
              <>
                {' '}
                {t('footer.vatCode')}: {siteConfig.registry.vatCode}.
              </>
            ) : null}
          </p>

          <ul className={styles.legal} aria-label={t('footer.legalTitle')}>
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.legalLink}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton label={t('cookies.manage')} className={styles.legalLink} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
