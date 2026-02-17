import { metaObject } from '@/config/site.config';
import UsersTable from '@/app/shared/user-management/users-list/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Users() {
  return (
    <>
      <UsersTable pageSize={10} />
    </>
  );
}
