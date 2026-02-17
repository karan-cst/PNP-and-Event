export type PNPJobsType = {
  id: number;
  eventName: string;
  clientCoordinator: string;
  status: string;
  csName: string;
  vendorCost: number | null;
  clientCost: number | null;
  poStatus: string | null;
  invoiceStatus: string | null;
  paymentStatus: string | null;
  vendorName: string | null;
  isPharma: boolean; // 👈 Intas / Pharma vs Non-Pharma
  isActive: boolean;
  createdAt: string;
};

export const PNPJobsData: PNPJobsType[] = [
  // ===== Pharma (Intas Clients) =====
  {
    id: 1,
    eventName: 'Neuro CME',
    clientCoordinator: 'Rahul Shah',
    status: 'Inquiry Received',
    csName: 'Dhaval',
    vendorCost: null,
    clientCost: null,
    poStatus: null,
    invoiceStatus: null,
    paymentStatus: null,
    vendorName: null,
    isPharma: true,
    isActive: true,
    createdAt: '2026-02-16T10:30:00Z',
  },
  {
    id: 2,
    eventName: 'Cardio CME',
    clientCoordinator: 'Dhaval Shah',
    status: 'Quotation Received',
    csName: 'Manish',
    vendorCost: 10000,
    clientCost: 12000,
    poStatus: 'Done',
    invoiceStatus: 'Awaiting',
    paymentStatus: 'Awaiting',
    vendorName: 'XYZ Event',
    isPharma: true,
    isActive: true,
    createdAt: '2026-02-16T10:30:00Z',
  },
];
