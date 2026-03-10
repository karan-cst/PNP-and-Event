'use client';

import { useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import { ActionIcon, Button, Tooltip } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import { IoMdArrowBack } from 'react-icons/io';
import VendorUploadModal from '@/app/shared/event-management/vendor-upload/vendorUpload';
import VendorsTable from '@/app/shared/event-management/vendorTable';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { VendorDataType } from '@/app/shared/vendor-management/pnp-vendor/vendor-list/table';
import { vendorData } from '@/data/vendor-data';
import { VendorPriceCompairView } from '@/app/shared/event-management/vendor-price-compair-view/vendorPriceCompair';
import { useRouter } from 'next/navigation';

export default function Vendors() {
  const router = useRouter();
  const [vendors, setVendors] = useState([
    {
      vendorName: 'Medcom',
      name: 'Ankit Gandhi',
      total: 10000,
      emlFileUrl: 'emailurl',
      excelFileUrl: 'excelFileUrl',
    },
    {
      vendorName: 'Aurum',
      name: 'Karan Jain',
      total: 9500,
      emlFileUrl: 'emailurl',
      excelFileUrl: 'excelFileUrl',
    },
    {
      vendorName: 'Decor',
      name: 'Miyan Akshay',
      total: 9800,
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

  const pageHeader = {
    title: 'Vendors',
    breadcrumb: [
      { href: '#', name: 'Event Management' },
      { href: '/event-management', name: 'Events' },
      { name: 'Vendors' },
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <div className="mb-4 flex justify-end gap-2">
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
