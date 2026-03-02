import { z } from 'zod';

// form zod validation schema
export const DivisionFormSchema = z.object({
  divisionCode: z
    .string()
    .trim()
    .min(1, { message: 'Division code is required' }),
  ccCode: z.string().trim().min(1, { message: 'CC Code is required' }),
  isActive: z.string(),
});

// generate form types from zod validation schema
export type DivisionFormInput = z.infer<typeof DivisionFormSchema>;
