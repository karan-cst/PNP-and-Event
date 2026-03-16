import { z } from 'zod';
import { validateEmail } from '../common-rules';

export const companyFormSchema = z
  .object({
    companyName: z.string().min(1, { message: 'Comapny name is required' }),
    email: validateEmail,
    address: z.string().min(10, { message: 'Address is required' }),
    clientFrom: z.string().min(1, { message: 'Company type is required' }),
    isActive: z.string({ required_error: 'Company status is required' }),
    isGSTApplicable: z.coerce.boolean(),
    GSTNumber: z.string().nullable(),
    pannumber: z.string().nullable(),
    MSMECertificate: z.union([z.string(), z.instanceof(File)]).nullable(),
    GSTCertificate: z.union([z.string(), z.instanceof(File)]).nullable(),
  })
  .superRefine((data, ctx) => {
    console.log('ZOD VALIDATION RUNNING', data);
    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (data.isGSTApplicable) {
      if (!data.GSTNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'GST Number is required',
          path: ['GSTNumber'],
        });
      } else if (!gstRegex.test(data.GSTNumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid GST Number format',
          path: ['GSTNumber'],
        });
      }

      if (!data.pannumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'PAN Number is required',
          path: ['pannumber'],
        });
      } else if (!panRegex.test(data.pannumber)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid PAN Number format',
          path: ['pannumber'],
        });
      }

      if (!data.MSMECertificate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MSME Certificate is required',
          path: ['MSMECertificate'],
        });
      }
      if (!data.GSTCertificate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'GST Certificate is required',
          path: ['GSTCertificate'],
        });
      }
    }
  });
export type CompanyFormInput = z.infer<typeof companyFormSchema>;
//  mobile: z.string().regex(/^[0-9]{10}$/, {
//       message: 'Mobile number must be exactly 10 digits',
//     }),
// clientType: z.string().min(1, { message: 'Vendor type is required' }),
