import { CreateEventInput } from '@/validators/NEW/create-event.schema';
import { CreateJobInput } from '@/validators/NEW/create-job.schema';
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

export function jobDefaultValues(event?: CreateJobInput) {
  return {
    // 1️⃣ Basic Job Info
    jobName: 'Product Brochure Printing',
    jobNo: 'ADR67101JUN/25-26',
    date: new Date('2026-02-15'),

    // 2️⃣ Accounting Codes
    glCode: '5153700007',
    sapCode: '2273043',
    ccCode: '1450',
    hsnCode: '49011020',

    // 3️⃣ Requester Info
    requisitionerName: 'Dhaval Patel',
    floor: '2nd Floor',
    division: 'ADRINA',

    // 4️⃣ Delivery Details
    totalQty: 4000,
    deliveryPlace: 'Matoda Warehouse',
    deliveryDate: new Date('2026-03-30'),
    packageQty: 100,
    deliveryComment: 'Handle with care. Avoid moisture.',

    // 5️⃣ Print Specifications
    size: '8.2 x 11.7 inches',
    paper: 'Standard Gloss Paper 130 GSM',
    colour: '4 Color (CMYK)',
    budget: 25000,

    // 6️⃣ Finishing Options
    lamination: true,
    matt: false,
    gloss: true,
    front: true,

    back: false,
    uv: false,
    vaidB2B: false,
    hBound: false,

    spiral: false,
    wiroWire: false,
    indexing: false,
    foil: false,

    otherLamination: '',
    specialInstructions: 'Ensure high resolution and accurate brand colors.',

    createdAt: new Date(),

    // 7️⃣ Job Type
    jobType: 'print',
    PrintExecutiveStatus: 'Approved',
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
