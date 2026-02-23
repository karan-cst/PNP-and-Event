import { metaObject } from '@/config/site.config';
import EventTrackerTable from '@/app/shared/event-management/event-tracker/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function EventTracker() {
  return (
    <>
      <EventTrackerTable pageSize={10} />
    </>
  );
}
