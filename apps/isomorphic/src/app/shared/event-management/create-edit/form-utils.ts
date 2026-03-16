import { CreateEventInput } from '@/validators/NEW/create-event.schema';
import isEmpty from 'lodash/isEmpty';

export const customFields = [
  {
    label: '',
    value: '',
  },
];
export const locationShipping = [
  {
    name: '',
    shippingCharge: '',
  },
];
export const productVariants = [
  {
    label: '',
    value: '',
  },
];

export function eventDefaultValues(event?: CreateEventInput) {
  return {
    // 1️⃣ Basic Info
    eventType: event?.eventType ?? 'Conference',
    eventName: event?.eventName ?? '',
    startDate: event?.startDate ?? undefined,
    endDate: event?.endDate ?? undefined,

    // 2️⃣ Venue
    location: {
      addressLine1: event?.location?.addressLine1 ?? '',
      addressLine2: event?.location?.addressLine2 ?? '',
      pincode: event?.location?.pincode ?? '',
      state: event?.location?.state ?? '',
      city: event?.location?.city ?? '',
    },

    // 3️⃣ Scope
    scope: {
      title: event?.scope?.title ?? '',
      tentativeCost: event?.scope?.tentativeCost ?? undefined,
    },

    // 4️⃣ Elements (Dynamic Field Array)
    elements: isEmpty(event?.elements)
      ? [
          {
            standardElementName: '',
            quantity: 1,
            standardRate: undefined,
            total: undefined,
          },
        ]
      : event?.elements,

    // 5️⃣ Client Section
    divisionName: event?.divisionName ?? '',

    company: {
      companyId: event?.company?.companyId ?? '',
      divisionName: event?.company?.divisionName ?? '',
      client: event?.company?.client ?? '',
      // address: event?.company?.address ?? '',
      // contactName: event?.company?.contactName ?? '',
      // contactNumber: event?.company?.contactNumber ?? '',
    },

    // 6️⃣ Priority
    priority: event?.priority ?? 'Low',

    // 7️⃣ Coordinator
    // coordinatorId: event?.coordinatorId ?? '',
  };
}

export const typeOption = [
  {
    value: 'Stall',
    label: 'Stall',
  },
  {
    value: 'Conference',
    label: 'Conference',
  },
  {
    value: 'briefing meeting',
    label: 'Briefing Meeting',
  },
];
export const stateOption = [
  {
    value: 'Gujarat',
    label: 'Gujarat',
  },
  // {
  //   value: 'maharashtra',
  //   label: 'Maharashtra',
  // },
  // {
  //   value: 'rajasthan',
  //   label: 'Rajasthan',
  // },
];
export const cityOption = [
  {
    value: 'Ahmedabad',
    label: 'Ahmedabad',
  },
  {
    value: 'Surat',
    label: 'Surat',
  },
  {
    value: 'Rajkot',
    label: 'Rajkot',
  },
];

export const clients = [
  { id: '1', name: 'Intas', isPharma: true },
  { id: '2', name: 'Sun Pharma', isPharma: false },
  { id: '3', name: 'Cipla', isPharma: false },
];

export const productData = {
  title: 'Apple',
  description: 'Fresh Express Iceberg Garden Salad Blend',
  sku: 'SKU-28935',
  type: 'Digital Product',
  categories: 'Grocery',
  price: 10,
  costPrice: 20,
  retailPrice: 15,
  salePrice: 25,
  productImages: undefined,
  inventoryTracking: 'no',
  currentStock: '150',
  lowStock: '20',
  productAvailability: 'online',
  tradeNumber: '12345',
  manufacturerNumber: '154',
  brand: 'Foska',
  upcEan: 'Ean',
  customFields: [
    {
      label: 'Color',
      value: 'Red',
    },
  ],
  freeShipping: false,
  shippingPrice: 45,
  locationBasedShipping: true,
  locationShipping: [
    {
      name: 'USA',
      shippingCharge: '150',
    },
  ],
  pageTitle: 'apple',
  metaDescription: 'apple',
  metaKeywords: 'grocery, foods',
  productUrl: 'http://localhost:3000/',
  isPurchaseSpecifyDate: true,
  isLimitDate: true,
  dateFieldName: 'Date Field',
  productVariants: [
    {
      name: 'Jhon',
      value: '150',
    },
  ],
  tags: ['iPhone', 'mobile'],
};

export const menuItems = [
  {
    label: 'Summary',
    value: 'summary',
  },
  {
    label: 'Images & Gallery',
    value: 'images_gallery',
  },
  {
    label: 'Pricing & Inventory',
    value: 'pricing_inventory',
  },
  {
    label: 'Product Identifiers & Custom Fields',
    value: 'product_identifiers',
  },
  {
    label: 'Shipping & Availability',
    value: 'shipping_availability',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Variant Options',
    value: 'variant_options',
  },
];

// Category option
export const categoryOption = [
  {
    value: 'fruits',
    label: 'Fruits',
  },
  {
    value: 'grocery',
    label: 'Grocery',
  },
  {
    value: 'meat',
    label: 'Meat',
  },
  {
    value: 'cat food',
    label: 'Cat Food',
  },
];

// Type option
// export const typeOption = [
//   {
//     value: 'digital product',
//     label: 'Digital Product',
//   },
//   {
//     value: 'physical product',
//     label: 'Physical Product',
//   },
// ];

// Variant option
export const variantOption = [
  {
    value: 'single',
    label: 'Single',
  },
  {
    value: 'multiple',
    label: 'Multiple',
  },
];
