import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/auth';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: ADMIN_COOKIE,
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
