import { metaObject } from '@/config/site.config';
import VendorTable from '@/app/shared/vendor-management/pnp-vendor/vendor-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function PNPVendors() {
  return (
    <>
      <VendorTable pageSize={10} type={'PNP'} />
    </>
  );
}
