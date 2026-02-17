export type standardRateType = {
  id: number;
  eventType: string;
  elementType: string;
  elementItem: string;
  tier1Price: number;
  tier2Price: number;
  tier3Price: number;
  createdAt: string;
  isActive: boolean;
};

export const standardRateData = [
  {
    id: 1,
    eventType: 'Conference',
    elementType: 'Stage Setup',
    elementItem: 'Chair',
    tier1Price: 100,
    tier2Price: 90,
    tier3Price: 80,
    createdAt: '2026-02-16T10:30:00Z',
    isActive: true,
  },
  {
    id: 2,
    eventType: 'Stall',
    elementType: 'Sound Box',
    elementItem: '3D Box',
    tier1Price: 100,
    tier2Price: 95,
    tier3Price: 85,
    createdAt: '2026-02-16T10:30:00Z',
    isActive: true,
  },
  {
    id: 3,
    eventType: 'Lighting',
    elementType: 'Item Name',
    elementItem: 'Halogen Light',
    tier1Price: 100,
    tier2Price: 80,
    tier3Price: 75,
    createdAt: '2026-02-16T10:30:00Z',
    isActive: false,
  },
];
