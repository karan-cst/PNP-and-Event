import { z } from 'zod';

// form zod validation schema
export const PNPUpdateFormSchema = z.object({
  location: z.string().trim().min(1, { message: 'Location is required' }),
  deliveryDate: z.date({ invalid_type_error: 'Delivery Date is required' }),
  Status: z.string().trim().min(1, { message: 'Status is required' }),
  VendorRemarks: z.string().trim().min(1, { message: 'Remarks is required' }),
  followupDate: z.date({ invalid_type_error: 'Follow Up Date is required' }),
  printerDate: z.date({ invalid_type_error: 'Printer Date is required' }),
  division: z.string().trim().min(1, { message: 'Division is required' }),
  remarks: z.string().optional(),
});

// generate form types from zod validation schema
export type PNPUpdateFormSchemaFormInput = z.infer<typeof PNPUpdateFormSchema>;
