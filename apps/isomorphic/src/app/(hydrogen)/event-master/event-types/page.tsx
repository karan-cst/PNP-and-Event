import EventtypesTable from '@/app/shared/event-master/event-types/table';
import ProjectCategoriesTable from '@/app/shared/event-master/project-categories/table';
import PageHeader from '@/app/shared/page-header';

const pageHeader = {
  title: 'Project Categories',
  breadcrumb: [
    {
      href: '#',
      name: 'Event Master',
    },
    {
      name: 'Event Types',
    },
  ],
};

export default function UserRoles() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link
            href={routes.eCommerce.createProduct}
            className="w-full @lg:w-auto"
          >
            <Button as="span" className="w-full @lg:w-auto">
              <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
              Create User
            </Button>
          </Link>
        </div> */}
      </PageHeader>

      <EventtypesTable pageSize={10} />
    </>
  );
}
