import { metaObject } from '@/config/site.config';
import ClientApproveTable from '@/app/shared/event-management/client-approval/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function ClientApprove() {
  return (
    <>
      <ClientApproveTable pageSize={10} />
    </>
  );
}
