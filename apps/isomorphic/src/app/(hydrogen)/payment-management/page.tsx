import { metaObject } from '@/config/site.config';
import PaymentTable from '@/app/shared/payment-management/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function POManagement() {
  return (
    <>
      <PaymentTable pageSize={10} />
    </>
  );
}
