import { z } from 'zod';

export const jobFormSchema = z.object({
  // 1️⃣ Basic Job Info
  jobName: z.string().min(1, 'Job name is required'),

  //   jobNo: z.string().min(1, 'Job number is required'),

  date: z.coerce.date({
    required_error: 'Date is required',
  }),

  // 2️⃣ Accounting Codes
  glCode: z.string().min(1, 'GL Code is required'),

  sapCode: z.string().min(1, 'SAP Code is required'),

  ccCode: z.string().min(1, 'CC Code is required'),

  hsnCode: z.string().min(1, 'HSN Code is required'),

  // 3️⃣ Requester Info
  requisitionerName: z.string().min(1, 'Requisitioner name is required'),

  floor: z.string().min(1, 'Floor is required'),

  division: z.string().min(1, 'Division is required'),

  // 4️⃣ Delivery Details
  totalQty: z.coerce.number().min(1, 'Total quantity must be at least 1'),

  deliveryPlace: z.string().min(1, 'Delivery place is required'),

  deliveryDate: z.coerce.date({
    required_error: 'Delivery date is required',
  }),

  packageQty: z.coerce.number().min(1, 'Package quantity must be at least 1'),

  deliveryComment: z.string().optional(),

  // 5️⃣ Print Specifications
  size: z.string().min(1, 'Size is required'),

  paper: z.string().min(1, 'Paper type is required'),

  colour: z.string().min(1, 'Colour is required'),

  budget: z
    .union([z.coerce.number().min(0, 'Budget must be positive'), z.null()])
    .optional(),

  // 6️⃣ Finishing Options
  lamination: z.boolean(),
  matt: z.boolean(),
  gloss: z.boolean(),
  front: z.boolean(),

  back: z.boolean(),
  uv: z.boolean(),
  vaidB2B: z.boolean(),
  hBound: z.boolean(),

  spiral: z.boolean(),
  wiroWire: z.boolean(),
  indexing: z.boolean(),
  foil: z.boolean(),

  otherLamination: z.string().optional(),

  specialInstructions: z.string().optional(),

  createdAt: z.coerce.date().optional(),

  // 7️⃣ Job Type
  jobType: z.enum(['print', 'gift', 'printngift'], {
    required_error: 'Job type is required',
  }),

  PrintExecutiveStatus: z.enum(['Approved', 'Rejected'], {
    required_error: 'Print executive status is required',
  }),
});

export type CreateJobInput = z.infer<typeof jobFormSchema>;
