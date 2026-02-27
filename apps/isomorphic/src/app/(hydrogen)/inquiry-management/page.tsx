import { metaObject } from '@/config/site.config';
import InquiryTable from '@/app/shared/inquiry-management/job-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Events() {
  return (
    <>
      <InquiryTable pageSize={10} />
    </>
  );
}
