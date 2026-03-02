export type GlCode = {
  id: string;
  glCode: number;
  jobPurpose: string;
  createdAt: Date;
  isActive: string;
};

export const GlCodeData = [
  {
    id: 'GL001',
    glCode: 110101,
    jobPurpose: 'ABC',
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: 'active',
  },
];
