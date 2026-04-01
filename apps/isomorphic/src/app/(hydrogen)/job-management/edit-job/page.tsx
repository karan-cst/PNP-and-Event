import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditJob from '@/app/shared/job-management/create-edit';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Edit Job',
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
      name: 'Edit',
    },
  ],
};

export default function CreateJobPage() {
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditJob />
    </>
  );
}
