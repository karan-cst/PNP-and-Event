import Link from 'next/link';
import { PiPlusBold } from 'react-icons/pi';
import { routes } from '@/config/routes';
import { Button } from 'rizzui/button';
import PageHeader from '@/app/shared/page-header';
import { productsData } from '@/data/products-data';
import { metaObject } from '@/config/site.config';
import ExportButton from '@/app/shared/export-button';
import RolesTable from '@/app/shared/user-management/roles-list/role';

export const metadata = {
  ...metaObject('Products'),
};

const pageHeader = {
  title: 'Roles',
  breadcrumb: [
    {
      href: '#',
      name: 'User Management',
    },
    {
      name: 'Roles',
    },
  ],
};

export default function UserRoles() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          {/* <ExportButton
            data={productsData}
            fileName="product_data"
            header="ID,Name,Category,Product Thumbnail,SKU,Stock,Price,Status,Rating"
          /> */}
          {/* <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create User
            </Button>
          </Link> */}
        </div>
      </PageHeader>

      <RolesTable pageSize={10} />
    </>
  );
}
