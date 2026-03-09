import { ApprovalHistory } from '@/app/shared/po-management/columns';

export type PO = {
  clientName: string;
  eventName: string;
  name: string;
  UserName: string;
  vendorName?: string;
  city: string;
  venodrCost?: number;
  firstLevelStatus?: string;
  firstLevelBy?: string;
  firstLevelComment?: string;
  firstLevelHistory: ApprovalHistory[];
  secondLevelStatus?: string;
  secondLevelBy?: string;
  secondLevelComment?: string;
  secondLevelHistory: ApprovalHistory[];
  poStatus?: string;
  isPharma: string;
};

export const POData = [
  {
    clientName: 'Astera',
    eventName: 'Neuro CME',
    name: 'Rahul',
    UserName: 'Dhaval',
    city: 'ahmedabad - tier1',
    vendorName: 'XYZ',
    venodrCost: 12000,
    firstLevelStatus: 'Rejected by',
    firstLevelBy: 'Ankit gandhi',
    firstLevelComment: '',
    firstLevelHistory: [
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
    secondLevelStatus: '',
    secondLevelBy: '',
    secondLevelComment: '',
    secondLevelHistory: [],
    poStatus: '',
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
    firstLevelStatus: 'Approved by',
    firstLevelBy: 'Ankit gandhi',
    firstLevelComment: '',
    firstLevelHistory: [
      {
        userName: 'Rahul Sharma',
        status: 'approve',
        comment: 'Looks good',
        date: '12 Mar 2026',
      },
    ],
    secondLevelStatus: 'Approved by',
    secondLevelBy: 'Amulakh Mistry',
    secondLevelComment: '',
    secondLevelHistory: [
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
    poStatus: '',
    isPharma: 'non-pharma',
  },
];
