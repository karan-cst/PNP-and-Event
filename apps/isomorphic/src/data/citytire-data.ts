export type cityTireType = {
  id: number;
  tierType: number;
  city: string;
  state: string;
  minimumProfitMargin: number;
  isActive: string;
  createdAt: string;
};

export const cityTireData: cityTireType[] = [
  {
    id: 1,
    tierType: 1,
    city: 'Ahmedabad',
    state: 'Gujarat',
    minimumProfitMargin: 15,
    isActive: 'active',
    createdAt: '2026-02-16T10:30:00Z',
  },
  {
    id: 2,
    tierType: 1,
    city: 'Surat',
    state: 'Gujarat',
    minimumProfitMargin: 15,
    isActive: 'active',
    createdAt: '2026-02-16T10:30:00Z',
  },
  {
    id: 3,
    tierType: 2,
    city: 'Vadodara',
    state: 'Gujarat',
    minimumProfitMargin: 15,
    isActive: 'inactive',
    createdAt: '2026-02-16T10:30:00Z',
  },
];
