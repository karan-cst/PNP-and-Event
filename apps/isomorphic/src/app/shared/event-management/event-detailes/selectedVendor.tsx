'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { TableClassNameProps } from '@core/components/table/table-types';
import { AiTwotoneMail } from 'react-icons/ai';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import { ActionIcon } from 'rizzui/action-icon';
import { Tooltip } from 'rizzui/tooltip';
import { formatPrice } from '@/config/format-pricing';

const columns = [
  {
    header: 'Vendor Name',
    accessorKey: 'vendorName',
    id: 'vendorName',
    cell: ({ row }: any) => (
      <div className="font-medium">{row.original.vendorName}</div>
    ),
  },
  {
    header: 'Total',
    accessorKey: 'total',
    id: 'total',
    cell: ({ row }: any) => formatPrice(row.original.total),
  },
  {
    header: 'EML Uploaded',
    accessorKey: 'emailUrl',
    id: 'emailUrl',
    cell: ({ row }: any) =>
      row.original.emailUrl ? (
        <Tooltip
          size="sm"
          content="View EML File"
          placement="top"
          color="invert"
        >
          <ActionIcon size="sm" variant="outline">
            <AiTwotoneMail className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    header: 'Excel Uploaded',
    accessorKey: 'excelUrl',
    id: 'excelUrl',
    cell: ({ row }: any) =>
      row.original.excelUrl ? (
        <Tooltip
          size="sm"
          content="Download Excel File"
          placement="top"
          color="invert"
        >
          <ActionIcon size="sm" variant="outline">
            <PiMicrosoftExcelLogo className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      ) : (
        '-'
      ),
  },
  {
    header: 'Reason To Choose',
    accessorKey: 'reasonToChoose',
    id: 'reasonToChoose',
    cell: ({ row }: any) => row.original.reasonToChoose || '-',
  },
  {
    header: 'Selected By',
    accessorKey: 'selectBy',
    id: 'selectBy',
    cell: ({ row }: any) => row.original.selectBy || '-',
  },
];

export default function SelectedVendorTable({
  vendors,
  pageSize = 5,
  classNames = {
    container: '[&_td]:py-2 border border-muted rounded-md ',
    rowClassName: 'last:border-0',
  },
}: {
  vendors: {
    vendorName: string;
    total: number;
    emailUrl?: string;
    excelUrl?: string;
    selectBy?: string;
    reasonToChoose?: string;
  }[];
  pageSize?: number;
  hideFilters?: boolean;
  hideHeader?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const { table, setData } = useTanStackTable({
    tableData: vendors,
    columnConfig: columns,
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
    </>
  );
}
