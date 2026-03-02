'use client';

import { useState } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button } from 'rizzui';
import { PiPlusBold } from 'react-icons/pi';
import VendorUploadModal from '@/app/shared/event-management/vendor-upload/vendorUpload';
import VendorsTable from '@/app/shared/event-management/vendorTable';
import { useModal } from '@/app/shared/modal-views/use-modal';

export default function Vendors() {
  const [vendors, setVendors] = useState<any[]>([
    {
      id: 1,
      vendorName: 'ABC Technologies',
      name: 'Ankit Gandhi',
      total: 45000,
      emlFileUrl: '/uploads/xml/abc.xml',
      excelFileUrl: '/uploads/excel/abc.xlsx',
    },
    {
      id: 2,
      vendorName: 'Skyline Solutions',
      name: 'Karan Jain',
      total: 72000,
      emlFileUrl: null,
      excelFileUrl: '/uploads/excel/skyline.xlsx',
    },
    {
      id: 3,
      vendorName: 'Prime Event Services',
      name: 'Amulakh Mistry',
      total: 38000,
      emlFileUrl: '/uploads/xml/prime.xml',
      excelFileUrl: null,
    },
  ]);
  const eventDetails = {
    Type: 'Printing',
    Name: 'Pamphlet_Gaurav Gupta',
    deliveryDate: '30/03/2026',
    jobId: 'ADR67101JUN/25-26',
    qty: 4000,
    // city: 'Ahmedabad',
    // fromDate: '19/02/2026',
    // toDate: '21/02/2026',
    // tier: 1,
    stdTotal: 100000,
  };
  const { openModal, closeModal } = useModal();

  const pageHeader = {
    title: 'Vendor Management',
    breadcrumb: [
      { href: '#', name: 'Job Management' },
      { href: '/job-management', name: 'Jobs' },
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
            Upload Rate
          </Button>
        </div>
      </PageHeader>

      <div className="mb-6 rounded-md border border-muted bg-gray-50 p-4">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div>
            <span className="text-gray-500">Type:</span>{' '}
            <span className="font-medium">{eventDetails.Type}</span>
          </div>

          <div>
            <span className="text-gray-500">Job:</span>{' '}
            <span className="font-medium">{eventDetails.Name}</span>
          </div>

          <div>
            <span className="text-gray-500">Job Id:</span>{' '}
            <span className="font-medium">
              Rs. {eventDetails?.jobId || '-'}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Delivery Date:</span>{' '}
            <span className="font-medium">{eventDetails.deliveryDate}</span>
          </div>
          <div>
            <span className="text-gray-500">Quantity:</span>{' '}
            <span className="font-medium">{eventDetails.qty}</span>
          </div>
        </div>
      </div>

      {vendors.length > 0 && <VendorsTable vendors={vendors} />}
    </>
  );
}
