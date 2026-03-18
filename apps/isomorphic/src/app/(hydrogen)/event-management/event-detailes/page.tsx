import { metaObject } from '@/config/site.config';
import EventDetailesPage from '@/app/shared/event-management/event-detailes/page';

export const metadata = {
  ...metaObject('Products'),
};

export default function Events() {
  return (
    <>
      <EventDetailesPage pageSize={10} />
    </>
  );
}
