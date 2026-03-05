import { metaObject } from '@/config/site.config';
import UsersPNPTable from '@/app/shared/user-management/users-list-pnp/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Users() {
  return (
    <>
      <UsersPNPTable pageSize={10} />
    </>
  );
}
