import { z } from 'zod';

export const giftInquirySchema = z.object({
  inquiryType: z.literal('Gift'),

  inputName: z.string().min(1, 'Input name is required'),

  qty: z.coerce.number().min(1, 'Quantity must be at least 1'),

  budget: z.coerce.number().min(0, 'Budget must be positive'),

  division: z.string().min(1, 'Division is required'),

  csName: z.string().min(1, 'CS name is required'),

  deliveryTimeline: z.coerce.date({
    required_error: 'Delivery timeline is required',
  }),

  deliveryPlace: z.string().min(1, 'Delivery place is required'),

  customized: z.boolean(),

  specialInstructions: z.string().max(1000, 'Too long').optional(),

  endUserOfGift: z.string().optional(),

  samples: z.array(z.any()).max(3, 'Max 3 files allowed'),
  jobType: z.array(
    z.enum(['print', 'gift'], {
      required_error: 'Job type is required',
    })
  ),
});

export type GiftInquiryFormType = z.infer<typeof giftInquirySchema>;
