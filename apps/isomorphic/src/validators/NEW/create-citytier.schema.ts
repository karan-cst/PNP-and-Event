import { z } from 'zod';

// form zod validation schema
export const CityTierFormSchema = z.object({
  tierType: z.coerce.number().min(1, { message: 'Tier Type is required' }),

  city: z.string().trim().min(1, { message: 'City is required' }),

  state: z.string().trim().min(1, { message: 'State is required' }),

  minimumProfitMargin: z.coerce
    .number()
    .min(0, { message: 'Profit margin must be 0 or greater' })
    .max(100, { message: 'Profit margin cannot exceed 100%' }),

  isActive: z.string(),
});
export type CityTierFormInput = z.infer<typeof CityTierFormSchema>;
