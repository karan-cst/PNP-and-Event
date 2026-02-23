import { z } from 'zod';

// Password regex:
// - 8 to 16 characters
// - At least 1 uppercase
// - At least 1 lowercase
// - At least 1 number
// - At least 1 special character
// - Alphanumeric + special characters allowed
// const passwordRegex =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d[^A-Za-z\d]]{8,16}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,16}$/;

export const PasswordChangeFormSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be at most 16 characters')
      .regex(
        passwordRegex,
        'Password must contain uppercase, lowercase, number and special character'
      ),

    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password must be at most 16 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // error shows under confirmPassword
  });

export type PasswordFormFormInput = z.infer<typeof PasswordChangeFormSchema>;
