import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditEvent from '@/app/shared/event-management/create-edit';

export const metadata = {
  ...metaObject('Edit Event'),
};
interface PageProps {
  params: {
    id: string;
  };
}

const pageHeader = {
  title: 'Edit Event',
  breadcrumb: [
    {
      href: '#',
      name: 'Event Management',
    },
    {
      href: routes.eventManagement.event,
      name: 'Events',
    },
    {
      name: 'Edit',
    },
  ],
};

export default function EditEventPage({ params }: PageProps) {
  const { id } = params;
  // const event = dummyEvents.find((item) => item.id === id);
  return (
    <>
      <PageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
      ></PageHeader>

      <CreateEditEvent slug={id} />
    </>
  );
}
