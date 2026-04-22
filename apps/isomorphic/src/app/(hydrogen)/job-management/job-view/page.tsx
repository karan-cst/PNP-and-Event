'use client';

import Checklist from '@/app/shared/job-management/job-view/Checklist';
import DetailLogTable from '@/app/shared/job-management/job-view/detailLog';
import ApprovalDetails from '@/app/shared/job-management/job-view/jobApproval';
import JobHeader from '@/app/shared/job-management/job-view/JobHeader';
import JobSpecifications from '@/app/shared/job-management/job-view/JobSpecification';
import Logs from '@/app/shared/job-management/job-view/Logs';
import VendorsPNPTable from '@/app/shared/job-management/job-view/vendorView';
import VendorUploadModal from '@/app/shared/job-management/vendor-upload/vendorUpload';
import { useModal } from '@/app/shared/modal-views/use-modal';
import PageHeader from '@/app/shared/page-header';
import { dummyJobViewData, JobViewType } from '@/data/jobpnp-data';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { PiPlusBold } from 'react-icons/pi';
import { Button } from 'rizzui/button';

export default function JobViewPage() {
  const session = useSession();
  const role = session?.data?.user?.role;
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
    'spec' | 'approval' | 'checklist' | 'logs' | 'vendor'
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

  const tabs = [
    {
      key: 'spec',
      label: 'Job Specifications',
      roles: [
        'csUser',
        'printExecutive',
        'operationHeadPrint',
        'businessHead',
        'printMng',
        'giftMng',
        'deliveryUser',
        'pnpHead',
      ],
    },
    {
      key: 'vendor',
      label: 'Vendor Rate',
      roles: [
        'printMng',
        'giftMng',
        'pnpHead',
        'operationHeadPrint',
        // 'businessHead',
      ],
    },
    {
      key: 'approval',
      label: 'Approval Details',
      roles: [
        'printExecutive',
        'operationHeadPrint',
        'businessHead',
        'giftMng',
        'pnpHead',
      ],
    },
    {
      key: 'checklist',
      label: 'Printing Checklist',
      roles: ['printExecutive', 'pnpHead'],
    },
    {
      key: 'logs',
      label: 'Logs',
      roles: [
        'csUser',
        'printExecutive',
        'operationHeadPrint',
        'businessHead',
        'printMng',
        'giftMng',
        'deliveryUser',
        'pnpHead',
      ],
    },
  ];

  const allowedTabs = role
    ? tabs.filter((tab) => tab.roles.includes(role))
    : [];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <div className="space-y-6 py-2">
        {/* Header */}
        <JobHeader job={job} />

        {/* Tabs */}
        <div className="flex gap-6 border-b text-sm font-medium">
          {allowedTabs.map((tab) => (
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
            <VendorsPNPTable vendors={vendors} />
          </>
        )}
        {activeTab === 'approval' && <ApprovalDetails />}
        {activeTab === 'checklist' && <Checklist />}
        {activeTab === 'logs' && <DetailLogTable />}
      </div>
    </>
  );
}
