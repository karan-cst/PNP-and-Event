import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/env.mjs';
import { pagesOptions } from './pages-options';
import axios from 'axios';

export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hrs
  },
  callbacks: {
    async jwt({ token, user }) {
      // First login
      if (user) {
        token.role = user.role;
        token.id = user.id;
        // token.user = user;
        // token.accessToken = user.token;
      }

      return token;
    },
    async session({ session, token }) {
      console.log('enter in session', session, token);
      if (token) {
        session.user.role = token.role!;
        session.user.id = token.id as string;
        // session.user = token.user as any;
        // session.accessToken = token.accessToken as string;

        // session.user.role = token.role!;
        // session.user.id = token.id as string;
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {},
      async authorize(credentials: any) {
        //   try {
        const { email, password } = credentials as any;
        //     const result = await axios.post(
        //       'http://localhost:9003/api/auth/login',
        //       { email, password }
        //     );
        //     if (result.data.success) {
        //       return {
        //         ...result.data.data,
        //         token: result.data.token,
        //       };
        //     } else {
        //       console.log('/*/*/*/*/*/*/*/*/*', result.data.message);
        //     }

        //     return null;
        //   } catch (error) {
        //     console.log('error**********', error);

        //     return null;
        //   }
        // },

        if (email === 'super@oneadvt.com' && password === 'admin') {
          return {
            id: '1',
            name: 'Super Admin',
            email,
            role: 'superAdmin',
          };
        }
        if (email === 'pnp@oneadvt.com' && password === 'admin') {
          return {
            id: '2',
            name: 'PNP Admin',
            email,
            role: 'pnpAdmin',
          };
        }
        if (email === 'event@oneadvt.com' && password === 'admin') {
          return {
            id: '3',
            name: 'Event Admin',
            email,
            role: 'eventAdmin',
          };
        }
        if (email === 'eventuser@oneadvt.com' && password === 'admin') {
          return {
            id: '4',
            name: 'Event User',
            email,
            role: 'eventUser',
          };
        }
        if (email === 'operation@oneadvt.com' && password === 'admin') {
          return {
            id: '5',
            name: 'Operational Head',
            email,
            role: 'operationHead',
          };
        }
        if (email === 'eventhead@oneadvt.com' && password === 'admin') {
          return {
            id: '6',
            name: 'Event Head',
            email,
            role: 'eventHead',
          };
        }
        if (email === 'financeExecutive@oneadvt.com' && password === 'admin') {
          return {
            id: '7',
            name: 'Finance Executive',
            email,
            role: 'financeExecutive',
          };
        }
        if (email === 'financeManager@oneadvt.com' && password === 'admin') {
          return {
            id: '8',
            name: 'Finance Manager',
            email,
            role: 'financeManager',
          };
        }
        if (email === 'financeHead@oneadvt.com' && password === 'admin') {
          return {
            id: '9',
            name: 'Finance Head',
            email,
            role: 'financeHead',
          };
        }
        if (email === 'cs@oneadvt.com' && password === 'admin') {
          return {
            id: '9',
            name: 'CS User',
            email,
            role: 'csUser',
          };
        }
        if (email === 'printexecutive@oneadvt.com' && password === 'admin') {
          return {
            id: '10',
            name: 'Print Executive',
            email,
            role: 'printExecutive',
          };
        }
        if (email === 'operationHead@oneadvt.com' && password === 'admin') {
          return {
            id: '11',
            name: 'Operation Head',
            email,
            role: 'operationHeadPrint',
          };
        }
        if (email === 'businessHead@oneadvt.com' && password === 'admin') {
          return {
            id: '12',
            name: 'Business Head',
            email,
            role: 'businessHead',
          };
        }
        if (email === 'printMng@oneadvt.com' && password === 'admin') {
          return {
            id: '13',
            name: 'Print Manager',
            email,
            role: 'printMng',
          };
        }
        if (email === 'giftMng@oneadvt.com' && password === 'admin') {
          return {
            id: '14',
            name: 'Gift Manager',
            email,
            role: 'giftMng',
          };
        }
        if (email === 'delivery@oneadvt.com' && password === 'admin') {
          return {
            id: '15',
            name: 'Delivery User',
            email,
            role: 'deliveryUser',
          };
        }
        if (email === 'pnpHead@oneadvt.com' && password === 'admin') {
          return {
            id: '16',
            name: 'PNP HEAD',
            email,
            role: 'pnpHead',
          };
        }
        if (email === 'po@oneadvt.com' && password === 'admin') {
          return {
            id: '16',
            name: 'PO User',
            email,
            role: 'poUser',
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
