// next-auth.d.ts

import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'superAdmin' | 'pnpAdmin' | 'eventAdmin' | 'eventUser';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'superAdmin' | 'pnpAdmin' | 'eventAdmin' | 'eventUser';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: 'superAdmin' | 'pnpAdmin' | 'eventAdmin' | 'eventUser';
    id?: string;
  }
}

// import { DefaultSession } from 'next-auth';
// import 'next-auth/jwt';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       // currentTeamId: string | null;
//     } & DefaultSession['user'];
//   }
// }

// declare module 'next-auth/jwt' {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     /** OpenID ID Token */
//     idToken?: string;
//   }
// }
