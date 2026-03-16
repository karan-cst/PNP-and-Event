export type Division = {
  id: string;
  company: { _id: string; name: string; isPharma: string };
  divisionCode: string;
  ccCode: string;
  team: string;
  createdAt: Date;
  isActive: string;
};
export type Client = {
  id: string;
  company: { _id: string; name: string; isPharma: string };
  division: { _id: string; divisionCode: string; team: string };
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  isActive: string;
};

export const DivisionData = [
  {
    id: 'DV001',
    company: { _id: 'C002', name: 'Intas', isPharma: 'pharma' },
    divisionCode: 'Arron',
    ccCode: '1199',
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: 'active',
    team: 'team1',
  },
  {
    id: 'DV002',
    company: { _id: 'C002', name: 'Intas', isPharma: 'pharma' },
    divisionCode: 'Altis',
    ccCode: '1198',
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: 'inactive',
    team: 'team1',
  },
];
export const DivisionClientData = [
  {
    id: 'DC001',
    company: { _id: 'C002', name: 'Intas', isPharma: 'pharma' },
    division: { _id: 'DV001', divisionCode: 'ARRON', team: 'team1' },
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '123-456-7890',
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: 'active',
  },
  {
    id: 'DC002',
    company: { _id: 'C002', name: 'Intas', isPharma: 'pharma' },
    division: { _id: 'DV001', divisionCode: 'ARRON', team: 'team2' },
    name: 'Sachin Patel',
    email: 'sachin.patel@example.com',
    phone: '098-765-4321',
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: 'inactive',
  },
];
