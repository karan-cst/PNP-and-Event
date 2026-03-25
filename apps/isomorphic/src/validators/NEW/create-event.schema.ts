import { z } from 'zod';

export const eventFormSchema = z.object({
  // 1️⃣ Basic Info
  eventType: z.enum(['Conference', 'Stall', 'briefing meeting'], {
    required_error: 'Event type is required',
  }),

  eventName: z.string().min(1, 'Event name is required'),

  startDate: z.date({
    required_error: 'Start date is required',
  }),

  endDate: z.date({
    required_error: 'End date is required',
  }),

  // 2️⃣ Venue Details
  location: z.object({
    addressLine1: z.string().min(1, 'Address Line 1 is required'),
    addressLine2: z.string().optional(),
    pincode: z.string().min(6, 'Valid pincode required'),
    state: z.string().min(1, 'State is required'),
    city: z.string().min(1, 'City is required'),
  }),

  // 3️⃣ Scope of Work
  scope: z.object({
    title: z.string().min(1, 'Scope title is required'),
    tentativeCost: z.coerce
      .number()
      .min(1, 'Tentative cost must be greater than 0'),
  }),

  // 4️⃣ Elements (Dynamic Items)
  elements: z
    .array(
      z.object({
        standardElementName: z.string().min(1, 'Element name required'),
        quantity: z.coerce.number().min(1, 'Quantity must be at least 1'),
        days: z.coerce.number().min(1, 'Days must be at least 1'),
        standardRate: z.coerce.number().min(0),
        total: z.coerce.number().min(0),
      })
    )
    .min(1, 'At least one element is required'),

  // 5️⃣ Client Section
  company: z.object({
    companyId: z.string().min(1, 'Client is required'),
    divisionName: z.array(z.string()).optional(),
    client: z.string().optional(),
    quotationFile: z.string(),
    emailFile: z.string(),
    clientTotal: z.number(),
  }),
  divisionName: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High'], {
    required_error: 'Priority is required',
  }),
});

export type CreateEventInput = z.infer<typeof eventFormSchema>;
