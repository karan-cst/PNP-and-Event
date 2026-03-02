import { VENDORTYPE } from '@/config/constants';

export type Vendor = {
  id: string;
  companyName: string;
  name: string;
  mobile: string;
  city: string;
  email: string;
  vendorType: keyof typeof VENDORTYPE; //TODO Define ROLES type
  createdAt: Date;
  isActive: string;
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

export const vendorData = [
  {
    id: 'V001',
    companyName: 'Medcom',
    name: 'Ankit Gandhi',
    email: 'ankitgandhi@gmail.com',
    vendorType: VENDORTYPE.PNPVendor,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: 'inactive',
    city: 'Ahmedabad',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'V002',
    companyName: 'XYZ pvt ltd',
    name: 'Rohan Patel',
    email: 'rohan.patel@gmail.com',
    vendorType: VENDORTYPE.PNPVendor,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: 'active',
    city: 'Surat',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'V003',
    companyName: 'Aurum Medcom',
    name: 'Ankit Gandhi',
    email: 'Ankit.shah@aurum.com',
    vendorType: VENDORTYPE.EVENTVendor,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: 'active',
    city: 'Ahmedabad',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
  {
    id: 'V004',
    companyName: 'ABC pvt ltd',
    name: 'Rohan Tyagi',
    email: 'rohan.patel@abc.com',
    vendorType: VENDORTYPE.EVENTVendor,
    createdAt: '2026-02-10T16:01:40.021Z',
    mobile: '789456123',
    isActive: 'active',
    city: 'Surat',
    address:
      'Titanium City Center Mall, B-207, Road, Prahlad Nagar, Ahmedabad, Gujarat 380015',
  },
];
