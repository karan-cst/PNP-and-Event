'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { EventListColumns } from './columns';
import Filters from './filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';
import UserPageHeader from '../user-page-header';
import { eventDummyData } from '@/data/event-management.data';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export type EventDataType = (typeof eventDummyData)[number];

export default function EventsTable({
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
  const { data: session } = useSession();
  const role = session?.user.role;
  const [type, setType] = useState<string>('all');
  const pageHeader = {
    title: 'Events',
    breadcrumb: [
      {
        href: '#',
        name: 'Event Management',
      },
      {
        name: 'Events',
      },
    ],
  };

  const { table, setData } = useTanStackTable<EventDataType>({
    tableData:
      type == 'all'
        ? eventDummyData
        : eventDummyData.filter((e) => e.isPharma !== type),
    columnConfig: EventListColumns(role),
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

  useEffect(() => {
    const filteredData =
      type == 'all'
        ? eventDummyData
        : eventDummyData.filter((job) => job.isPharma === type);

    setData(filteredData);

    // optional but recommended
    table.resetRowSelection();
    table.setPageIndex(0);
  }, [type, setData, table]);

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
      <UserPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        table={table}
        type={type}
        setType={setType}
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
    </>
  );
}
