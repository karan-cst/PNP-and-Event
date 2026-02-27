'use client';

import JobHeader from '@/app/shared/job-management/job-view/JobHeader';
import JobSpecifications from '@/app/shared/job-management/job-view/JobSpecification';
import PageHeader from '@/app/shared/page-header';
import { dummyJobViewData, JobViewType } from '@/data/jobpnp-data';
import { useState } from 'react';

// type Props = {
//   job: JobViewType;
// };

export default function JobViewPage() {
  const job = dummyJobViewData;
  const [activeTab, setActiveTab] = useState<
    'spec' | 'approval' | 'checklist' | 'delivery' | 'logs'
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
        {/* You can add other tab components later */}
      </div>
    </>
  );
}
