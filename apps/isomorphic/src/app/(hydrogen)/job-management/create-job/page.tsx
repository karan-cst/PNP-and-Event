import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditJob from '@/app/shared/job-management/create-edit';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create Job',
  breadcrumb: [
    {
      href: '#',
      name: 'Job Management',
    },
    {
      href: routes.jobManagement.job,
      name: 'Jobs',
    },
    {
      name: 'Create',
    },
  ],
};

export default function CreateJobPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <Link
          href={routes.eCommerce.createProduct}
          className="mt-4 w-full @lg:mt-0 @lg:w-auto"
        >
          <Button as="span" className="w-full @lg:w-auto">
            <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
            Add Product
          </Button>
        </Link> */}
      </PageHeader>

      <CreateEditJob />
    </>
  );
}
