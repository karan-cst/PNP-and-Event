import { metaObject } from '@/config/site.config';
import JobTrackerTable from '@/app/shared/job-management/job-tracker/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function EventTracker() {
  return (
    <>
      <JobTrackerTable pageSize={10} />
    </>
  );
}
