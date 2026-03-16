import { z } from 'zod';

// form zod validation schema
export const CategoryUpdateSchema = z
  .object({
    min_range: z.number().min(0),
    max_range: z.number().nullable(),
  })
  .refine(
    (data) => {
      if (data.max_range !== null) {
        return data.max_range > data.min_range;
      }
      return true;
    },
    {
      message: 'Max range must be greater than min range',
      path: ['max_range'],
    }
  );
// generate form types from zod validation schema
export type CategoryUpdateInput = z.infer<typeof CategoryUpdateSchema>;
