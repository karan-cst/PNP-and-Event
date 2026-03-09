'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { getInvoiceColumns } from './columns';
import Filters from './filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';
import { useEffect, useState } from 'react';
import { POData } from '@/data/po.data';
import InvoicePageHeader from './Invoice-page-header';
import { useSession } from 'next-auth/react';

export type PODataType = (typeof POData)[number];

export default function InvoiceTable({
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
    title: 'Invoice Management',
    breadcrumb: [
      {
        href: '#',
        name: '',
      },
    ],
  };

  const { table, setData } = useTanStackTable<PODataType>({
    tableData:
      type == 'all' ? POData : POData.filter((job) => job.isPharma === type),
    columnConfig: getInvoiceColumns(role),
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
    const filteredData =
      type == 'all' ? POData : POData.filter((job) => job.isPharma === type);

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
      <InvoicePageHeader
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
