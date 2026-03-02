export type standardRateType = {
  id: number;
  eventType: string;
  elementType: string;
  elementItem: string;
  tier1Price: number;
  tier2Price: number;
  tier3Price: number;
  createdAt: string;
  isActive: string;
  src?: string;
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
    isActive: 'active',
    src: 'https://nuansdesign.com/wp-content/uploads/2022/01/bt-design-mentor-conferene-chair-premium-S-2.jpg',
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
    isActive: 'active',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8iR2gXtsZZ3N6f-5NvDK-3NXJn6Z-RkBiqg&s',
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
    isActive: 'inactive',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROtpYzLMSH71ZwqrZ9UwZfpnQJUHdjNriBrA&s',
  },
];
