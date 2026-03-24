'use client';

import Image from 'next/image';
import { useState } from 'react';
import JobBadge from './job-badge';
import cn from '@core/utils/class-names';
import SingleJob from './single-job-page';
import JobFeedRating from './job-feed-rating';
import Breadcrumb from '@core/ui/breadcrumb';
import { Button, Text, Title } from 'rizzui';
import { JobFeedFilterDrawer } from './job-feed-filter';
import { type JobType, jobFeedData } from '@/data/job-feed-data';
import {
  PiMapPin,
  PiSealCheckFill,
  PiBookmarkSimpleFill,
  PiBookmarkSimpleThin,
} from 'react-icons/pi';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import { dummyJobData, JobFormDataType } from '@/data/jobpnp-data';

let countPerPage = 4;

export default function JobFeed({
  className,
  selectedJob,
  setSelectedJob,
}: {
  className?: string;
  selectedJob: JobFormDataType | null;
  setSelectedJob: React.Dispatch<React.SetStateAction<JobFormDataType | null>>;
}) {
  const [isLoading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(countPerPage);

  let isLoadMore = nextPage < jobFeedData?.length;

  function handleLoadMore() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setNextPage(nextPage + countPerPage);
    }, 600);
  }

  return (
    <div className={cn(className)}>
      <JobFeedFilterDrawer />

      {dummyJobData.slice(0, 5).map((job, index) => {
        return (
          <JobFeedCard key={index} data={job} setSelectedJob={setSelectedJob} />
        );
      })}

      {isLoadMore && (
        <div className="mb-4 flex justify-center">
          <Button
            variant="solid"
            isLoading={isLoading}
            onClick={() => handleLoadMore()}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}

function JobFeedCard({
  data,
  setSelectedJob,
}: {
  data: JobFormDataType | null;
  setSelectedJob: React.Dispatch<React.SetStateAction<JobFormDataType | null>>;
}) {
  const { openDrawer } = useDrawer();
  const [isBookMark, setIsBookMark] = useState(false);

  return (
    <>
      <div
        className="mb-6 flex w-full cursor-pointer flex-col gap-y-4 rounded-[10px] border border-muted p-4 @lg:gap-y-6 sm:p-[30px]"
        onClick={
          () => setSelectedJob(data)
          // openDrawer({
          //   view: <SingleJob data={data} />,
          //   placement: 'right',
          //   containerClassName: 'max-w-full xl:max-w-[60%] dark:bg-gray-50',
          // })
        }
      >
        {data && (
          <>
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-4 @xl:flex-row">
                <div className="space-y-1">
                  <Title as="h3" className="text-base font-medium @xl:text-lg">
                    {data.jobName}
                  </Title>
                  <Breadcrumb
                    separator=""
                    separatorVariant="circle"
                    className="flex-wrap gap-y-1 [&>a]:text-xs [&>a]:!text-gray-500 @7xl:[&>a]:text-sm"
                  >
                    {[
                      { name: 'Job No', value: data.jobNo },
                      { name: 'Created', value: data.date },
                      {
                        name: 'Requisitioner',
                        value: data.requisitionerName,
                      },
                    ].map((item) => (
                      <Breadcrumb.Item key={item.name}>
                        {item.name} {item.value}
                      </Breadcrumb.Item>
                    ))}
                  </Breadcrumb>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  'h-10',
                  isBookMark && 'bg-primary/10 text-primary'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBookMark(!isBookMark);
                }}
                aria-label="Bookmark this job"
              >
                {!isBookMark ? (
                  <PiBookmarkSimpleThin className="size-4 @7xl:size-5" />
                ) : (
                  <PiBookmarkSimpleFill className="size-4 @7xl:size-5" />
                )}
              </Button>
            </div>

            <Text className="text-sm font-normal leading-normal @xl:leading-relaxed">
              Delivery Comment : {data.deliveryComment}
            </Text>

            <Text className="text-sm font-normal leading-normal @xl:leading-relaxed">
              Instruction : {data.specialInstructions}
            </Text>
            <JobBadge
              skills={[
                { name: 'Size', value: data.size },
                { name: 'Paper', value: data.paper },
                { name: 'Colour', value: data.colour },
                { name: 'Lamination', value: data.lamination },
                { name: 'Matt', value: data.matt },
                { name: 'Gloss', value: data.gloss },
                { name: 'Front', value: data.front },
                { name: 'Back', value: data.back },
                { name: 'UV', value: data.uv },
                { name: 'VaidB2B', value: data.vaidB2B },
                { name: 'HBound', value: data.hBound },
                { name: 'Spiral', value: data.spiral },
                { name: 'WiroWire', value: data.wiroWire },
                { name: 'Indexing', value: data.indexing },
                { name: 'Foil', value: data.foil },
              ]}
            />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 @lg:gap-x-8">
              <div className="flex gap-x-1.5">
                <PiMapPin size={20} />
                <Text className="text-sm font-medium">
                  {data.deliveryPlace}
                </Text>
              </div>
              <div className="flex gap-x-1.5">
                <PiSealCheckFill size={20} className="text-primary" />
                <Text className="text-sm font-medium">{data.division}</Text>
              </div>
              <div className="flex gap-x-1.5">
                <Text className="text-primary">Quantity : </Text>
                <Text className="text-sm font-medium">{data.totalQty}</Text>
              </div>
              <div className="flex gap-x-1.5">
                <Text className="text-primary">Package : </Text>
                <Text className="text-sm font-medium">{data.packageQty}</Text>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
