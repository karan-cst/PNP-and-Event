import { z } from 'zod';
export const PaymentApproveSchema = z.object({
  date: z.date({
    required_error: 'Date is required',
    invalid_type_error: 'Invalid date format',
  }),
});

export type PaymentApproveFormInput = z.infer<typeof PaymentApproveSchema>;
