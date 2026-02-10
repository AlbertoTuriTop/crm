import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { ALLOWED_EMAIL } from '@/domain/rules';

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const providers =
  googleClientId && googleClientSecret
    ? [
        GoogleProvider({
          clientId: googleClientId,
          clientSecret: googleClientSecret,
        }),
      ]
    : [];

if (providers.length === 0) {
  console.warn(
    '[auth] Google OAuth no está configurado (GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET).',
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET ?? 'dev-insecure-secret-change-me',
  callbacks: {
    async signIn({ user }) {
      return user.email === ALLOWED_EMAIL;
    },
  },
  pages: { signIn: '/login', error: '/login' },
};

export const authHandler = NextAuth(authOptions);
