'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { SessionData, SessionPayload } from '@/types/types';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);
const domainUrl = process.env.APP_DOMAIN;

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS512' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<SessionData>(session, encodedKey, {
      algorithms: ['HS512'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session', error);
    return null;
  }
}

export async function createSession(
  userId: number,
  userName: string,
  userEmail: string,
  userProfileImg: string,
) {
  const cookiesStore = await cookies();
  // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 day expiry
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000); // 1 day expiry
  // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 1000); // 7 hr expiry
  const session = await encrypt({
    userId,
    userName,
    userEmail,
    userProfileImg,
    expiresAt,
  });

  cookiesStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    path: '/', // Ensures visibility across the app
    sameSite: 'lax',
    domain: domainUrl,
  });
}

export async function verifySession(): Promise<SessionData | null> {
  const cookiesStore = await cookies();
  const cookie = cookiesStore.get('session')?.value;
  const session = await decrypt(cookie);
  if (!session?.userId) {
    return null;
  }

  return {
    userId: session.userId,
    userName: session.userName,
    userEmail: session.userEmail,
    userProfileImg: session.userProfileImg,
  };
}

export async function deleteSession() {
  const cookiesStore = await cookies();
  cookiesStore.delete('session');
  cookiesStore.delete('communityId');
}
