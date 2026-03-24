export type DeliveryDataType = {
  id: string;
  jobId: string;
  jobName: string;
  createdAt: string;
  sapCode: string[];
  description: string;
  division: { _id: string; name: string } | null;
  printer: string;
  qty: number;
  packing: number;
  deliveryLocation: string;
  deliveryDate: string;
  status: string;
  studioRemarks: string;
  printerDate: string;
};

export const deliveryDummyData: DeliveryDataType[] = [
  {
    id: '1',
    jobId: 'JOB-001',
    jobName: 'Brochure Printing',
    createdAt: '2026-03-10',
    sapCode: ['221229', '221227'],
    description: 'Brochure Printing',
    division: { _id: 'div1', name: 'Altis' },
    printer: 'PrintMaster Inc.',
    qty: 1000,
    packing: 50,
    deliveryLocation: 'Matoda',
    deliveryDate: '2026-03-30',
    status: 'In Progress',
    studioRemarks: 'Urgent delivery required',
    printerDate: '2026-03-20',
  },
];
