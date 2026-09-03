import { jwtVerify } from 'jose';

export const ADMIN_COOKIE = 'bereke_admin_session';

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error('AUTH_SECRET is not set');
  return new TextEncoder().encode(secret);
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== 'admin' || typeof payload.email !== 'string') return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}
