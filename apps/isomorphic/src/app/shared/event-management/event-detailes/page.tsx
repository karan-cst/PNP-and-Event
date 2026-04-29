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
import { formatPrice } from '@/config/format-pricing';

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

  const fields = [
    {
      id: 1,
      standardElementName: 'Banner',
      standardRate: 100,
      days: 5,
      quantity: 10,
      width: 10,
      length: 20,
      height: 15,
      depth: 5,
      sqft: 15000,
      amount: 750000,
    },
    {
      id: 2,
      standardElementName: 'Stall',
      standardRate: 15,
      days: 1,
      quantity: 1,
      width: 12,
      length: 24,
      height: 18,
      depth: 6,
      sqft: 31104,
      amount: 466560,
    },
  ];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="space-y-6 py-2">
        <EventHeader event={event} />
        <Title as="h4" className="fontSize-sm">
          Elements
        </Title>
        <div className="overflow-x-auto rounded-md border border-muted px-4">
          <table className="min-w-full text-sm">
            <thead className="border-b">
              <tr className="text-left">
                <th className="py-2 pr-4">Element</th>
                <th className="py-2 pr-4">Rate</th>
                <th className="py-2 pr-4">Days</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 pr-4">W x L x H x D</th>
                <th className="py-2 pr-4">Sqft</th>
                <th className="py-2 pr-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((row, idx) => (
                <tr key={row.id} className="border-b">
                  <td className="py-2 pr-4">
                    {(row as any).standardElementName}
                  </td>
                  <td className="py-2 pr-4">₹{(row as any).standardRate}</td>
                  <td className="py-2 pr-4">{(row as any).days}</td>
                  <td className="py-2 pr-4">{(row as any).quantity}</td>
                  <td className="py-2 pr-4">{`${(row as any).width ?? '-'} ${`x ${(row as any).length ?? '-'} `}${` x ${(row as any).height ?? '-'}`} ${`x ${(row as any).depth ?? '-'}`}`}</td>
                  <td className="py-2 pr-4">{(row as any).sqft ?? '-'}</td>
                  <td className="py-2 pr-4">
                    {formatPrice((row as any).amount) ?? '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
