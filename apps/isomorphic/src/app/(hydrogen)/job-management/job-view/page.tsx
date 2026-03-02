'use client';

import JobHeader from '@/app/shared/job-management/job-view/JobHeader';
import JobSpecifications from '@/app/shared/job-management/job-view/JobSpecification';
import VendorUploadModal from '@/app/shared/job-management/vendor-upload/vendorUpload';
import VendorsTable from '@/app/shared/job-management/vendorTable';
import { useModal } from '@/app/shared/modal-views/use-modal';
import PageHeader from '@/app/shared/page-header';
import { dummyJobViewData, JobViewType } from '@/data/jobpnp-data';
import { useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';

// type Props = {
//   job: JobViewType;
// };

export default function JobViewPage() {
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
  const job = dummyJobViewData;
  const [activeTab, setActiveTab] = useState<
    'spec' | 'approval' | 'checklist' | 'delivery' | 'logs' | 'vendor'
  >('spec');
  const pageHeader = {
    title: 'Job',
    breadcrumb: [
      {
        href: '#',
        name: 'Job Management',
      },
      {
        href: '/job-management/job-tracker',
        name: 'Job Tracker',
      },
      {
        name: `${job.jobName || 'Job'}`,
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

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="space-y-6 py-2">
        {/* Header */}
        <JobHeader job={job} />

        {/* Tabs */}
        <div className="flex gap-6 border-b text-sm font-medium">
          {[
            { key: 'spec', label: 'Job Specifications' },
            { key: 'vendor', label: 'Vendor Rate' },
            { key: 'approval', label: 'Approval Details' },
            { key: 'checklist', label: 'Printing Checklist' },
            { key: 'delivery', label: 'Delivery Details' },
            { key: 'logs', label: 'Logs' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 ${
                activeTab === tab.key
                  ? 'border-b-2 border-black font-semibold text-black'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'spec' && <JobSpecifications job={job} />}
        {activeTab === 'vendor' && (
          <>
            <div className="mb-4 flex justify-end">
              <Button onClick={() => handleOpenModal()}>
                <PiPlusBold className="mr-2" />
                Upload Rate
              </Button>
            </div>
            <VendorsTable vendors={vendors} />
          </>
        )}
        {/* You can add other tab components later */}
      </div>
    </>
  );
}
