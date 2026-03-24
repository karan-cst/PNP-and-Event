import { metaObject } from '@/config/site.config';
import VendorApproveTable from '@/app/shared/event-management/vendor-approval/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function EventTracker() {
  return (
    <>
      <VendorApproveTable pageSize={10} />
    </>
  );
}
