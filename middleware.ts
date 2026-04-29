import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('site-auth')?.value
  if (auth === '1') {
    return NextResponse.next()
  }
  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('from', request.nextUrl.pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!login|api/login|_next/static|_next/image|favicon.ico).*)'],
}
