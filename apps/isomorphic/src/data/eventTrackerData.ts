export type EventTracker = {
  clientName: string;
  eventName: string;
  name: string;
  status: string;
  UserName: string;
  venodrCost?: string | number;
  clientCost?: null | number;
  margin?: number | null;
  poStatus?: string;
  invoiceStatus?: string;
  paymentStatus?: string;
  isPharama?: boolean;
};

export const EventTrackerData = [
  {
    clientName: 'Astera',
    eventName: 'Neuro CME',
    name: 'Rahul',
    status: 'Confirmed',
    UserName: 'Dhaval',
    vendorName: 'XYZ',
    venodrCost: 10000,
    clientCost: 12000,
    margin: 20,
    poStatus: 'Done',
    invoiceStatus: 'Awaiting',
    paymentStatus: null,
    city: 'ahmedabad - tier1',
    isPharma: true,
  },
  {
    clientName: 'ABC',
    eventName: 'MSES',
    name: 'Dhaval',
    UserName: 'Manish',
    status: 'Inquiry Received',
    vendorName: 'ABC',
    venodrCost: 12000,
    clientCost: null,
    poStatus: '',
    isPharma: true,
  },
];
