import JobArchiveTable from '@/app/shared/archive/pnp-jobs/table';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Products'),
};

export default function Eventjobs() {
  return (
    <>
      <JobArchiveTable pageSize={10} />
    </>
  );
}
