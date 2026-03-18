'use client';
import { EventApproveData } from '@/data/eventApprovalData';
import { useSession } from 'next-auth/react';
import PageHeader from '../../page-header';
import EventHeader from './event-view/event-header';
import { dummyEventViewData } from '@/data/event-management.data';
import VendorsTable from './vendorTable';
import { Title } from 'rizzui/typography';
import SelectedVendorTable from './selectedVendor';
import EventApprovalTable from './eventApproval';

export type EventApproveDataType = (typeof EventApproveData)[number];

export default function EventDetailesPage() {
  const event = dummyEventViewData;
  const { data: session } = useSession();
  const role = session?.user.role;
  const pageHeader = {
    title: 'Events',
    breadcrumb: [
      {
        href: '#',
        name: 'Event Management',
      },
      {
        name: 'Event Detailes',
      },
    ],
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="space-y-6 py-2">
        <EventHeader event={event} />
        <Title as="h4" className="fontSize-sm border-b border-muted/50 pb-1">
          Vendors
        </Title>
        {event.vendors ? (
          <VendorsTable vendors={event.vendors} />
        ) : (
          'No vendors added yet.'
        )}
        <Title as="h4" className="fontSize-sm border-b border-muted/50 pb-1">
          Finalized Vendor
        </Title>
        {event.selectedVendor ? (
          <SelectedVendorTable
            vendors={[
              {
                vendorName: event.selectedVendor?.vendorName || '',
                total: 100000,
                emailUrl: 'http://vendor3.com',
                excelUrl: 'http://dummy-po.com',
                selectBy: 'Karan Jain',
                reasonToChoose: event.finalizedBy?.reason || '',
              },
            ]}
          />
        ) : (
          'No vendors added yet.'
        )}

        <Title as="h4" className="fontSize-sm border-b border-muted/50 pb-1">
          Event Approvals
        </Title>
        {event.EventApproval ? (
          <EventApprovalTable approvals={[event.EventApproval]} />
        ) : (
          'No approval data available.'
        )}

        <Title as="h4" className="fontSize-sm border-b border-muted/50 pb-1">
          PO Approvals
        </Title>
        {event.POApproval ? (
          <EventApprovalTable approvals={[event.POApproval]} />
        ) : (
          'No approval data available.'
        )}
      </div>
    </>
  );
}
