import { metaObject } from '@/config/site.config';

import VendorTable from '@/app/shared/vendor-management/pnp-vendor/vendor-list/table';

export const metadata = {
  ...metaObject('Products'),
};

const pageHeader = {
  title: 'EVENT Vendors',
  breadcrumb: [
    {
      href: '#',
      name: 'Vendor Management',
    },
    {
      name: 'Event Vendors',
    },
  ],
};

export default function PNPVendors() {
  return (
    <>
      {/* <VendorPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      /> */}

      <VendorTable pageSize={10} type={'Event'} />
    </>
  );
}
