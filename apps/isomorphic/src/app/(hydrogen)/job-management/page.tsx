import { metaObject } from '@/config/site.config';
import JobTable from '@/app/shared/job-management/job-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Events() {
  return (
    <>
      <JobTable pageSize={10} />
    </>
  );
}
