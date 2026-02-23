export type EventApprove = {
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
  secondLevelStatus?: string;
  secondLevelBy?: string;
  secondLevelComment?: string;
  poStatus?: string;
};

export const EventApproveData = [
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
    secondLevelStatus: '',
    secondLevelBy: '',
    secondLevelComment: '',
    poStatus: '',
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
    secondLevelStatus: 'Approved by',
    secondLevelBy: 'Amulakh Mistry',
    secondLevelComment: '',
    poStatus: '',
  },
];
