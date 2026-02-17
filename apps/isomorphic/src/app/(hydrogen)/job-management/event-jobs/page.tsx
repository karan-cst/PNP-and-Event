import { metaObject } from '@/config/site.config';
import EventjobsTable from '@/app/shared/job-management/event-jobs/eventjobs-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Eventjobs() {
  return (
    <>
      <EventjobsTable pageSize={10} />
    </>
  );
}
