export type InquiryStatus =
  | 'Under Review'
  | 'Received Quotation'
  | 'Awaiting'
  | 'Approved'
  | 'Rejected';

export type InquiryType = 'Printing' | 'Gift';

export type InquiryTableType = {
  _id: string;

  jobName: string;
  division: string;

  createdDate: string;

  inquiryType: InquiryType;
  inquiryId: string;

  clientName: string;

  budget: number;
  qty: number;

  printManagerName: string;
  status: InquiryStatus;

  sampleRequired: boolean;

  deliveryTime: string;
  deliveryLocation: string;
};

export const dummyInquiryData: InquiryTableType[] = [
  {
    _id: 'inq_001',
    jobName: 'Cardio Brochure',
    division: 'Cardiology',
    createdDate: '10/02/2026',
    inquiryType: 'Printing',
    inquiryId: 'ADR251855',
    clientName: 'Intas',
    budget: 5000,
    qty: 100,
    printManagerName: 'ABC',
    status: 'Under Review',
    sampleRequired: true,
    deliveryTime: '25/03/2026',
    deliveryLocation: 'Matoda',
  },
  {
    _id: 'inq_002',
    jobName: 'Doctor Gift Kit',
    division: 'Sales',
    createdDate: '12/02/2026',
    inquiryType: 'Gift',
    inquiryId: 'ADR251859',
    clientName: 'XYS',
    budget: 5000,
    qty: 50,
    printManagerName: 'Intas',
    status: 'Received Quotation',
    sampleRequired: false,
    deliveryTime: '28/03/2026',
    deliveryLocation: 'Matoda',
  },
  {
    _id: 'inq_003',
    jobName: 'Event Folder Printing',
    division: 'Marketing',
    createdDate: '14/02/2026',
    inquiryType: 'Gift',
    inquiryId: 'ADR251860',
    clientName: 'Intas',
    budget: 5000,
    qty: 200,
    printManagerName: 'Rahul Mehta',
    status: 'Awaiting',
    sampleRequired: true,
    deliveryTime: '30/03/2026',
    deliveryLocation: 'Matoda',
  },
];

export type GiftInquiryFormType = {
  _id?: string;

  inquiryType: 'Gift';

  inputName: string;
  qty: number;
  budget: number;

  division: string;
  csName: string;

  deliveryTimeline: string;
  deliveryPlace: string;

  customized: boolean;

  specialInstructions?: string;
  endUserOfGift?: string;

  createdAt?: string;
};

export const dummyGiftInquiry: GiftInquiryFormType = {
  _id: 'inq_002',

  inquiryType: 'Gift',

  inputName: 'Doctor Welcome Kit',
  qty: 500,
  budget: 50000,

  division: 'Cardiology',
  csName: 'Dhaval Patel',

  deliveryTimeline: '30/03/2026',
  deliveryPlace: 'Ahmedabad Warehouse',

  customized: true,

  specialInstructions: 'Include hospital logo branding',
  endUserOfGift: 'Cardiologists',
};
