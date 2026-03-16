import { z } from 'zod';

// form zod validation schema
export const DivisionFormSchema = z.object({
  divisionCode: z
    .string()
    .trim()
    .min(1, { message: 'Division code is required' }),
  ccCode: z.string().trim().min(1, { message: 'CC Code is required' }),
  isActive: z.string(),
  team: z.string(),
  company: z.string().min(1, { message: 'Company name is required' }),
});

export const DivisionUserFormSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .trim()
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  isActive: z.string(),
});
export const DivisionUserFormWithClientSchema = z.object({
  // company: z.object({
  //   _id: z.string(),
  //   name: z.string(),
  //   isPharma: z.string(),
  // }),
  company: z.string().min(1, { message: 'Company name is required' }),
  division: z.string().min(1, { message: 'Division name is required' }),
  name: z.string().trim().min(1, { message: 'Name is required' }),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  phone: z
    .string()
    .trim()
    .min(10, { message: 'Phone number must be at least 10 digits' }),
  isActive: z.string(),
});

// generate form types from zod validation schema
export type DivisionFormInput = z.infer<typeof DivisionFormSchema>;
export type DivisionUserFormInput = z.infer<typeof DivisionUserFormSchema>;
export type DivisionUserFormWithClientInput = z.infer<
  typeof DivisionUserFormWithClientSchema
>;
