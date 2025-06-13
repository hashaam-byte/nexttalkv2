import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const viewport = request.headers.get('viewport-width') || '1024';
  const userAgent = request.headers.get('user-agent') || '';
  const isMobileDevice = /Mobile|Android|iPhone|iPad|iPod/i.test(userAgent);
  const isSmallScreen = parseInt(viewport) < 768;

  const deviceType = isMobileDevice || isSmallScreen ? 'mobile' : 'desktop';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-device-type', deviceType);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
