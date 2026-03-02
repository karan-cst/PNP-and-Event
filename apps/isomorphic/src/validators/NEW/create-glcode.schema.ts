import { z } from 'zod';

// form zod validation schema
export const GLcodeFormSchema = z.object({
  glCode: z.number().min(1, { message: 'GL Code is required' }),
  jobPurpose: z.string().trim().min(1, { message: 'Job purpose is required' }),
  isActive: z.string(),
});

// generate form types from zod validation schema
export type GLCodeFormInput = z.infer<typeof GLcodeFormSchema>;
