export type ProjectCategoriesType = {
  _id: string;
  category: string;
  min_range: number;
  max_range: number | null;
  vendorSelectionBy: { user: string; description: string };
  vendorApprovalBy: { user: string; description: string };
};

export const ProjectCategoryData = [
  {
    category: 'A+',
    min_range: 2000001,
    max_range: null,
    vendorSelectionBy: {
      user: 'Event Head User',
      description: '1st level - Selection Vendor and Negotiation',
    },
    vendorApprovalBy: {
      user: 'Finance Head User',
      description: '2nd Level - Negotiation',
    },
  },
  {
    category: 'A',
    min_range: 1000001,
    max_range: 2000000,
    vendorSelectionBy: {
      user: 'Event Head User',
      description: '1st level - Selection Vendor and Negotiation',
    },
    vendorApprovalBy: {
      user: 'Finance Head User',
      description: '2nd Level - Negotiation',
    },
  },
  {
    _id: '3',
    category: 'B',
    min_range: 500001,
    max_range: 1000000,
    vendorSelectionBy: {
      user: 'Event Head User',
      description: '1st level - Selection Vendor and Negotiation',
    },
    vendorApprovalBy: {
      user: 'Finance Head User',
      description: '2nd Level - Negotiation',
    },
  },
  {
    _id: '4',
    category: 'C',
    min_range: 100001,
    max_range: 500000,
    vendorSelectionBy: {
      user: 'Operational Head User',
      description: '1st level - Selection Vendor and Negotiation',
    },
    vendorApprovalBy: {
      user: 'Event Head User',
      description: '2nd Level - Negotiation',
    },
  },
  {
    _id: '5',
    category: 'D',
    min_range: 0,
    max_range: 100000,
    vendorSelectionBy: {
      user: 'Event Team User',
      description: '1st level - Upload, Selection Vendor and Negotiation',
    },
    vendorApprovalBy: {
      user: 'Event Manager User',
      description: '2nd Level - Approval/Rejection and Negotiation',
    },
  },
];
