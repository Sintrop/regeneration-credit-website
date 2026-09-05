import { NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';

// Routes that were renamed or removed, kept as redirects so old links and
// search results don't 404.
const REDIRECTS = {
  '/tutorials': '/faq',
};

export function middleware(request) {
  const { pathname } = request.nextUrl;

  for (const [from, to] of Object.entries(REDIRECTS)) {
    if (pathname === from || pathname === `/pt${from}` || pathname === `/en${from}`) {
      const target = pathname.startsWith('/pt') ? `/pt${to}` : to;
      return NextResponse.redirect(new URL(target, request.url), 308);
    }
  }

  return i18nRouter(request, i18nConfig);
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)'
};
