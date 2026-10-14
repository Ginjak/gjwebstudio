import { NextResponse } from 'next/server';
import { locales, defaultLocale, enToLt } from './config/routes';

const LOCALE_COOKIE = 'NEXT_LOCALE';

/**
 * Rewrites public URLs onto the internal (Lithuanian-slug) file routes.
 *
 *   /kainos              ->  /lt/kainos
 *   /en/pricing          ->  /en/kainos
 *   /en/work/some-case   ->  /en/darbai/some-case
 *
 * Nothing is redirected, so the URL the visitor sees never changes.
 */
export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  const segments = pathname.split('/').filter(Boolean);
  const maybeLocale = segments[0];
  const hasLocale = locales.includes(maybeLocale);

  const locale = hasLocale ? maybeLocale : defaultLocale;
  const rest = hasLocale ? segments.slice(1) : segments;

  // Translate the first segment back to its Lithuanian equivalent.
  if (locale !== defaultLocale && rest.length > 0 && enToLt[rest[0]]) {
    rest[0] = enToLt[rest[0]];
  }

  // The default locale must never be visible in the URL.
  if (maybeLocale === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = '/' + rest.join('/');
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = '/' + [locale, ...rest].join('/');

  const response = NextResponse.rewrite(url);
  response.headers.set('x-pathname', pathname + search);
  response.headers.set('x-locale', locale);

  if (request.cookies.get(LOCALE_COOKIE)?.value !== locale) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  /*
   * Skip Next internals, the API and anything that looks like a file.
   *
   * The trailing slashes matter: `api` alone would also exclude `/apie`,
   * and `_next` alone would exclude any future route starting with those
   * letters. Always anchor these exclusions to a path separator.
   */
  matcher: ['/((?!api/|_next/|_vercel/|.*\\..*).*)'],
};
