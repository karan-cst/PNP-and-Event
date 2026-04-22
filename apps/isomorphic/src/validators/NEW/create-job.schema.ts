import { z } from 'zod';

const giftInstructionSchema = z.object({
  giftingType: z.enum(['branded', 'non_branded'], {
    required_error: 'Gifting type is required',
  }),
  logoType: z.enum(['logo', 'customized'], {
    required_error: 'Logo type is required',
  }),
  colorType: z.enum(['four_color', 'single_color'], {
    required_error: 'Color type is required',
  }),
  engraveType: z.enum(['engrave', 'laser'], {
    required_error: 'Engrave type is required',
  }),
  printingType: z.enum(['screen', 'other'], {
    required_error: 'Printing type is required',
  }),
});

export const jobFormSchema = z
  .object({
    // 1️⃣ Basic Job Info
    jobName: z.string().min(1, 'Job name is required'),
    date: z.coerce.date({
      required_error: 'Date is required',
    }),
    glCode: z.string().min(1, 'GL Code is required'),
    hsnCode: z.string().min(1, 'HSN Code is required'),
    packingTypes: z
      .array(
        z.enum(['bubble', 'shrink', 'thermocol', 'polythin', 'bibo'], {
          required_error: 'At least one packing type is required',
        })
      )
      .min(1, 'At least one packing type must be selected'),
    requisitionerName: z.string().min(1, 'Requisitioner name is required'),
    floor: z.string().min(1, 'Floor is required'),
    masterDivision: z.string().optional(),
    sbuDivision: z.string().optional(),
    divisions: z
      .array(
        z.object({
          division: z.string().min(1, 'Division is required'),
          sapCode: z.string().min(1, 'SAP Code is required'),
          ccCode: z.string().min(1, 'CC Code is required'),
          Qty: z.coerce.number().min(1, 'Total quantity must be at least 1'),
          deliveryPlace: z.string().min(1, 'Delivery place is required'),
        })
      )
      .min(1, 'At least one division must be selected'),
    totalQty: z.coerce.number().min(1, 'Total quantity must be at least 1'),
    masterBoxQty: z.coerce
      .number()
      .min(1, 'Master box quantity must be at least 1'),

    // deliveryPlace: z.string().min(1, 'Delivery place is required'),

    deliveryDate: z.coerce.date({
      required_error: 'Delivery date is required',
    }),

    packageQty: z.coerce.number().min(1, 'Package quantity must be at least 1'),

    deliveryComment: z.string().optional(),

    // 5️⃣ Print Specifications
    size: z.string().min(1, 'Size is required'),

    paper: z.string().min(1, 'Paper type is required'),

    colour: z.string().min(1, 'Colour is required'),

    budget: z
      .union([z.coerce.number().min(0, 'Budget must be positive'), z.null()])
      .optional(),

    // 6️⃣ Finishing Options
    lamination: z.boolean(),
    matt: z.boolean(),
    gloss: z.boolean(),
    front: z.boolean(),

    back: z.boolean(),
    uv: z.boolean(),
    vaidB2B: z.boolean(),
    hBound: z.boolean(),

    spiral: z.boolean(),
    wiroWire: z.boolean(),
    indexing: z.boolean(),
    foil: z.boolean(),

    otherLamination: z.string().optional(),
    specialInstructions: z.array(
      z.object({
        text: z
          .string()
          .min(2, 'Instruction must be at least 2 characters long'),
        descriptionStatus: z.enum(['approved', 'rejected'], {
          required_error: 'Description status is required',
        }),
      })
    ),
    createdAt: z.coerce.date().optional(),
    jobType: z.array(
      z.enum(['print', 'gift'], {
        required_error: 'Job type is required',
      })
    ),

    PrintExecutiveStatus: z.enum(['Approved', 'Rejected'], {
      required_error: 'Print executive status is required',
    }),

    giftSpecialInstructions: z
      .array(
        z.object({
          text: z
            .string()
            .min(2, 'Instruction must be at least 2 characters long'),
          descriptionStatus: z.enum(['approved', 'rejected'], {
            required_error: 'Description status is required',
          }),
        })
      )
      .optional(),

    giftInstruction: giftInstructionSchema.optional(),
  })
  .superRefine((data, ctx) => {
    console.log(data.jobType);
    if (!data.masterDivision?.trim() && !data.sbuDivision?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Either Master Division or SBU Division is required',
        path: ['masterDivision'],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Either Master Division or SBU Division is required',
        path: ['sbuDivision'],
      });
    }
    if (data.jobType?.includes('gift')) {
      if (!data.giftInstruction) {
        ctx.addIssue({
          path: ['giftInstruction'],
          code: z.ZodIssueCode.custom,
          message: 'Gift instruction is required when job type includes gift',
        });
        return;
      }

      const result = giftInstructionSchema.safeParse(data.giftInstruction);

      if (!result.success) {
        result.error.issues.forEach((issue) => {
          ctx.addIssue({
            ...issue,
            path: ['giftInstruction', ...(issue.path || [])],
          });
        });
      }
    }
  });

export type CreateJobInput = z.infer<typeof jobFormSchema>;
