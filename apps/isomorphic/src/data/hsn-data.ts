export type HSN = {
  id: string;
  HSNCode: string;
  description: string;
  title: string;
  subtitle: string;
  gst: number;
  createdAt: Date;
  isActive: boolean;
};

export const HSNData = [
  {
    id: 'HSN001',
    HSNCode: '49119990 ',
    description: 'BOOKLET MAGAZINE',
    title: 'MONOGRAPH ',
    subtitle: 'SOUVENIER',
    gst: 12,
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: false,
  },
  {
    id: 'HSN002',
    HSNCode: '49119990',
    description: 'CATALOGUES PRODCT CATALOGUE',
    title: 'DETAILER',
    subtitle: 'VISUAL AID',
    gst: 12,
    createdAt: '2026-02-10T16:01:40.021Z',
    isActive: false,
  },
];
