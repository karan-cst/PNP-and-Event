'use client';

import JobFeed from '../../job-board/feeds/job-feed';
import cn from '@core/utils/class-names';

import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import VendorList from './vendorList';
import UpdateForm from './updateForm';
import React from 'react';
import { JobType } from '../../pnp-master/jobtypes/columns';
import { JobFormDataType } from '@/data/jobpnp-data';

export default function VendorDeliveryView() {
  let { layout } = useLayout();
  const [vendors, setvendors] = React.useState<any>([
    { _id: '0', name: 'karan Jain', count: 10 },
    { _id: '1', name: 'Yash Patel', count: 7 },
    { _id: '2', name: 'Jatin Panchal', count: 15 },
    { _id: '3', name: 'karan Jain', count: 21 },
    { _id: '4', name: 'Yash Patel', count: 19 },
    { _id: '5', name: 'Jatin Panchal', count: 14 },
  ]);
  const [values, setValues] = React.useState<string[]>([]);
  const [selectedJob, setSelectedJob] = React.useState<JobFormDataType | null>(
    null
  );
  console.log('selectedJob', selectedJob);

  return (
    <div className="@container">
      {/* <JobFeedHeader /> */}
      <div
        className={cn(
          'grid grid-cols-12 gap-x-4',
          layout === LAYOUT_OPTIONS.LITHIUM && 'mx-auto max-w-[1400px]'
        )}
      >
        <div className="col-span-3 hidden @4xl:grid @6xl:col-span-3">
          <VendorList vendors={vendors} values={values} setValues={setValues} />
        </div>
        <JobFeed
          className={`col-span-full @4xl:col-span-8 ${selectedJob ? '@6xl:col-span-6' : '@6xl:col-span-9'}`}
          selectedJob={selectedJob}
          setSelectedJob={setSelectedJob}
        />
        {selectedJob && (
          <div className="col-span-3 @6xl:col-span-3">
            <UpdateForm
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
            />
          </div>
        )}
      </div>
    </div>
  );
}
