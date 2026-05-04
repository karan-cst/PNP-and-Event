'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TablePagination from '@core/components/table/pagination';
import TableFooter from '@core/components/table/footer';
import { TableClassNameProps } from '@core/components/table/table-types';
import cn from '@core/utils/class-names';
import { exportToCSV } from '@core/utils/export-to-csv';
import { createColumnHelper } from '@tanstack/react-table';
import { Text, Title } from 'rizzui/typography';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Badge } from 'rizzui/badge';

export default function DetailLogTable({
  pageSize = 5,
  hidePagination = false,
  hideFooter = false,
  classNames = {
    container: '[&_td]:py-2 border border-muted rounded-md ',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
  pageSize?: number;
  hideHeader?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  type LogsType = {
    userName: string;
    timeStamp: string;
    role: string;
    action: 'approve' | 'reject' | 'pending' | 'upload' | 'update' | 'create';
    message?: string;
  };
  const [Logs, setLogs] = useState<LogsType[]>([
    {
      userName: 'Rahul Sharma',
      role: 'Cs User',
      timeStamp: '2026-04-10',
      action: 'create',
      message: '',
    },
    {
      userName: 'Pranay Patel',
      role: 'Buissness Head',
      timeStamp: '2026-04-10',
      action: 'approve',
      message: '',
    },
    {
      userName: 'Aayush Mehra',
      role: 'Print Executive',
      timeStamp: '2026-04-10',
      action: 'reject',
      message: 'wrong hsn code',
    },
    {
      userName: 'Rahul Sharma',
      role: 'Cs User',
      timeStamp: '2026-04-10',
      action: 'update',
      message: 'hsn code update successfully',
    },
    {
      userName: 'Aayush Mehra',
      role: 'Print Executive',
      timeStamp: '2026-04-10',
      action: 'approve',
      message: '',
    },
    {
      userName: 'Rahul Sharma',
      role: 'csUser',
      timeStamp: '2026-04-10',
      action: 'create',
      message: '',
    },
    {
      userName: 'Rahul Sharma',
      role: 'csUser',
      timeStamp: '2026-04-10',
      action: 'create',
      message: '',
    },
    {
      userName: 'Rahul Sharma',
      role: 'csUser',
      timeStamp: '2026-04-10',
      action: 'create',
      message: '',
    },
    {
      userName: 'Rahul Sharma',
      role: 'csUser',
      timeStamp: '2026-04-10',
      action: 'create',
      message: '',
    },
  ]);
  const columnHelper = createColumnHelper<LogsType>();
  const JobListColumns = [
    columnHelper.display({
      id: 'action',
      size: 100,
      header: 'Action',
      cell: ({ row }) => {
        const action = row.original.action;
        return (
          <Badge
            color={
              action == 'approve'
                ? 'success'
                : action == 'pending'
                  ? 'info'
                  : action == 'reject'
                    ? 'danger'
                    : action == 'update'
                      ? 'info'
                      : 'primary'
            }
            className="text-sm"
          >
            {row.original.action}
          </Badge>
        );
      },
    }),
    columnHelper.display({
      id: 'timeStamp',
      size: 100,
      header: 'timeStamp',
      cell: ({ row }) => (
        <Text className="text-sm">
          {dayjs(row.original.timeStamp).format('DD/MM/YYYY HH:mm')}
        </Text>
      ),
    }),

    columnHelper.display({
      id: 'message',
      size: 270,
      header: 'Remarks',
      cell: ({ row }) => (
        <Text className="text-xs">{row.original?.message || ''}</Text>
      ),
    }),

    columnHelper.display({
      id: 'userName',
      size: 120,
      header: 'User Name',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title as="h5" className="cursor-pointer !text-sm font-medium">
            {row.original?.userName}
          </Title>
          <Text className="text-sm">{row.original?.role}</Text>
        </div>
      ),
    }),
  ];

  const { table, setData } = useTanStackTable<LogsType>({
    tableData: Logs,
    columnConfig: JobListColumns,
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
