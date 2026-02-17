import { metaObject } from '@/config/site.config';
import VendorPageHeader from '@/app/shared/vendor-management/pnp-vendor/pnp-page-header';
import VendorTable from '@/app/shared/vendor-management/pnp-vendor/vendor-list/table';
import ClientPageHeader from '@/app/shared/client-management/pnp-client/pnp-page-header';
import ClientTable from '@/app/shared/client-management/pnp-client/client-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function PNPClients() {
  return (
    <>
      <ClientTable pageSize={10} type={'PNP'} />
    </>
  );
}
