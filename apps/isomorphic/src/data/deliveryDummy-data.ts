export type DeliveryDataType = {
  id: string;
  jobId: string;
  jobName: string;
  createdBy: string;
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
  remarks?: string;
};

export const deliveryDummyData: DeliveryDataType[] = [
  {
    id: '1',
    jobId: 'ADR67101JUN/25-26',
    jobName: 'Pamphlet_Gaurav Gupta',
    createdBy: 'ABC',
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
    remarks:
      'Add remarks for the PO team. Example: Create separate POs for each vendor OR create one combined PO for selected vendors with shared delivery and billing.\nAdd remarks for the PO team. Example: Create separate POs for each vendor OR create one combined PO for selected vendors with shared delivery and billing.Add remarks for the PO team. Example: Create separate POs for each vendor OR create one combined PO for selected vendors with shared delivery and billing.Add remarks for the PO team. Example: Create separate POs for each vendor OR create one combined PO for selected vendors with shared delivery and billing.Add remarks for the PO team. Example: Create separate POs for each vendor OR create one combined PO for selected vendors with shared delivery and billing.Add remarks for the PO team. Example: Create separate POs for each vendor OR create one combined PO for selected vendors with shared delivery and billing.',
  },
];
