export type Division = {
  id: string;
  divisionCode: string;
  ccCode: string;
  createdAt: Date;
  isActive: string;
};

export const DivisionData = [
  {
    id: 'DC001',
    divisionCode: 'ARRON',
    ccCode: '1199',
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: 'active',
  },
  {
    id: 'DC002',
    divisionCode: 'Altis',
    ccCode: '1198',
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: 'inactive',
  },
];
