import { CLIENTTYPE } from '@/config/constants';

export type Client = {
  id: string;
  clientName: string;
  name: string;
  mobile: string;
  division: string | null;
  email: string;
  clientType: keyof typeof CLIENTTYPE; //TODO Define ROLES type
  clientFrom: string | null;
  createdAt: Date;
  isActive: boolean;
  address: string;
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

export const clientData = [
  {
    id: 'C001',
    companyName: 'Intas Pharma',
    division: 'Altis',
    clientFrom: null,
    name: 'Ankit Shah',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.PNPClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C002',
    companyName: 'Intas Pharma',
    division: 'Arron',
    clientFrom: null,
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    clientType: CLIENTTYPE.PNPClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C003',
    companyName: 'Intas Pharam',
    division: 'Altis',
    clientFrom: 'pharma',
    name: 'Ankit Shah',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C004',
    companyName: 'Intas Pharma',
    division: 'Arron',
    clientFrom: 'pharma',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C005',
    companyName: 'Milcent Appliances',
    name: 'Ankit Shah',
    division: null,
    clientFrom: 'non-pharma',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C006',
    companyName: 'Kitchen Express',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    division: null,
    clientFrom: 'non-pharma',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C003',
    companyName: 'Intas Pharma',
    division: 'Altis',
    clientFrom: 'pharma',
    name: 'Ankit Shah',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C004',
    companyName: 'Intas Pharma',
    division: 'Arron',
    clientFrom: 'pharma',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C005',
    companyName: 'Milcent Appliances',
    name: 'Ankit Shah',
    division: null,
    clientFrom: 'non-pharma',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C006',
    companyName: 'Kitchen Express',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    division: null,
    clientFrom: 'non-pharma',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C003',
    companyName: 'Intas Pharma',
    division: 'Altis',
    clientFrom: 'pharma',
    name: 'Ankit Shah',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C004',
    companyName: 'Intas Pharma',
    division: 'Arron',
    clientFrom: 'pharma',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C005',
    companyName: 'Milcent Appliances',
    name: 'Ankit Shah',
    division: null,
    clientFrom: 'non-pharma',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C006',
    companyName: 'Kitchen Express',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    division: null,
    clientFrom: 'non-pharma',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C003',
    companyName: 'Intas Pharma',
    division: 'Altis',
    clientFrom: 'pharma',
    name: 'Ankit Shah',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C004',
    companyName: 'Intas Pharma',
    division: 'Arron',
    clientFrom: 'pharma',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C005',
    companyName: 'Milcent Appliances',
    name: 'Ankit Shah',
    division: null,
    clientFrom: 'non-pharma',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C006',
    companyName: 'Kitchen Express',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    division: null,
    clientFrom: 'non-pharma',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C003',
    companyName: 'Intas Pharma',
    division: 'Altis',
    clientFrom: 'pharma',
    name: 'Ankit Shah',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C004',
    companyName: 'Intas Pharma',
    division: 'Arron',
    clientFrom: 'pharma',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C005',
    companyName: 'Milcent Appliances',
    name: 'Ankit Shah',
    division: null,
    clientFrom: 'non-pharma',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'C006',
    companyName: 'Kitchen Express',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    division: null,
    clientFrom: 'non-pharma',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: true,
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
];
