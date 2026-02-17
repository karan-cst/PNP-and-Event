'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import { PNPJobListColumns } from './columns';
import Filters from './filters';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';
import { EventJobsData } from '@/data/eventjobs-data';
import PnpjobPageHeader from '../pnpjobs-page-header';
import { PNPJobsData } from '@/data/pnpjobs-data';

export type PNPJobsDataType = (typeof PNPJobsData)[number];

export default function PNPjobsTable({
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
  const { table, setData } = useTanStackTable<PNPJobsDataType>({
    tableData: PNPJobsData,
    columnConfig: PNPJobListColumns,
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

  // useEffect(() => {
  //   const filteredData = EventJobsData.filter(
  //     (job) => job.isPharma === isPharma
  //   );

  //   setData(filteredData);

  //   // optional but recommended
  //   table.resetRowSelection();
  //   table.setPageIndex(0);
  // }, [isPharma]);

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
    title: 'PNP Jobs',
    breadcrumb: [
      {
        href: '#',
        name: 'Job Management',
      },
      {
        name: 'PNP Jobs',
      },
    ],
  };

  return (
    <>
      <PnpjobPageHeader
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        table={table}
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
