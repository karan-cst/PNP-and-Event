import { metaObject } from '@/config/site.config';
import EventsTable from '@/app/shared/event-management/event-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Eventjobs() {
  return (
    <>
      <EventsTable pageSize={10} />
    </>
  );
}
