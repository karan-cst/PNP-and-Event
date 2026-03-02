import { z } from 'zod';

// form zod validation schema
export const HSNFormSchema = z.object({
  HSNCode: z
    .string()
    .trim()
    .min(4, { message: 'HSN Code must be at least 4 digits' })
    .max(8, { message: 'HSN Code cannot exceed 8 digits' })
    .regex(/^\d+$/, { message: 'HSN Code must contain only numbers' }),
  title: z.string().trim().min(1, { message: 'Title is required' }),
  subtitle: z.string().trim().min(1, { message: 'Sub Title is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
  gst: z.number(),
  // .trim()
  // .regex(/^\d+(\.\d{1,2})?$/, {
  //   message: 'GST must be a valid number',
  // }),
  isActive: z.string(),
});

// generate form types from zod validation schema
export type HSNFormInput = z.infer<typeof HSNFormSchema>;
