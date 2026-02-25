import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import isEqual from 'lodash/isEqual';
import { pagesOptions } from './pages-options';

export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // return user as JWT
        // token.user = user;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role!;
        session.user.id = token.id as string;
      }
      return session;
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: token.idToken as string,
      //   },
      // };
    },

    async redirect({ url, baseUrl }) {
      // const parsedUrl = new URL(url, baseUrl);
      // if (parsedUrl.searchParams.has('callbackUrl')) {
      //   return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
      // }
      // if (parsedUrl.origin === baseUrl) {
      //   return url;
      // }
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid
        const { email, password } = credentials as any;
        // const user = {
        //   email: 'admin@admin.com',
        //   password: 'admin',
        // };

        // if (
        //   isEqual(user, {
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   })
        // ) {
        //   return user as any;
        // }
        if (email === 'super@admin.com' && password === 'admin') {
          return {
            id: '1',
            name: 'Super Admin',
            email,
            role: 'superAdmin',
          };
        }

        if (email === 'pnp@admin.com' && password === 'admin') {
          return {
            id: '2',
            name: 'PNP Admin',
            email,
            role: 'pnpAdmin',
          };
        }
        if (email === 'event@admin.com' && password === 'admin') {
          return {
            id: '3',
            name: 'Event Admin',
            email,
            role: 'eventAdmin',
          };
        }
        if (email === 'event@user.com' && password === 'admin') {
          return {
            id: '4',
            name: 'Event User',
            email,
            role: 'eventUser',
          };
        }
        if (email === 'operation@user.com' && password === 'admin') {
          return {
            id: '5',
            name: 'Operational Head',
            email,
            role: 'operationHead',
          };
        }
        if (email === 'eventhead@user.com' && password === 'admin') {
          return {
            id: '6',
            name: 'Event Head',
            email,
            role: 'eventHead',
          };
        }
        if (email === 'financeExecutive@finance.com' && password === 'admin') {
          return {
            id: '7',
            name: 'Finance Executive',
            email,
            role: 'financeExecutive',
          };
        }
        if (email === 'financeManager@finance.com' && password === 'admin') {
          return {
            id: '8',
            name: 'Finance Manager',
            email,
            role: 'financeManager',
          };
        }
        if (email === 'financeHead@finance.com' && password === 'admin') {
          return {
            id: '9',
            name: 'Finance Head',
            email,
            role: 'financeHead',
          };
        }

        return null;
        // return null;
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID || '',
      clientSecret: env.GOOGLE_CLIENT_SECRET || '',
      allowDangerousEmailAccountLinking: true,
    }),
  ],
};
