// next-auth.d.ts

import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      // token: string;
      // accessToken: string;
      userType?: string;
      // firstName: string;
      // lastName: string;
      // email: string;
      // address: string;
      role:
        | 'superAdmin'
        | 'pnpAdmin'
        | 'eventAdmin'
        | 'eventUser'
        | 'operationHead'
        | 'eventHead'
        | 'financeExecutive'
        | 'financeManager'
        | 'financeHead'
        | 'csUser'
        | 'deliveryUser'
        | 'printExecutive'
        | 'operationHeadPrint'
        | 'businessHead'
        | 'printMng'
        | 'giftMng'
        | 'pnpHead'
        | 'poUser';
    } & DefaultSession['user'];
  }

  interface User {
    // token: string;
    role:
      | 'superAdmin'
      | 'pnpAdmin'
      | 'eventAdmin'
      | 'eventUser'
      | 'operationHead'
      | 'eventHead'
      | 'financeExecutive'
      | 'financeManager'
      | 'financeHead'
      | 'csUser'
      | 'deliveryUser'
      | 'printExecutive'
      | 'operationHeadPrint'
      | 'businessHead'
      | 'printMng'
      | 'giftMng'
      | 'pnpHead'
      | 'poUser';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?:
      | 'superAdmin'
      | 'pnpAdmin'
      | 'eventAdmin'
      | 'eventUser'
      | 'operationHead'
      | 'eventHead'
      | 'financeExecutive'
      | 'financeManager'
      | 'financeHead'
      | 'csUser'
      | 'deliveryUser'
      | 'printExecutive'
      | 'operationHeadPrint'
      | 'businessHead'
      | 'printMng'
      | 'giftMng'
      | 'pnpHead'
      | 'poUser';
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
// 'eventUser' ,'operationHead' ,'eventHead' ,'financeExecutive' ,'financeManager' ,'financeHead','giftMng' ,'pnpHead' ,'poUser'
