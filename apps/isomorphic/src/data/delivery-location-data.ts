import { WEEKDAYTYPE } from '@/config/constants';

export type DeliveryLocation = {
  id: string;
  location: string;
  division: string;
  deliveryDays: [keyof typeof WEEKDAYTYPE];
  createdAt: Date;
  isActive: string;
};

export const DeliveryLocationData = [
  {
    id: 'DL001',
    location: 'Motada',
    division: 'Arron',
    deliveryDays: ['Mon', 'Wed'],
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: 'inactive',
  },
];
