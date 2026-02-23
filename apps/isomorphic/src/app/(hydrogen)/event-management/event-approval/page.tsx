import { metaObject } from '@/config/site.config';
import EventApproveTable from '@/app/shared/event-management/event-approval/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Events() {
  return (
    <>
      <EventApproveTable pageSize={10} />
    </>
  );
}
