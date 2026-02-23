import { CLIENTTYPE } from '@/config/constants';

export type ClientApprove = {
  clientName: string;
  eventName: string;
  name: string;
  status: string;
  UserName: string;
  venodrCost?: string | number;
  clientCost?: number;
  poStatus?: string;
  invoiceStatus?: string;
  paymentStatus?: string;
};

export const clientApproveData = [
  {
    clientName: 'Astera',
    eventName: 'Neuro CME',
    name: 'Rahul',
    status: 'Inquiry Received',
    UserName: 'Dhaval',
    venodrCost: 'Quote Pending',
    clientCost: '',
    poStatus: 'Pending',
    invoiceStatus: 'pending',
    paymentStatus: 'pending',
  },
  {
    clientName: 'ABC',
    eventName: 'MSES',
    name: 'Dhaval',
    status: 'Confirmed',
    UserName: 'Manish',
    venodrCost: 'Done',
    clientCost: '',
    poStatus: 'Pending',
    invoiceStatus: 'pending',
    paymentStatus: 'pending',
  },
];
