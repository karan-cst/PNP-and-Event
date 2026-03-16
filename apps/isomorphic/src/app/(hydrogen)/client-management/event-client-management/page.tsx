import { metaObject } from '@/config/site.config';
import CompanyTable from '@/app/shared/client-management/client-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function PNPVendors() {
  return (
    <>
      <CompanyTable pageSize={10} type={'Event'} />
    </>
  );
}
