import { metaObject } from '@/config/site.config';
import UsersFinanceTable from '@/app/shared/user-management/users-list-finance/table';

export const metadata = {
  ...metaObject('Products'),
};

export default function Users() {
  return (
    <>
      <UsersFinanceTable pageSize={10} />
    </>
  );
}
