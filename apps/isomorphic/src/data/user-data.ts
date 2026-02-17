import { USERTYPE } from '@/config/constants';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  userType: keyof typeof USERTYPE; //TODO Define ROLES type
  createdAt: Date;
  isActive: boolean;
  address: string;
  // permissions: keyof typeof PERMISSIONS;
  // status: keyof typeof STATUSES;
};

export const PERMISSIONS = {
  Read: 'Read',
  Write: 'Write',
  Delete: 'Delete',
} as const;

export const STATUSES = {
  Pending: 'Pending',
  Active: 'Active',
  Deactivated: 'Deactivated',
} as const;

export const userData = [
  {
    id: 'U001',
    firstName: 'Bessie',
    lastName: 'Beatty',
    email: 'christophe78@gmail.com',
    userType: USERTYPE.EventTeam,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
    isActive: false,
  },
  {
    id: 'U002',
    firstName: 'Joshua',
    lastName: 'Green',
    email: 'ayla_schuster28@yahoo.com',
    userType: USERTYPE.OperationHeadEvent,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U003',
    firstName: 'Wendy',
    lastName: 'Ankunding',
    email: 'Wendy@yahoo.com',
    userType: USERTYPE.EventHead,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U004',
    firstName: 'Daryl',
    lastName: 'Wilderman',
    email: 'Daryl@yahoo.com',
    userType: USERTYPE.CS,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U005',
    firstName: 'Antonia',
    lastName: 'Ankunding',
    email: 'Antonia@yahoo.com',
    userType: USERTYPE.OperationHeadPnP,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: false,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U006',
    firstName: 'Marie',
    lastName: 'VonRueden',
    email: 'Marie@yahoo.com',
    userType: USERTYPE.BusinessHeadPnp,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: false,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U007',
    firstName: 'Katherine',
    lastName: 'Parisian',
    email: 'rashad.moen@yahoo.com',
    userType: USERTYPE.PrintExecutivePnP,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U008',
    firstName: 'Jaime',
    lastName: 'Tremblay',
    email: 'madyson4@yahoo.com',
    userType: USERTYPE.PrintManagerPnP,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U009',
    firstName: 'Abel',
    lastName: 'Hettinger',
    email: 'mac_ebert@hotmail.com',
    userType: USERTYPE.GiftManagerPnP,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U010',
    firstName: 'Velma',
    lastName: 'Flatley',
    email: 'mohamed.ebert@hotmail.com',
    userType: USERTYPE.PNPHead,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U011',
    firstName: 'Ebony',
    lastName: 'Mertz',
    email: 'jerry53@hotmail.com',
    userType: USERTYPE.DeliveryManagerPnP,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: false,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U012',
    firstName: 'Alma',
    lastName: 'Ebert',
    email: 'trent.mcglynn@hotmail.com',
    userType: USERTYPE.FinanceExecutive,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U013',
    firstName: 'Lynn',
    lastName: 'Hills',
    email: 'lauretta.lehner0@hotmail.com',
    userType: USERTYPE.FinanaceManager,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U013',
    firstName: 'Leona',
    lastName: 'Berge',
    email: 'vanessa_zieme88@hotmail.com',
    userType: USERTYPE.FinanceHead,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: false,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U014',
    firstName: 'Sachin',
    lastName: 'Virval',
    email: 'sachin.virval@gamil.com',
    userType: USERTYPE.Admin,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'U015',
    firstName: 'Karan',
    lastName: 'Jain',
    email: 'karan.jain@gamil.com',
    userType: USERTYPE.SuperAdmin,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '7894561234',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
];
