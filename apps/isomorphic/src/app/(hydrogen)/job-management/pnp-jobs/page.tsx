import { metaObject } from '@/config/site.config';
import PNPjobsTable from '@/app/shared/job-management/pnp-jobs/pnpjobs-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Eventjobs() {
  return (
    <>
      <PNPjobsTable pageSize={10} />
    </>
  );
}
