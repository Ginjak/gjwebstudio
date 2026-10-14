import { path } from '@/config/routes';
import { formatPrice, pick } from '@/lib/utils';
import { services } from './services';
import { projects } from './projects';
import { postCategories, sortedPosts } from './posts';

/**
 * ---------------------------------------------------------------------------
 * MAIN NAVIGATION
 * ---------------------------------------------------------------------------
 * Built on the server so the header (a Client Component) only receives the
 * few strings and images it shows, not the full content modules.
 *
 * An item with `mega` opens a mega menu on desktop and an accordion in the
 * mobile menu. Shape:
 *
 *   mega: {
 *     kind: 'services' | 'cards' | 'links',
 *     title, text,                 intro column
 *     all: { label, href },        "see everything" link
 *     items: [{ href, label, meta, icon?, image? }],
 *     promo?: { title, text, label, href },
 *   }
 * ---------------------------------------------------------------------------
 */
export function buildNavItems(locale, t) {
  const servicesMega = {
    kind: 'services',
    title: t('nav.services'),
    text: t('services.lead'),
    all: { label: t('mega.allServices'), href: path(locale, 'services') },
    items: [...services]
      .sort((a, b) => a.order - b.order)
      .map((s) => ({
        href: path(locale, 'services', s.slug),
        label: pick(s.name, locale),
        icon: s.icon,
        meta: s.priceFrom
          ? [t('common.from'), formatPrice(s.priceFrom, locale), s.recurring ? t('common.perMonth') : '']
              .filter(Boolean)
              .join(' ')
          : undefined,
      })),
    promo: {
      title: t('audit.title'),
      text: t('mega.auditText'),
      label: t('audit.submit'),
      href: path(locale, 'audit'),
    },
  };

  const workMega = {
    kind: 'cards',
    title: t('mega.latestWork'),
    text: t('work.lead'),
    all: { label: t('common.viewAllWork'), href: path(locale, 'work') },
    items: [...projects]
      .sort((a, b) => b.year - a.year)
      .slice(0, 3)
      .map((p) => ({
        href: path(locale, 'work', p.slug),
        label: pick(p.title, locale),
        meta: `${pick(p.client, locale)} · ${p.year}`,
        image: p.image,
      })),
  };

  const blogMega = {
    kind: 'cards',
    title: t('mega.latestPosts'),
    text: t('blog.lead'),
    all: { label: t('common.viewAllPosts'), href: path(locale, 'blog') },
    items: sortedPosts()
      .slice(0, 3)
      .map((p) => ({
        href: path(locale, 'blog', p.slug),
        label: pick(p.title, locale),
        meta: [
          pick(postCategories.find((c) => c.id === p.category)?.name, locale),
          t('common.minRead', { minutes: p.readingTime }),
        ]
          .filter(Boolean)
          .join(' · '),
        image: p.image,
      })),
  };

  const aboutMega = {
    kind: 'links',
    title: t('nav.about'),
    text: t('about.lead'),
    items: [
      {
        href: path(locale, 'about'),
        label: t('mega.aboutMe'),
        meta: t('mega.aboutMeText'),
        icon: 'users',
      },
      {
        href: path(locale, 'testimonials'),
        label: t('nav.testimonials'),
        meta: t('mega.testimonialsText'),
        icon: 'star',
      },
      {
        href: path(locale, 'faq'),
        label: t('nav.faq'),
        meta: t('mega.faqText'),
        icon: 'quote',
      },
    ],
  };

  return [
    { label: t('nav.services'), href: path(locale, 'services'), mega: servicesMega },
    { label: t('nav.work'), href: path(locale, 'work'), mega: workMega },
    { label: t('nav.pricing'), href: path(locale, 'pricing') },
    { label: t('nav.about'), href: path(locale, 'about'), mega: aboutMega },
    { label: t('nav.blog'), href: path(locale, 'blog'), mega: blogMega },
    { label: t('nav.contact'), href: path(locale, 'contact') },
  ];
}
