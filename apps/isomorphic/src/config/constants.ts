export const CART_KEY = 'isomorphic-cart';
export const POS_CART_KEY = 'isomorphic-pos-cart';
export const DUMMY_ID = 'FC6723757651DB74';
export const CHECKOUT = 'isomorphic-checkout';
export const CURRENCY_CODE = 'USD';
export const LOCALE = 'en';
export const CURRENCY_OPTIONS = {
  formation: 'en-US',
  fractions: 2,
};

export const ROW_PER_PAGE_OPTIONS = [
  {
    value: 5,
    name: '5',
  },
  {
    value: 10,
    name: '10',
  },
  {
    value: 15,
    name: '15',
  },
  {
    value: 20,
    name: '20',
  },
];

export const ROLES = {
  Administrator: 'Administrator',
  Manager: 'Manager',
  Sales: 'Sales',
  Support: 'Support',
  Developer: 'Developer',
  HRD: 'HR Department',
  RestrictedUser: 'Restricted User',
  Customer: 'Customer',
} as const;

export const USERTYPE = {
  SuperAdmin: 'Super Admin',
  Admin: 'Admin',
  EventTeam: 'Event Team - User',
  OperationHeadEvent: 'Operation Head - Event',
  EventHead: 'Event Head',
  CS: 'CS',
  OperationHeadPnP: 'Operation Head - PnP',
  BusinessHeadPnp: 'Business Head - PnP',
  PrintExecutivePnP: 'Print Executive - PnP',
  PrintManagerPnP: 'Print Manager - PnP',
  GiftManagerPnP: 'Gift Manager - PnP',
  PNPHead: 'PNP Head',
  DeliveryManagerPnP: 'Delivery Manager - PnP',
  FinanceExecutive: 'Finance Executive',
  FinanaceManager: 'Finanace Manager',
  FinanceHead: 'Finance Head',
} as const;

export const VENDORTYPE = {
  PNPVendor: 'PNP Vendor',
  EVENTVendor: 'Event Vendor',
} as const;

export const CLIENTTYPE = {
  PNPClient: 'PNP Client',
  EVENTClient: 'Event Client',
} as const;

export const WEEKDAYTYPE = {
  Mon: 'Mon',
  Tue: 'Tue',
  Wed: 'wed',
  Thu: 'Thu',
  Fri: 'Fri',
  Sat: 'Sat',
  Sun: 'Sun',
};
