export type EventTracker = {
  company: string;
  division?: string;
  eventName: string;
  client: string;
  clientStatus?: string;
  status: string;
  UserName: string;
  venodrCost?: null | number;
  clientCost?: null | number;
  margin?: number | null;
  poStatus?: string;
  invoiceStatus?: string;
  paymentStatus?: string;
  isPharama?: string;
};

export const EventTrackerData = [
  {
    company: 'Intas',
    division: 'Arron',
    eventName: 'Neuro CME',
    client: 'Rahul',
    clientStatus: 'Confirmed',
    status: 'Confirmed',
    UserName: 'Dhaval',
    vendorName: 'XYZ',
    venodrCost: 10000,
    clientCost: 12000,
    margin: 20,
    poStatus: 'Done',
    invoiceStatus: 'Awaiting',
    paymentStatus: 'pending',
    city: 'ahmedabad - tier1',
    isPharma: 'pharma',
  },
  {
    company: 'Intas',
    division: 'Arron',
    eventName: 'MSES',
    client: 'Dhaval',
    clientStatus: 'Pending',
    UserName: 'Manish',
    status: 'Inquiry Received',
    vendorName: 'ABC',
    venodrCost: null,
    clientCost: null,
    poStatus: '',
    isPharma: 'non-pharma',
  },
];
