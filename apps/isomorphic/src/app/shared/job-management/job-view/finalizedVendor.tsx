'use client';
import PencilIcon from '@core/components/icons/pencil';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { TableClassNameProps } from '@core/components/table/table-types';
import { AiTwotoneMail } from 'react-icons/ai';
import { PiMicrosoftExcelLogo, PiUploadBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui/action-icon';
import { Flex } from 'rizzui/flex';
import { Tooltip } from 'rizzui/tooltip';
import { useModal } from '../../modal-views/use-modal';
import VendorUploadModal from '../vendor-upload/vendorUpload';
import { useSession } from 'next-auth/react';
import { UpdateRateModalView } from './UpdateRate';
import { Button } from 'rizzui/button';
import { useEffect, useState } from 'react';
import { Checkbox } from 'rizzui/checkbox';
import { createColumnHelper } from '@tanstack/react-table';
import { JobViewType } from '@/data/jobpnp-data';
import { Textarea } from 'rizzui/textarea';
import Swal from 'sweetalert2';
const columnHelper = createColumnHelper<{
  id: number | string;
  vendorName: string;
  name: string;
  price: number;
  total: number;
  emlFileUrl?: string;
  excelFileUrl?: string;
  qty: number;
}>();
const BAseColumns = [
  columnHelper.display({
    header: 'Vendor Name',
    id: 'vendorName',
    cell: ({ row }: any) => (
      <div className="font-medium">{row.original.vendorName}</div>
    ),
  }),
  columnHelper.display({
    header: 'Spoc Name',
    // accessorKey: 'name',
    id: 'name',
  }),
  columnHelper.display({
    header: 'Price',
    // accessorKey: 'price',
    id: 'price',
    cell: ({ row }: any) => `Rs. ${row.original.price} x 3000 QTY`,
  }),
  columnHelper.display({
    header: 'Total',
    // accessorKey: 'total',
    id: 'total',
    cell: ({ row }: any) => `Rs. ${row.original.total}`,
  }),
  columnHelper.display({
    header: 'EML Uploaded',
    // accessorKey: 'emlFileUrl',
    id: 'emlFileUrl',
    cell: ({ row }: any) =>
      row.original.emlFileUrl ? (
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
  }),
  columnHelper.display({
    header: 'Excel Uploaded',
    // accessorKey: 'excelFileUrl',
    id: 'excelFileUrl',
    cell: ({ row }: any) =>
      row.original.excelFileUrl ? (
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
  }),
];

const columns = () => {
  return [...BAseColumns];
};

export default function VendorsPNPTable({
  job,
  vendors,
  pageSize = 5,
  viewOnly = false,
  classNames = {
    container: '[&_td]:py-2 border border-muted rounded-md ',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
  job?: JobViewType;
  vendors: {
    id: number | string;
    vendorName: string;
    name: string;
    price: number;
    total: number;
    emlFileUrl?: string;
    excelFileUrl?: string;
    qty: number;
  }[];
  pageSize?: number;
  viewOnly?: boolean;
  hideFilters?: boolean;
  hideHeader?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const session = useSession();
  const role = session?.data?.user?.role;
  const allowFinalize = ['pnpHead'];

  const { table, setData } = useTanStackTable({
    tableData: vendors,
    columnConfig: columns(),
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
