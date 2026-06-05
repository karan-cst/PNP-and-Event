'use client';
import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Flex, Input, Select } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiFunnel, PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import { FaFileArchive } from 'react-icons/fa';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FilterDrawerView } from '@core/components/controlled-table/table-filter';
import DateFiled from '@core/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';
import cn from '@core/utils/class-names';

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
};

export default function JobPageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
}: PageHeaderTypes<T>) {
  const session = useSession();
  const role = session?.data?.user?.role;
  const router = useRouter();
  const allowCreate = ['csUser', 'operationHeadPrint'];
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [filter, setFilter] = React.useState({
    search: '',
    jobType: '',
    division: '',
  });
  const [dateRange, setDateRange] = React.useState<
    [string | null, string | null]
  >([null, null]);

  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
        <Flex direction="row" align="center" gap="3">
          <Button as="button" onClick={() => router.push('/archive/pnp-jobs')}>
            <FaFileArchive className="h-[15px] w-[15px]" />
            <span>Archive</span>
          </Button>
          <Input
            type="search"
            placeholder="Search by job name..."
            value={table.getState().globalFilter ?? ''}
            onClear={() => table.setGlobalFilter('')}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
          />
          {/* <div className="flex items-center gap-4"> */}
          {role && allowCreate.includes(role) && (
            <Button
              as="span"
              // className="mt-4 w-2 cursor-pointer @sm:mt-0 @sm:w-full @lg:mt-0 @lg:w-auto"
              onClick={() => router.push('/job-management/create-job')}
            >
              <PiPlusBold className="h-[15px] w-[15px]" />
            </Button>
          )}
          <ToggleColumns table={table} />
          <Button
            variant={'outline'}
            onClick={() => setOpenDrawer(!openDrawer)}
            className="h-9 pe-3 ps-2.5"
          >
            <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
            Filters
          </Button>
        </Flex>
        <FilterDrawerView
          isOpen={openDrawer}
          drawerTitle="Jobs Filters"
          setOpenDrawer={setOpenDrawer}
        >
          <div className="grid grid-cols-1 gap-6">
            <DateFiled
              selectsRange
              dateFormat={'dd-MMM-yyyy'}
              className="w-full"
              placeholderText="Select dates"
              endDate={getDateRangeStateValues(dateRange[1])!}
              selected={getDateRangeStateValues(dateRange[0])}
              startDate={getDateRangeStateValues(dateRange[0])!}
              onChange={(date: [Date | null, Date | null]) =>
                setDateRange(date as [string | null, string | null])
              }
              inputProps={{
                label: 'Created Date',
                labelClassName: '[@media(min-width:1860px)]:hidden',
              }}
              isClearable={true}
              onClear={() => setDateRange([null, null])}
              clearButtonClassName={cn('translate-y-1 -translate-x-7 mt-2')}
            />
            <Input
              type="search"
              placeholder="Search Job Name..."
              value={filter.search ?? ''}
              onClear={() => setFilter((prev) => ({ ...prev, search: '' }))}
              onChange={(e) =>
                setFilter((prev) => ({ ...prev, search: e.target.value }))
              }
              label="Job Search"
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
              clearable={true}
              onClear={() => setFilter((prev) => ({ ...prev, jobType: '' }))}
              onChange={(value: string) =>
                setFilter((prev) => ({ ...prev, jobType: value }))
              }
            />
            <Select
              placeholder="Select Division..."
              options={[
                { label: 'Arron', value: 'Arron' },
                { label: 'Altis', value: 'Altis' },
                { label: 'Ortho', value: 'Ortho' },
                { label: 'Optho', value: 'Optho' },
              ]}
              value={filter.division ?? ''}
              onChange={(value: string) =>
                setFilter((prev) => ({ ...prev, division: value }))
              }
              label="Division"
              clearable={true}
              onClear={() => setFilter((prev) => ({ ...prev, division: '' }))}
            />
          </div>
        </FilterDrawerView>
      </PageHeader>
    </>
  );
}
