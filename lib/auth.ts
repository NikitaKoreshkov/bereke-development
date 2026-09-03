import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { timingSafeEqual } from 'crypto';
import { ADMIN_COOKIE, verifyAdminSessionToken } from '@/lib/auth-edge';

export { ADMIN_COOKIE, verifyAdminSessionToken };

const SESSION_TTL = '7d';

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set');
  return new TextEncoder().encode(secret);
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function verifyAdminCredentials(email: string, password: string) {
  const expectedEmail = process.env.ADMIN_EMAIL ?? '';
  const expectedPassword = process.env.ADMIN_PASSWORD ?? '';
  return (
    safeEqual(email.trim().toLowerCase(), expectedEmail.trim().toLowerCase()) &&
    safeEqual(password, expectedPassword)
  );
}

export async function createAdminSessionToken(email: string) {
  return new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(SESSION_TTL)
    .sign(getSecret());
}

export async function getAdminSession() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  return verifyAdminSessionToken(token);
}

export function sessionCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  };
}
