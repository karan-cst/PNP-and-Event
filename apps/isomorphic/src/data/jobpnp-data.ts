export type JobFormDataType = {
  jobName: string;
  jobNo: string;
  date: string;

  glCode: string;
  sapCode: string;
  ccCode: string;
  hsnCode: string;

  requisitionerName: string;
  floor: string;
  division: string;

  totalQty: number;
  deliveryPlace: string;
  deliveryDate: string;
  packageQty: number;
  deliveryComment: string;

  size: string;
  paper: string;
  colour: string;
  budget: number | null;

  lamination: boolean;
  matt: boolean;
  gloss: boolean;
  front: boolean;

  back: boolean;
  uv: boolean;
  vaidB2B: boolean;
  hBound: boolean;

  spiral: boolean;
  wiroWire: boolean;
  indexing: boolean;
  foil: boolean;

  otherLamination: string;
  specialInstructions: string;
  createdAt: string;
  jobType: JobType;
  PrintExecutiveStatus: PrintExecutiveStatus;
};
export type JobType = 'print' | 'gift' | 'printngift';
export type PrintExecutiveStatus = 'Approved' | 'Rejected';

export const dummyJobData: JobFormDataType[] = [
  {
    jobName: 'Pamphlet_Gaurav Gupta',
    jobNo: 'ADR67101JUN/25-26',
    date: '2025-06-24',

    glCode: '5153700007',
    sapCode: '2273043',
    ccCode: '1450',
    hsnCode: '49011020',

    requisitionerName: 'Dhaval Patel',
    floor: '2nd Floor',
    division: 'ADRINA',

    totalQty: 4000,
    deliveryPlace: 'Matoda',
    deliveryDate: '2026-03-30',
    packageQty: 100,
    deliveryComment: '-',

    size: '8.2 x 11.7 inches',
    paper: 'Standard gloss paper',
    colour: '4 Color',
    budget: 25000,

    lamination: true,
    matt: false,
    gloss: true,
    front: true,

    back: false,
    uv: false,
    vaidB2B: false,
    hBound: false,

    spiral: false,
    wiroWire: false,
    indexing: false,
    foil: false,

    otherLamination: '',
    specialInstructions: 'Ensure high resolution print quality.',
    createdAt: '2026-02-10',
    jobType: 'print',
    PrintExecutiveStatus: 'Approved',
  },
];

export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export type ApprovalStage = {
  userName: string;
  status: ApprovalStatus;
  date?: string; // dd/mm/yyyy
};

export type JobTrackerTableType = {
  _id: string;

  // 1️⃣ Job Details
  jobName: string;
  division: string;

  // 2️⃣ Created
  createdDate: string;

  // 3️⃣ Operation Head
  operationHead: ApprovalStage;

  // 4️⃣ Design Cost + Business Head
  designCost: number;
  businessHeadName: string;

  // 5️⃣ Print Executive
  printExecutive: ApprovalStage;

  // 6️⃣ Print Manager + Vendor Selection
  printManager: {
    managerName: string;
    vendorSelectionStatus: ApprovalStatus;
  };

  // 7️⃣ Finalized Vendor
  finalizedVendorName?: string;
};

export const dummyJobTrackerData: JobTrackerTableType[] = [
  {
    _id: 'job_001',

    // 1️⃣ Job Details
    jobName: 'Cardio Summit Brochure',
    division: 'Cardiology',

    // 2️⃣ Created
    createdDate: '10/02/2026',

    // 3️⃣ Operation Head
    operationHead: {
      userName: 'Amit Shah',
      status: 'Approved',
      date: '11/02/2026',
    },

    // 4️⃣ Design Cost + Business Head
    designCost: 5000,
    businessHeadName: 'Rakesh Mehta',

    // 5️⃣ Print Executive
    printExecutive: {
      userName: 'Umesh Yadav',
      status: 'Approved',
      date: '12/02/2026',
    },

    // 6️⃣ Print Manager
    printManager: {
      managerName: 'Manoj Jain',
      vendorSelectionStatus: 'Approved',
    },

    // 7️⃣ Finalized Vendor
    finalizedVendorName: 'MJI Print Solutions',
  },

  {
    _id: 'job_002',

    jobName: 'Product Launch Pamphlet',
    division: 'Marketing',

    createdDate: '14/02/2026',

    operationHead: {
      userName: 'Neha Joshi',
      status: 'Approved',
      date: '15/02/2026',
    },

    designCost: 8000,
    businessHeadName: 'Vikram Singh',

    printExecutive: {
      userName: 'Kunal Verma',
      status: 'Pending',
    },

    printManager: {
      managerName: 'Rahul Desai',
      vendorSelectionStatus: 'Pending',
    },

    finalizedVendorName: '',
  },

  {
    _id: 'job_003',

    jobName: 'Doctor Gift Kit Printing',
    division: 'Sales',

    createdDate: '18/02/2026',

    operationHead: {
      userName: 'Amit Shah',
      status: 'Rejected',
      date: '19/02/2026',
    },

    designCost: 12000,
    businessHeadName: 'Rakesh Mehta',

    printExecutive: {
      userName: 'Umesh Yadav',
      status: 'Pending',
    },

    printManager: {
      managerName: 'Manoj Jain',
      vendorSelectionStatus: 'Pending',
    },

    finalizedVendorName: '',
  },
];

export type JobViewType = {
  _id: string;

  // 🔹 Basic Info
  jobName: string;
  jobNo: string;
  createdDate: string;
  jobType: 'print' | 'gift' | 'printngift';

  deliveryLocation: 'Single' | 'Double';

  // 🔹 Accounting
  ccCode: string;
  hsnCode: string;
  sapCode: string;
  glCode: string;

  deliveryDate: string;

  // 🔹 Specifications
  specifications: {
    size: string;
    paper: string;
    colour: string;
    budget: number | null;

    lamination: boolean;
    matt: boolean;
    gloss: boolean;
    front: boolean;
    back: boolean;
    uv: boolean;
    vaidB2B: boolean;
    hBound: boolean;
    spiral: boolean;
    wiroWire: boolean;
    indexing: boolean;
    foil: boolean;

    otherLamination?: string;
  };

  // 🔹 Packing
  packingDetails: {
    shrinkPack?: string;
    biboPack?: string;
  };

  // 🔹 Printing Instructions
  printingInstructions: string[];

  // 🔹 Approval Stages
  approvals: {
    operationHead?: ApprovalStage;
    businessHead?: ApprovalStage;
    printExecutive?: ApprovalStage;
    printManager?: ApprovalStage;
  };

  // 🔹 Logs
  logs?: {
    message: string;
    user: string;
    date: string;
  }[];
};

export const dummyJobViewData: JobViewType = {
  _id: 'job_001',

  // 🔹 Basic Info
  jobName: 'Cardio Annual Summit Brochure',
  jobNo: 'ADR67101JUN/25-26',
  createdDate: '10/02/2026',
  jobType: 'print',
  deliveryLocation: 'Single',

  // 🔹 Accounting
  ccCode: '1450',
  hsnCode: '49011020',
  sapCode: '2273043',
  glCode: '5153700007',

  deliveryDate: '30/03/2026',

  // 🔹 Specifications
  specifications: {
    size: '8.2 x 11.7 inches (A4)',
    paper: 'Standard Gloss Paper 130 GSM',
    colour: '4 Color (CMYK)',
    budget: 25000,

    lamination: true,
    matt: false,
    gloss: true,
    front: true,
    back: false,
    uv: true,
    vaidB2B: false,
    hBound: false,
    spiral: false,
    wiroWire: false,
    indexing: false,
    foil: true,

    otherLamination: 'Soft Touch Lamination',
  },

  // 🔹 Packing
  packingDetails: {
    shrinkPack: '100 per pack',
    biboPack: '10 packs per box',
  },

  // 🔹 Printing Instructions
  printingInstructions: [
    'Die Cut required for front cover',
    'UV coating on logo only',
    'Maintain exact brand color tone',
  ],

  // 🔹 Approval Stages
  approvals: {
    operationHead: {
      userName: 'Amit Shah',
      status: 'Approved',
      date: '11/02/2026',
    },
    businessHead: {
      userName: 'Rakesh Mehta',
      status: 'Approved',
      date: '12/02/2026',
    },
    printExecutive: {
      userName: 'Umesh Yadav',
      status: 'Approved',
      date: '13/02/2026',
    },
    printManager: {
      userName: 'Manoj Jain',
      status: 'Pending',
    },
  },

  // 🔹 Logs
  logs: [
    {
      message: 'Job created by CS User',
      user: 'Dhaval Patel',
      date: '10/02/2026 10:30 AM',
    },
    {
      message: 'Approved by Operation Head',
      user: 'Amit Shah',
      date: '11/02/2026 02:15 PM',
    },
    {
      message: 'Approved by Business Head',
      user: 'Rakesh Mehta',
      date: '12/02/2026 11:45 AM',
    },
  ],
};
