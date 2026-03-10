'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { EventTrackerListColumns } from './columns';
import Filters from './filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { useEffect, useState } from 'react';
import ClientApprovePageHeader from './eventApprove-page-header';
import { EventTrackerData } from '@/data/eventTrackerData';

export type EventTrackerDataType = (typeof EventTrackerData)[number];

export default function EventTrackerTable({
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
  const [type, setType] = useState<string>('all');
  const pageHeader = {
    title: 'Events',
    breadcrumb: [
      {
        href: '#',
        name: 'Event Management',
      },
      {
        name: 'Event Tracker',
      },
    ],
  };

  const { table, setData } = useTanStackTable<EventTrackerDataType>({
    tableData:
      type == 'all'
        ? EventTrackerData
        : EventTrackerData.filter((e) => e.isPharma == type),
    columnConfig: EventTrackerListColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          // setData((prev) => prev.filter((r) => r.id !== row.id));
          setData((prev) => prev);
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  useEffect(() => {
    const data =
      type == 'all'
        ? EventTrackerData
        : EventTrackerData.filter((e) => e.isPharma == type);
    setData(data);
  }, [type, setData]);

  return (
    <>
      <ClientApprovePageHeader
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
      {!hideFooter && <TableFooter table={table} />}
      {!hidePagination && (
        <TablePagination
          table={table}
          className={cn('py-4', paginationClassName)}
        />
      )}
    </>
  );
}
