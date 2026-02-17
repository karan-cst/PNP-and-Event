import { metaObject } from '@/config/site.config';
import VendorPageHeader from '@/app/shared/vendor-management/pnp-vendor/pnp-page-header';
import VendorTable from '@/app/shared/vendor-management/pnp-vendor/vendor-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function PNPVendors() {
  return (
    <>
      {/* <VendorPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      /> */}

      <VendorTable pageSize={10} type={'PNP'} />
    </>
  );
}
