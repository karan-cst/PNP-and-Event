import { metaObject } from '@/config/site.config';
import DeliveryTable from '@/app/shared/delivery-management/delivery-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Events() {
  return (
    <>
      <DeliveryTable pageSize={10} />
    </>
  );
}
