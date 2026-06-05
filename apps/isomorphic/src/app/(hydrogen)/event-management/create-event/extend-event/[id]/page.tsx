import { metaObject } from '@/config/site.config';
import PageHeader from '@/app/shared/page-header';
import { routes } from '@/config/routes';
import CreateEditEvent from '@/app/shared/event-management/create-edit';

export const metadata = {
  ...metaObject('Extend Event'),
};
interface PageProps {
  params: {
    id: string;
  };
}

const pageHeader = {
  title: 'Extend Event',
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
      name: 'Extend',
    },
  ],
};

export default function ExtendEventPage({ params }: PageProps) {
  const { id } = params;
  // call event based on id and pass it to CreateEditEvent component to prefill the form and then allow user to edit and create a new event based on that, same for extend job
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
