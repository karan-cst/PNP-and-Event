'use client';

import React from 'react';
import JobFeed from '../../job-board/feeds/job-feed';
import cn from '@core/utils/class-names';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import VendorList from './vendorList';
import UpdateForm from './updateForm';
import { JobFormDataType } from '@/data/jobpnp-data';
import { Flex } from 'rizzui/flex';
import { Button } from 'rizzui/button';
import { PiFunnel, PiMagnifyingGlassBold } from 'react-icons/pi';
import { Title } from 'rizzui/typography';
import { FilterDrawerView } from '@core/components/controlled-table/table-filter';
import { Input } from 'rizzui/input';
import { Select } from 'rizzui/select';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import DateFiled from '@core/components/controlled-table/date-field';

export default function VendorDeliveryView() {
  let { layout } = useLayout();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [filter, setFilter] = React.useState({
    search: '',
    jobType: '',
    location: '',
  });
  const [dateRange, setDateRange] = React.useState<
    [string | null, string | null]
  >([null, null]);
  const [vendors, setvendors] = React.useState<any>([
    { _id: '0', name: 'karan Jain', count: 10 },
    { _id: '1', name: 'Yash Patel', count: 7 },
    { _id: '2', name: 'Jatin Panchal', count: 15 },
  ]);
  const [values, setValues] = React.useState<string>(vendors[0]._id);
  const [selectedJob, setSelectedJob] = React.useState<JobFormDataType | null>(
    null
  );

  return (
    <div className="@container">
      {/* <JobFeedHeader /> */}
      <div
        className={cn(
          'grid grid-cols-10 gap-x-4',
          layout === LAYOUT_OPTIONS.LITHIUM && 'mx-auto max-w-[1400px]'
        )}
      >
        <div className="col-span-3 hidden @4xl:grid @6xl:col-span-2">
          <VendorList vendors={vendors} values={values} setValues={setValues} />
        </div>
        <div
          className={`col-span-full @4xl:col-span-8 ${selectedJob ? '@6xl:col-span-6' : '@6xl:col-span-8'}`}
        >
          <Flex
            align="center"
            justify="between"
            className={`col-span-full @4xl:col-span-8 ${selectedJob ? '@6xl:col-span-6' : '@6xl:col-span-8'} mb-2 mt-2`}
          >
            <Title as="h2" className="text-[24px] lg:text-2xl 4xl:text-[26px]">
              Jobs
            </Title>
            <Button
              variant={'outline'}
              onClick={() => setOpenDrawer(!openDrawer)}
              className="h-9 pe-3 ps-2.5"
            >
              <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
              Filters
            </Button>
          </Flex>
          <JobFeed
            className={`col-span-full @4xl:col-span-8 ${selectedJob ? '@6xl:col-span-6' : '@6xl:col-span-8'}`}
            selectedJob={selectedJob}
            setSelectedJob={setSelectedJob}
          />
        </div>
        {selectedJob && (
          <div className="col-span-2 @6xl:col-span-2">
            <UpdateForm
              selectedJob={selectedJob}
              setSelectedJob={setSelectedJob}
            />
          </div>
        )}
        <FilterDrawerView
          isOpen={openDrawer}
          drawerTitle="Jobs Filters"
          setOpenDrawer={setOpenDrawer}
        >
          <div className="grid grid-cols-1 gap-6">
            <Input
              type="search"
              placeholder="Search Job Name..."
              value={filter.search ?? ''}
              onClear={() => setFilter((prev) => ({ ...prev, search: '' }))}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, search: e.target.value }))
              }
              label="Search Job"
              inputClassName="h-9"
              clearable={true}
              prefix={<PiMagnifyingGlassBold className="size-4" />}
            />
            <Select
              placeholder="Select Job Type..."
              options={[
                { label: 'All', value: '' },
                { label: 'Print', value: 'print' },
                { label: 'Gift', value: 'gift' },
              ]}
              value={filter.jobType ?? ''}
              label="Job Type"
              onChange={(value: string) =>
                setFilter((prev) => ({ ...prev, jobType: value }))
              }
            />
            <Select
              placeholder="Select Location..."
              options={[
                { label: 'Matoda', value: 'matoda' },
                { label: 'Intas HQ', value: 'intas-hq' },
                { label: 'Torrent', value: 'torrent' },
              ]}
              value={filter.location ?? ''}
              onChange={(value: string) =>
                setFilter((prev) => ({ ...prev, location: value }))
              }
              label="Location"
              clearable={true}
              onClear={() => setFilter((prev) => ({ ...prev, location: '' }))}
            />
            <DateFiled
              selectsRange
              dateFormat={'dd-MMM-yyyy'}
              className="w-full"
              placeholderText="Select Delivery date"
              endDate={getDateRangeStateValues(dateRange[1])!}
              selected={getDateRangeStateValues(dateRange[0])}
              startDate={getDateRangeStateValues(dateRange[0])!}
              onChange={(date: [Date | null, Date | null]) =>
                setDateRange(date as [string | null, string | null])
              }
              inputProps={{
                label: 'Delivery Date',
                labelClassName: '[@media(min-width:1860px)]:hidden',
              }}
              isClearable={true}
              onClear={() => setDateRange([null, null])}
              clearButtonClassName="translate-y-1 -translate-x-7 mt-2 background-color-[#fff]"
            />
          </div>
        </FilterDrawerView>
      </div>
    </div>
  );
}
