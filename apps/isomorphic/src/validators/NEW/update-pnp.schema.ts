import { z } from 'zod';

// form zod validation schema
export const PNPUpdateFormSchema = z.object({
  location: z.string().trim().min(1, { message: 'Location is required' }),
  deliveryDate: z
    .string()
    .trim()
    .min(1, { message: 'Delivery Date is required' }),
  Status: z.string().trim().min(1, { message: 'Status is required' }),
  VendorRemarks: z.string().trim().min(1, { message: 'Remarks is required' }),
});

// generate form types from zod validation schema
export type PNPUpdateFormSchemaFormInput = z.infer<typeof PNPUpdateFormSchema>;
