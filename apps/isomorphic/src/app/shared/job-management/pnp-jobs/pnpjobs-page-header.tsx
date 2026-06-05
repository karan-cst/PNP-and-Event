'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Input, Flex, Button, Select } from 'rizzui';
import { PiFunnel, PiMagnifyingGlassBold } from 'react-icons/pi';
import { type Table as ReactTableType } from '@tanstack/react-table';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import { useRouter } from 'next/navigation';
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

export default function PnpjobPageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
}: PageHeaderTypes<T>) {
  const router = useRouter();
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
        <Flex align="center" justify="end" gap="4" className="mb-4">
          <Input
            type="search"
            placeholder="Search by vendor name..."
            value={table.getState().globalFilter ?? ''}
            onClear={() => table.setGlobalFilter('')}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
          />
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
