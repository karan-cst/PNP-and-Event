import { ApprovalHistory } from '@/app/shared/po-management/columns';

export type Invoice = {
  clientName: string;
  eventName: string;
  name: string;
  UserName: string;
  vendorName?: string;
  city: string;
  venodrCost?: number;
  operationHeadHistory: ApprovalHistory[];
  eventHeadHistory: ApprovalHistory[];
  businessHeadHistory: ApprovalHistory[];
  poStatus?: string;
  isPharma: string;
};

export const InvoiceData = [
  {
    clientName: 'Astera',
    eventName: 'Neuro CME',
    name: 'Rahul',
    UserName: 'Dhaval',
    city: 'ahmedabad - tier1',
    vendorName: 'XYZ',
    venodrCost: 12000,
    operationHeadHistory: [
      {
        userName: 'Amit Jain',
        status: 'reject',
        comment:
          'Vendor cost is higher than the approved budget. Please revise the quotation or provide justification for the additional charges.',
        date: '10 Mar 2026',
      },
      {
        userName: 'Rahul Sharma',
        status: 'approve',
        comment: 'Looks good',
        date: '12 Mar 2026',
      },
    ],
    eventHeadHistory: [],
    businessHeadHistory: [],
    invoiceStatus: '',
    isPharma: 'pharma',
  },
  {
    clientName: 'ABC',
    eventName: 'MSES',
    name: 'Dhaval',
    UserName: 'Manish',
    city: 'ahmedabad - tier1',
    vendorName: 'ABC',
    venodrCost: 12000,
    operationHeadHistory: [
      {
        userName: 'Rahul Sharma',
        status: 'approve',
        comment: 'Looks good',
        date: '12 Mar 2026',
      },
    ],
    eventHeadHistory: [
      {
        userName: 'Amulakh Mistry',
        status: 'approve',
        comment: 'Looks good',
        date: '13 Mar 2026',
      },
    ],
    businessHeadHistory: [
      {
        userName: 'Rahul Sharma',
        status: 'reject',
        comment: 'Looks good',
        date: '12 Mar 2026',
      },
      {
        userName: 'John Doe',
        status: 'approve',
        comment: 'Looks good',
        date: '14 Mar 2026',
      },
    ],
    invoiceStatus: 'approve',
    isPharma: 'non-pharma',
  },
];
