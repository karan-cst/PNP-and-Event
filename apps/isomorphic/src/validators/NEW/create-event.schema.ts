import { optional, z } from 'zod';

const optionalNumber = z.preprocess((val) => {
  // Convert empty input to undefined
  if (val === '' || val === null || val === undefined) return undefined;

  // Convert string to number
  const n = typeof val === 'string' ? Number(val) : val;

  // If not a valid number, keep as-is so Zod throws a proper error
  return Number.isFinite(n) ? n : val;
}, z.number().optional());

export const eventElementSchema = z.object({
  standardElementName: z.string().optional(),
  width: optionalNumber,
  length: optionalNumber,
  height: optionalNumber,
  depth: optionalNumber,

  days: z.coerce.number().min(1, 'Days must be at least 1'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
  standardRate: z.coerce.number().min(0, 'Rate cannot be negative'),
  sqft: optionalNumber, // derived
  total: optionalNumber, // derived
});

// In your main schema:
// export const eventFormSchema = z.object({
//   // ...
//   elements: z.array(eventElementSchema).optional(),
// });

export const eventFormSchema = z.object({
  // 1️⃣ Basic Info
  eventType: z.enum(['Conference', 'Stall', 'briefing meeting'], {
    required_error: 'Event type is required',
  }),
  eventName: z.string().min(1, 'Event name is required'),
  formNo: z.string().optional(),
  startDate: z.date({
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
  }),
  possessionDate: z.date({
    required_error: 'Possesion date and time is required',
  }),
  stallType: z
    .enum(['fabricated', 'frame'], {
      required_error: 'Stall type is required',
    })
    .optional(),
  stallSize: z.coerce.number().optional(),
  sideOpen: z.coerce.number().min(0).max(4).optional(),

  location: z.object({
    addressLine1: z.string().min(1, 'Address Line 1 is required'),
    addressLine2: z.string().optional(),
    pincode: z.string().min(6, 'Valid pincode required'),
    state: z.string().min(1, 'State is required'),
    city: z.string().min(1, 'City is required'),
  }),
  elements: z
    .array(eventElementSchema)
    .min(1, 'At least one element is required'),
  elementDraft: eventElementSchema.optional(),

  // 5️⃣ Client Section
  company: z.object({
    companyId: z.string().min(1, 'Client is required'),
    divisionName: z.array(z.string()).optional(),
    client: z.string().optional(),
    emailFile: z.string(),
  }),
  divisionName: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High'], {
    required_error: 'Priority is required',
  }),
});

export type CreateEventInput = z.infer<typeof eventFormSchema>;
