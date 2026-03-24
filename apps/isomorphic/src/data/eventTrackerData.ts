export type EventTracker = {
  company: string;
  division?: string;
  eventName: string;
  client: string;
  startDate: string;
  endDate: string;
  clientStatus?: string;
  status: string;
  UserName: string;
  venodrCost?: null | number;
  clientCost?: null | number;
  margin?: number | null;
  clientBilling: number;
  totalMargin: number;
  poStatus?: string;
  invoiceStatus?: string;
  paymentStatus?: string;
  isPharama?: string;
};

export const EventTrackerData = [
  {
    company: 'Intas',
    division: 'Intas - Cardio Division',
    eventName: 'Cardio Annual Summit 2026',
    eventType: 'Conference',
    client: 'Rahul',
    clientStatus: 'Confirmed',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-01-16T23:59:00Z',
    status: 'Confirmed',
    UserName: 'Dhaval',
    vendorName: 'XYZ',
    venodrCost: 100000,
    clientCost: 115000,
    margin: 13,
    clientBilling: 126500,
    totalMargin: 21,

    poStatus: 'Done',
    invoiceStatus: 'Awaiting',
    paymentStatus: 'pending',
    city: 'ahmedabad - tier1',
    isPharma: 'pharma',
  },
  // {
  //   company: 'Intas',
  //   division: 'Arron',
  //   eventName: 'MSES',
  //   client: 'Dhaval',
  //   clientStatus: 'Pending',
  //   UserName: 'Manish',
  //   status: 'Inquiry Received',
  //   vendorName: 'ABC',
  //   venodrCost: null,
  //   clientCost: null,
  //   poStatus: '',
  //   isPharma: 'non-pharma',
  // },
];
