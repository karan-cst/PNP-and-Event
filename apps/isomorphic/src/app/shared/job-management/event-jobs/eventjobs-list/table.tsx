'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { EventJobListColumns } from './columns';
import Filters from './filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';

import { EventJobsData } from '@/data/eventjobs-data';
import EventjobPageHeader from '../eventjobs-page-header';
import { useEffect, useState } from 'react';

export type EventJobsDataType = (typeof EventJobsData)[number];

export default function EventjobsTable({
  pageSize = 5,
  hideFilters = true,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: 'border border-muted rounded-md',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
  pageSize?: number;
  hideFilters?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const [isPharma, setIsPharma] = useState('pharma');

  const { table, setData } = useTanStackTable<EventJobsDataType>({
    tableData: EventJobsData.filter((e) => e.isPharma !== isPharma),
    columnConfig: EventJobListColumns,
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
    const filteredData = EventJobsData.filter(
      (job) => job.isPharma === isPharma
    );

    setData(filteredData);

    // optional but recommended
    table.resetRowSelection();
    table.setPageIndex(0);
  }, [isPharma, setData, table]);

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
  const pageHeader = {
    title: 'Event Jobs',
    breadcrumb: [
      {
        href: '#',
        name: 'Job Management',
      },
      {
        name: 'Event Jobs',
      },
    ],
  };

  return (
    <>
      <EventjobPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        table={table}
        type={isPharma}
        setType={setIsPharma}
      />
      {!hideFilters && <Filters table={table} />}
      <Table table={table} variant="modern" classNames={classNames} />
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
