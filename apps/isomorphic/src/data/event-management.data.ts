import { ApprovalHistory } from '@/app/shared/po-management/columns';

export type EventDataType = {
  id: number;
  eventName: string;
  isPharma: string;
  divisionName: string | null;
  clientName: string | null;
  eventType: 'Conference' | 'Stall' | 'briefing meeting';
  elements: number;
  startDate: string;
  endDate: string;
  location: { city: string; state: string };
  stdTotal: number;
  clientRate: number;
  vendor1Total?: number | null;
  vendor2Total?: number | null;
  vendor3Total?: number | null;
  vendor4Total?: number | null;
  vendor5Total?: number | null;
  totalVendor?: number | 0;
  priority: string;
  lowestVendorName?: string;
  status: string;
  finalizedBy?: string | null;
  finalizedVendorName?: string | null;
  reasonToChoose?: string | null;
  vendors?: {
    vendorName: string;
    name: string;
    total: number;
    emlFileUrl: string;
    excelFileUrl: string;
  }[];
};

export const eventDummyData: EventDataType[] = [
  {
    id: 1,
    eventName: 'Cardio Annual Summit 2026',
    isPharma: 'pharma',
    divisionName: 'Intas - Cardio Division',
    clientName: null,
    eventType: 'Conference',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-01-16T23:59:00Z',
    location: { city: 'Ahmedabad', state: 'Gujarat' },
    elements: 5,
    stdTotal: 100000,
    clientRate: 115000,
    vendor1Total: 100000,
    vendor2Total: 105000,
    vendor3Total: 110000,
    vendor4Total: 115000,
    vendor5Total: 103000,
    totalVendor: 5,
    priority: 'high',
    lowestVendorName: 'Vendor 1',
    status: 'pending',
    finalizedBy: 'Amit (ET)',
    finalizedVendorName: 'Vendor 1',
    reasonToChoose: 'Competitive pricing with prior experience',
    vendors: [
      {
        vendorName: 'Medcom',
        name: 'Ankit Gandhi',
        total: 10000,
        emlFileUrl: 'emailurl',
        excelFileUrl: 'excelFileUrl',
      },
      {
        vendorName: 'Aurum',
        name: 'Karan Jain',
        total: 9500,
        emlFileUrl: 'emailurl',
        excelFileUrl: 'excelFileUrl',
      },
      {
        vendorName: 'Decor',
        name: 'Miyan Akshay',
        total: 9800,
        emlFileUrl: 'emailurl',
        excelFileUrl: 'excelFileUrl',
      },
    ],
  },
  {
    id: 2,
    eventName: 'Neuro Expo 2026',
    isPharma: 'pharma',
    divisionName: 'Intas - Neuro Division',
    clientName: null,
    eventType: 'Stall',
    startDate: '2024-01-18T00:00:00Z',
    endDate: '2024-01-21T23:59:00Z',
    stdTotal: 200010,
    clientRate: 211500,
    vendor1Total: 220010,
    totalVendor: 1,
    location: { city: 'Ahmedabad', state: 'Gujarat' },
    lowestVendorName: 'Vendor 2',
    priority: 'low',
    elements: 3,
    status: 'pending',
    finalizedBy: 'Ankit (EH)',
    finalizedVendorName: 'Vendor 1',
    reasonToChoose: 'Better stall design quality',
  },
  {
    id: 3,
    eventName: 'Gastro Experts Meet',
    isPharma: 'pharma',
    divisionName: 'Intas - Gastro Division',
    clientName: null,
    eventType: 'Conference',
    startDate: '2024-02-05T00:00:00Z',
    endDate: '2024-02-05T23:59:00Z',
    elements: 5,
    stdTotal: 500001,
    clientRate: 550001,
    totalVendor: 0,
    priority: 'medium',
    location: { city: 'Ahmedabad', state: 'Gujarat' },
    status: 'pending',
    finalizedBy: null,
    finalizedVendorName: null,
    reasonToChoose: null,
  },
  // {
  //   id: 4,
  //   eventName: 'Healthcare Leadership Forum',
  //   isPharma: 'non-pharma',
  //   divisionName: null,
  //   clientName: 'Sun Pharma',
  //   eventType: 'Conference',
  //   startDate: '2024-02-05T00:00:00Z',
  //   endDate: '2024-02-05T23:59:00Z',
  //   location: { city: 'Ahmedabad', state: 'Gujarat' },
  //   priority: 'low',
  //   elements: 4,
  //   stdTotal: 100000,
  //   clientRate: 110000,
  //   vendor1Total: 100000,
  //   vendor2Total: 102000,
  //   vendor3Total: 108000,
  //   lowestVendorName: 'Vendor 1',
  //   status: 'pending',
  //   finalizedBy: 'Amit (ET)',
  //   finalizedVendorName: 'Vendor 1',
  //   reasonToChoose: 'Long-term vendor partnership',
  // },
  // {
  //   id: 5,
  //   eventName: 'National Medical Expo',
  //   isPharma: 'non-pharma',
  //   divisionName: null,
  //   clientName: 'Cipla',
  //   eventType: 'Stall',
  //   startDate: '2024-02-05T00:00:00Z',
  //   endDate: '2024-02-05T23:59:00Z',
  //   stdTotal: 200010,
  //   clientRate: 220010,
  //   vendor1Total: 220010,
  //   vendor2Total: 210010,
  //   vendor3Total: 215000,
  //   location: { city: 'Ahmedabad', state: 'Gujarat' },
  //   priority: 'low',
  //   elements: 5,
  //   lowestVendorName: 'Vendor 2',
  //   finalizedBy: 'Ankit (EH)',
  //   finalizedVendorName: 'Vendor 2',
  //   status: 'pending',
  //   reasonToChoose: 'Creative execution approach',
  // },
  // {
  //   id: 6,
  //   eventName: 'Product Briefing 2026',
  //   isPharma: 'non-pharma',
  //   divisionName: null,
  //   clientName: 'Dr. Reddy’s',
  //   eventType: 'briefing meeting',
  //   startDate: '2024-02-05T00:00:00Z',
  //   endDate: '2024-02-05T23:59:00Z',
  //   stdTotal: 150000,
  //   clientRate: 170000,
  //   vendor1Total: 155000,
  //   vendor2Total: 148000,
  //   vendor3Total: 160000,
  //   location: { city: 'Ahmedabad', state: 'Gujarat' },
  //   priority: 'low',
  //   elements: 5,
  //   lowestVendorName: 'Vendor 2',
  //   finalizedBy: null,
  //   status: 'pending',
  //   finalizedVendorName: null,
  //   reasonToChoose: null,
  // },
];

export type EventViewDataType = {
  _id: number;
  eventName: string;
  user: { userName: string; role: string };
  client: {
    name: string;
    company: string;
    isPharma: string;
    division: string | null;
  } | null;
  eventType:
    | 'Setup'
    | 'CME'
    | 'Briefing Setup'
    | 'Clinic Decoration Activity'
    | 'Other';
  stdTotal: number;
  vendors:
    | {
        vendorName: string;
        total: number;
        emailUrl?: string;
        excelUrl?: string;
      }[]
    | null;
  selectedVendor?: {
    vendorName: string;
    total: number;
    emailUrl?: string;
    excelUrl?: string;
  } | null;
  finalizedBy?: { userName: string; role: string; reason: string } | null;
  createdAt?: string;
  EventApproval?: {
    firstLevelHistory: ApprovalHistory[];
    secondLevelHistory: ApprovalHistory[];
  };
  POApproval?: {
    firstLevelHistory: ApprovalHistory[];
    secondLevelHistory: ApprovalHistory[];
  };
};

export const dummyEventViewData: EventViewDataType = {
  _id: 1,
  eventName: 'Cardio Annual Summit 2026',
  user: { userName: 'Karan Jain', role: 'Event User' },
  client: {
    name: 'Rahul Sharma',
    company: 'Intas Pharma',
    isPharma: 'pharma',
    division: 'Cardio',
  },
  eventType: 'CME',
  stdTotal: 100000,
  vendors: [
    {
      vendorName: 'Vendor 1',
      total: 100000,
      emailUrl: 'http://vendor1.com',
      excelUrl: 'http://dummy-po.com',
    },
    {
      vendorName: 'Vendor 2',
      total: 105000,
      emailUrl: 'http://vendor2.com',
      excelUrl: 'http://dummy-po.com',
    },
    {
      vendorName: 'Vendor 3',
      total: 110000,
      emailUrl: 'http://vendor3.com',
      excelUrl: 'http://dummy-po.com',
    },
  ],
  selectedVendor: {
    vendorName: 'Vendor 1',
    total: 100000,
    emailUrl: 'http://vendor3.com',
    excelUrl: 'http://dummy-po.com',
  },
  finalizedBy: {
    userName: 'Amit (ET)',
    role: 'Event User',
    reason: 'Competitive pricing with prior experience',
  },
  createdAt: '2024-01-15T10:30:00Z',
  EventApproval: {
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
    secondLevelHistory: [
      {
        userName: 'Rahul Sharma',
        status: 'approve',
        comment: 'Looks good',
        date: '12 Mar 2026',
      },
    ],
  },
  POApproval: {
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
    secondLevelHistory: [],
  },
};
