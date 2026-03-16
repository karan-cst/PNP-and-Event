import { CLIENTTYPE } from '@/config/constants';

export type Company = {
  id: string;
  companyName: string;
  name?: string;
  mobile: string;
  email: string;
  clientType: keyof typeof CLIENTTYPE; //TODO Define ROLES type
  clientFrom?: string | ' ';
  createdAt: Date;
  isActive: string;
  address: string;
  isGSTApplicable?: boolean;
  GSTNumber?: string | null;
  pannumber?: string | null;
  MSMECertificate?: string | null;
  GSTCetificate?: string | null;
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

export const companyData = [
  {
    id: 'C002',
    companyName: 'Intas Pharma',
    clientFrom: 'pharma',
    name: 'Ankit Shah',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.PNPClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: 'active',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
    isGSTApplicable: false,
    GSTNumber: null,
    pannumber: null,
    MSMECertificate: null,
    GSTCertificate: null,
  },
  {
    id: 'C001',
    companyName: 'Intas Pharma',
    clientFrom: 'pharma',
    name: 'Ankit Shah',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: 'active',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
    isGSTApplicable: true,
    GSTNumber: '24AABCI1234Q1Z5',
    pannumber: 'AABCI1234Q',
    MSMECertificate: 'https://example.com/msme-certificate.pdf',
    GSTCertificate: 'https://example.com/gst-certificate.pdf',
  },
  {
    id: 'C002',
    companyName: 'Milcent Appliances',
    name: 'Ankit Shah',
    clientFrom: 'non-pharma',
    email: 'Ankit.shah@intas.com',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: 'active',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
    isGSTApplicable: false,
    GSTNumber: null,
    pannumber: null,
    MSMECertificate: null,
    GSTCertificate: null,
  },
  {
    id: 'C006',
    companyName: 'Kitchen Express',
    name: 'Rohan Patel',
    email: 'Rohan.patel@intas.com',
    clientFrom: 'non-pharma',
    clientType: CLIENTTYPE.EVENTClient,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: 'active',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
    isGSTApplicable: false,
    GSTNumber: null,
    pannumber: null,
    MSMECertificate: null,
    GSTCertificate: null,
  },
];
