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
import { Tooltip } from 'rizzui/tooltip';
import { Button } from 'rizzui/button';
import { IoMdArrowBack } from 'react-icons/io';
import { VendorPriceCompairView } from '../vendor-price-compair-view/vendorPriceCompair';
import { useModal } from '../../modal-views/use-modal';
import { useRouter } from 'next/navigation';
import VendorUploadModal from '../vendor-upload/vendorUpload';
import { PiPlusBold } from 'react-icons/pi';

export type EventApproveDataType = (typeof EventApproveData)[number];

export default function EventDetailesPage() {
  const router = useRouter();
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

  const { openModal, closeModal } = useModal();
  const handleOpenModal = (rowData = null) => {
    openModal({
      view: (
        <VendorUploadModal rowData={rowData} onClose={() => closeModal()} />
      ),
    });
  };
  const handleOpenPriceModal = () => {
    openModal({
      view: <VendorPriceCompairView onClose={() => closeModal()} />,
      customSize: 900,
    });
  };
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="space-y-6 py-2">
        <EventHeader event={event} />
        <div className="mb-2 flex items-center justify-between">
          <Title as="h4" className="fontSize-sm border-b border-muted/50 pb-1">
            Vendors
          </Title>
          <div className="flex justify-end gap-2">
            <Tooltip size="sm" content="Back" placement="top" color="invert">
              <Button onClick={() => router.push('/event-management')}>
                <IoMdArrowBack className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Button onClick={() => handleOpenPriceModal()}>
              <PiPlusBold className="mr-2" />
              compare Price
            </Button>
            <Button onClick={() => handleOpenModal()}>
              <PiPlusBold className="mr-2" />
              Add Vendor
            </Button>
          </div>
        </div>

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
