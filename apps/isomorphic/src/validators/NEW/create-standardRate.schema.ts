import { z } from 'zod';

// form zod validation schema
export const StandardRateFormSchema = z.object({
  eventType: z.string().trim().min(1, { message: 'Event Type is required' }),

  elementType: z
    .string()
    .trim()
    .min(1, { message: 'Element Type is required' }),

  elementItem: z
    .string()
    .trim()
    .min(1, { message: 'Element Item is required' }),

  tier1Price: z
    .number()
    .min(0, { message: 'Tier 1 price must be 0 or greater' }),

  tier2Price: z
    .number()
    .min(0, { message: 'Tier 2 price must be 0 or greater' }),

  tier3Price: z
    .number()
    .min(0, { message: 'Tier 3 price must be 0 or greater' }),

  createdAt: z.string().datetime({ message: 'Invalid date format' }),

  isActive: z.boolean(),
});
export type StandardRateFormInput = z.infer<typeof StandardRateFormSchema>;
