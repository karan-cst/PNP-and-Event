import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditInquiry from '@/app/shared/inquiry-management/create-edit';

export const metadata = {
  ...metaObject('Create Product'),
};

const pageHeader = {
  title: 'Create Inquiry',
  breadcrumb: [
    {
      href: '#',
      name: 'Inquiry Management',
    },
    {
      href: routes.inquiryManagement.inquiry,
      name: 'Inquiries',
    },
    {
      name: 'Create',
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

      <CreateEditInquiry />
    </>
  );
}
