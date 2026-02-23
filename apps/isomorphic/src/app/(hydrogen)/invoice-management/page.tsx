import { metaObject } from '@/config/site.config';

import InvoiceTable from '@/app/shared/invoice-management/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function POManagement() {
  return (
    <>
      <InvoiceTable pageSize={10} />
    </>
  );
}
