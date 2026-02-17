import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '../common-rules';

// form zod validation schema
export const userFormSchema = z.object({
  firstName: z.string().min(1, { message: messages.firstNameIsRequired }),
  lastName: z.string().min(1, { message: messages.lastNameIsRequired }),
  email: validateEmail,
  mobile: z.string().regex(/^[0-9]{10}$/, {
    message: 'Mobile number must be exactly 10 digits',
  }),
  userType: z.string().min(1, { message: messages.roleIsRequired }),
  address: z.string().min(10, { message: 'Address is required' }),
  isActive: z.boolean({ required_error: 'Please select user status' }),
});

// generate form types from zod validation schema
export type UserFormInput = z.infer<typeof userFormSchema>;
