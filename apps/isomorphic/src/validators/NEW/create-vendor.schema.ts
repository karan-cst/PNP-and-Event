import { z } from 'zod';
import { validateEmail } from '../common-rules';

// form zod validation schema
export const vendorFormSchema = z.object({
  companyName: z.string().min(1, { message: 'Vendor name is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  email: validateEmail,
  mobile: z.string().regex(/^[0-9]{10}$/, {
    message: 'Mobile number must be exactly 10 digits',
  }),
  vendorType: z.string().min(1, { message: 'Vendor type is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  address: z.string().min(10, { message: 'Address is required' }),
});

// generate form types from zod validation schema
export type VendorFormInput = z.infer<typeof vendorFormSchema>;
