import { metaObject } from '@/config/site.config';
import ClientTable from '@/app/shared/client-management/client-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function PNPClients() {
  return (
    <>
      <ClientTable pageSize={10} type={'PNP'} />
    </>
  );
}
