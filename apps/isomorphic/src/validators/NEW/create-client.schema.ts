import { z } from 'zod';
import { validateEmail } from '../common-rules';

// form zod validation schema
export const clientFormSchema = z.object({
  companyName: z.string().min(1, { message: 'Vendor name is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  email: validateEmail,
  mobile: z.string().regex(/^[0-9]{10}$/, {
    message: 'Mobile number must be exactly 10 digits',
  }),
  clientType: z.string().min(1, { message: 'Vendor type is required' }),
  division: z.string().min(1, { message: 'City is required' }),
  address: z.string().min(10, { message: 'Address is required' }),
  clientFrom: z.string().optional(),
  isActive: z.string({ required_error: 'Client status is required' }),
});

// generate form types from zod validation schema
export type ClientFormInput = z.infer<typeof clientFormSchema>;
