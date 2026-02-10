import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { ALLOWED_EMAIL } from '@/domain/rules';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user.email === ALLOWED_EMAIL;
    },
  },
  pages: { signIn: '/login', error: '/login' },
};

export const authHandler = NextAuth(authOptions);
