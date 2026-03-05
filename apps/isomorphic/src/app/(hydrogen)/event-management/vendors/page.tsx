'use client';

import { useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import VendorUploadModal from '@/app/shared/event-management/vendor-upload/vendorUpload';
import VendorsTable from '@/app/shared/event-management/vendorTable';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { VendorDataType } from '@/app/shared/vendor-management/pnp-vendor/vendor-list/table';
import { vendorData } from '@/data/vendor-data';

export default function Vendors() {
  const [vendors, setVendors] = useState([
    {
      vendorName: 'Medcom',
      name: 'Ankit Gandhi',
      total: 10000,
      emlFileUrl: 'emailurl',
      excelFileUrl: 'excelFileUrl',
    },
  ]);
  const eventDetails = {
    eventType: 'Stall',
    eventName: 'Cardio Annual Summit 2026',
    city: 'Ahmedabad',
    fromDate: '19/02/2026',
    toDate: '21/02/2026',
    tier: 1,
    stdTotal: 100000,
  };
  const { openModal, closeModal } = useModal();

  const pageHeader = {
    title: 'Vendors',
    breadcrumb: [
      { href: '#', name: 'Event Management' },
      { href: '/event-management', name: 'Events' },
      { name: 'Vendors' },
    ],
  };

  const handleOpenModal = (rowData = null) => {
    openModal({
      view: (
        <VendorUploadModal rowData={rowData} onClose={() => closeModal()} />
      ),
    });
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mb-4 flex justify-end">
          <Button onClick={() => handleOpenModal()}>
            <PiPlusBold className="mr-2" />
            Add Vendor
          </Button>
        </div>
      </PageHeader>

      <div className="mb-6 rounded-md border border-muted bg-gray-50 p-4">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div>
            <span className="text-gray-500">Type:</span>{' '}
            <span className="font-medium">{eventDetails.eventType}</span>
          </div>

          <div>
            <span className="text-gray-500">Event:</span>{' '}
            <span className="font-medium">{eventDetails.eventName}</span>
          </div>

          <div>
            <span className="text-gray-500">Std Total:</span>{' '}
            <span className="font-medium">
              Rs. {eventDetails?.stdTotal || '-'}
            </span>
          </div>

          <div>
            <span className="text-gray-500">City:</span>{' '}
            <span className="font-medium">{eventDetails.city}</span>
          </div>
          <div>
            <span className="text-gray-500">Tier:</span>{' '}
            <span className="font-medium">{eventDetails.tier}</span>
          </div>

          <div>
            <span className="text-gray-500">Duration:</span>{' '}
            <span className="font-medium">
              {eventDetails.fromDate} - {eventDetails.toDate}
            </span>
          </div>
        </div>
      </div>

      {vendors.length > 0 && <VendorsTable vendors={vendors} />}
    </>
  );
}
