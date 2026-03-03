export type EventDataType = {
  id: number;
  eventName: string;
  isPharma: string;
  divisionName: string | null;
  clientName: string | null;
  eventType: 'Conference' | 'Stall' | 'briefing meeting';

  stdTotal: number;
  vendor1Total?: number | null;
  vendor2Total?: number | null;
  vendor3Total?: number | null;
  vendor4Total?: number | null;
  vendor5Total?: number | null;

  lowestVendorName?: string;

  finalizedBy?: string | null;
  finalizedVendorName?: string | null;
  reasonToChoose?: string | null;
};

export const eventDummyData: EventDataType[] = [
  {
    id: 1,
    eventName: 'Cardio Annual Summit 2026',
    isPharma: 'pharma',
    divisionName: 'Intas - Cardio Division',
    clientName: null,
    eventType: 'Conference',

    stdTotal: 100000,
    vendor1Total: 100000,
    vendor2Total: 105000,
    vendor3Total: 110000,
    vendor4Total: 115000,
    vendor5Total: 103000,

    lowestVendorName: 'Vendor 1',

    finalizedBy: 'Amit (ET)',
    finalizedVendorName: 'Vendor 1',
    reasonToChoose: 'Competitive pricing with prior experience',
  },
  {
    id: 2,
    eventName: 'Neuro Expo 2026',
    isPharma: 'pharma',
    divisionName: 'Intas - Neuro Division',
    clientName: null,
    eventType: 'Stall',

    stdTotal: 200010,
    vendor1Total: 220010,

    lowestVendorName: 'Vendor 2',

    finalizedBy: 'Ankit (EH)',
    finalizedVendorName: 'Vendor 1',
    reasonToChoose: 'Better stall design quality',
  },
  {
    id: 3,
    eventName: 'Gastro Experts Meet',
    isPharma: 'pharma',
    divisionName: 'Intas - Gastro Division',
    clientName: null,
    eventType: 'Conference',

    stdTotal: 500001,

    finalizedBy: null,
    finalizedVendorName: null,
    reasonToChoose: null,
  },
  {
    id: 4,
    eventName: 'Healthcare Leadership Forum',
    isPharma: 'non-pharma',
    divisionName: null,
    clientName: 'Sun Pharma',
    eventType: 'Conference',

    stdTotal: 100000,
    vendor1Total: 100000,
    vendor2Total: 102000,
    vendor3Total: 108000,

    lowestVendorName: 'Vendor 1',

    finalizedBy: 'Amit (ET)',
    finalizedVendorName: 'Vendor 1',
    reasonToChoose: 'Long-term vendor partnership',
  },
  {
    id: 5,
    eventName: 'National Medical Expo',
    isPharma: 'non-pharma',
    divisionName: null,
    clientName: 'Cipla',
    eventType: 'Stall',

    stdTotal: 200010,
    vendor1Total: 220010,
    vendor2Total: 210010,
    vendor3Total: 215000,

    lowestVendorName: 'Vendor 2',

    finalizedBy: 'Ankit (EH)',
    finalizedVendorName: 'Vendor 2',
    reasonToChoose: 'Creative execution approach',
  },
  {
    id: 6,
    eventName: 'Product Briefing 2026',
    isPharma: 'non-pharma',
    divisionName: null,
    clientName: 'Dr. Reddy’s',
    eventType: 'briefing meeting',

    stdTotal: 150000,
    vendor1Total: 155000,
    vendor2Total: 148000,
    vendor3Total: 160000,

    lowestVendorName: 'Vendor 2',

    finalizedBy: null,
    finalizedVendorName: null,
    reasonToChoose: null,
  },
];
