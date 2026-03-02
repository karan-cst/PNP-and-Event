import { z } from 'zod';

// form zod validation schema
export const DeliveryLocationFormSchema = z.object({
  location: z.string().trim().min(1, { message: 'Location is required' }),
  division: z.string().trim().min(1, { message: 'Division is required' }),
  deliveryDays: z
    .array(z.string().min(1))
    .min(1, { message: 'At least one delivery day is required' }),
  isActive: z.string(),
});

// generate form types from zod validation schema
export type DeliveryLocationnFormInput = z.infer<
  typeof DeliveryLocationFormSchema
>;
