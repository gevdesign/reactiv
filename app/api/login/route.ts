import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { password } = await request.json()
  if (password !== process.env.SITE_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const response = NextResponse.json({ ok: true })
  response.cookies.set('site-auth', process.env.SITE_PASSWORD!, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })
  return response
}
