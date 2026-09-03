import { NextResponse, type NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifyAdminSessionToken } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const isLoginPage = pathname === '/admin/login';
  const isLoginApi = pathname === '/api/admin/login';
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (isLoginApi) {
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const session = token ? await verifyAdminSessionToken(token) : null;

  if (isLoginPage) {
    if (session) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  if (!session) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|favicon-.*\\.png|apple-touch-icon\\.png|icon-.*\\.png|og-logo\\.jpg|manifest\\.webmanifest|uploads|images|videos|documents|logo).*)',
  ],
};
