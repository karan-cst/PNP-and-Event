import { metaObject } from '@/config/site.config';
import POTable from '@/app/shared/po-management/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function InvoiceManagement() {
  return (
    <>
      <POTable pageSize={10} />
    </>
  );
}
