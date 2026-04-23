'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { DeliveryListColumns } from './columns';
import Filters from './filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';
import { useSession } from 'next-auth/react';
import { deliveryDummyData } from '@/data/deliveryDummy-data';
import Header from '../page-header';
import { FilterDrawerView } from '@core/components/controlled-table/table-filter';
import React from 'react';
import { Input } from 'rizzui/input';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { Select } from 'rizzui/select';
import DateFiled from '@core/components/controlled-table/date-field';
import { getDateRangeStateValues } from '@core/utils/get-formatted-date';

export type DeliveryDataType = (typeof deliveryDummyData)[number];

export default function DeliveryTable({
  pageSize = 5,
  hideFilters = true,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: '[&_td]:py-2 border border-muted rounded-md ',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hideHeader?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [filter, setFilter] = React.useState({
    search: '',
    jobType: '',
    location: '',
  });
  const { data: session } = useSession();
  const role = session?.user.role;
  const [dateRange, setDateRange] = React.useState<
    [string | null, string | null]
  >([null, null]);
  const pageHeader = {
    title: 'Deliveries',
    breadcrumb: [
      {
        href: '#',
        name: 'Delivery Management',
      },
      {
        name: 'Deliveries',
      },
    ],
  };

  const { table, setData } = useTanStackTable<DeliveryDataType>({
    tableData: deliveryDummyData,
    columnConfig: DeliveryListColumns(role),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  const selectedData = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  function handleExportData() {
    exportToCSV(
      selectedData,
      'ID,Name,Category,Sku,Price,Stock,Status,Rating',
      `product_data_${selectedData.length}`
    );
  }

  return (
    <>
      <Header
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        table={table}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      {!hideFilters && <Filters table={table} />}
      <Table
        table={table}
        variant="modern"
        classNames={{
          ...classNames,
          cellClassName: '!py-2', // 👈 KEY FIX
        }}
      />
      {!hideFooter && <TableFooter table={table} onExport={handleExportData} />}
      {!hidePagination && (
        <TablePagination
          table={table}
          className={cn('py-4', paginationClassName)}
        />
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
            placeholderText="Select Delivery Date Start-to-End"
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
          <DateFiled
            selectsRange
            dateFormat={'dd-MMM-yyyy'}
            className="w-full"
            placeholderText="Select Followup Date Start-to-End"
            endDate={getDateRangeStateValues(dateRange[1])!}
            selected={getDateRangeStateValues(dateRange[0])}
            startDate={getDateRangeStateValues(dateRange[0])!}
            onChange={(date: [Date | null, Date | null]) =>
              setDateRange(date as [string | null, string | null])
            }
            inputProps={{
              label: 'Follow Up Date',
              labelClassName: '[@media(min-width:1860px)]:hidden',
            }}
            isClearable={true}
            onClear={() => setDateRange([null, null])}
            clearButtonClassName="translate-y-1 -translate-x-7 mt-2 background-color-[#fff]"
          />
        </div>
      </FilterDrawerView>
    </>
  );
}
