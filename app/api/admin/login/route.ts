import { NextResponse } from 'next/server';
import {
  createAdminSessionToken,
  sessionCookieOptions,
  verifyAdminCredentials,
} from '@/lib/auth';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    email?: string;
    password?: string;
  } | null;

  const email = body?.email?.trim() ?? '';
  const password = body?.password ?? '';

  if (!email || !password || !verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'Неверный email или пароль' }, { status: 401 });
  }

  const token = await createAdminSessionToken(email.toLowerCase());
  const response = NextResponse.json({ ok: true, email: email.toLowerCase() });
  const cookie = sessionCookieOptions(token);
  response.cookies.set(cookie);
  return response;
}
