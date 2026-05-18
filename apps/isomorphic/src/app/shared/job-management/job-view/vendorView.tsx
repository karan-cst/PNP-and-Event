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

const columns = (viewOnly: boolean) => {
  return viewOnly
    ? [
        columnHelper.display({
          id: 'select',
          size: 50,
          header: ({ table }) => (
            <Checkbox
              className="ps-3"
              aria-label="Select All"
              checked={table.getIsAllPageRowsSelected()}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
            />
          ),
          cell: ({ row }) => (
            <Checkbox
              className="ps-3"
              aria-label="Select Row"
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          ),
        }),
        ...BAseColumns,
        columnHelper.display({
          header: 'Action',
          id: 'action',
          cell: ({ row }: any) => {
            return viewOnly ? (
              <Action row={row.original} viewOnly={viewOnly} />
            ) : null;
          },
        }),
      ]
    : BAseColumns;
};
const Action = ({
  row,
  viewOnly = false,
}: {
  row: {
    id: number | string;
    vendorName: string;
    qty: number;
    name: string;
    total: number;
    emlFileUrl?: string;
    excelFileUrl?: string;
    price: number;
  };
  viewOnly?: boolean;
}) => {
  const { openModal, closeModal } = useModal();
  return (
    <Flex align="center" gap="3">
      <Tooltip size="sm" content="Update Rate" placement="top" color="invert">
        <ActionIcon
          size="sm"
          variant="outline"
          onClick={() => {
            openModal({
              view: <UpdateRateModalView row={row} />,
            });
          }}
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <Tooltip size="sm" content="Upload Excel" placement="top" color="invert">
        <ActionIcon
          size="sm"
          variant="outline"
          onClick={() => {
            openModal({
              view: (
                <VendorUploadModal rowData={row} onClose={() => closeModal()} />
              ),
            });
          }}
        >
          <PiUploadBold className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
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
  const [canFinalize, setCanFinalize] = useState(false);
  const allowFinalize = ['pnpHead'];
  const { openModal, closeModal } = useModal();
  useEffect(() => {
    if (role) setCanFinalize(allowFinalize.includes(role));
  }, [role, allowFinalize]);
  const { table, setData } = useTanStackTable({
    tableData: vendors,
    columnConfig: columns(viewOnly),
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      enableRowSelection: canFinalize,
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

  const selectedRows = table
    .getSelectedRowModel()
    .rows.map((row) => row.original);

  const handleFinalizeVendor = async () => {
    try {
      const payload = selectedRows;
      console.log(payload);
      // API CALL
      // await axios.post('/api/finalize-vendor', payload);
    } catch (error) {
      console.log(error);
    }
  };

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
      {canFinalize && (
        <div>
          <div>
            {' '}
            <Textarea
              label="PO Remarks"
              placeholder="Add remarks for the PO team."
              rows={3}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={async () => {
                const result = await Swal.fire({
                  title: 'Are you sure?',
                  text: `Finalize ${selectedRows.length} selected vendor(s)?`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, Finalize',
                  cancelButtonText: 'Cancel',
                  confirmButtonColor: '#000000',
                  reverseButtons: true,
                });

                if (result.isConfirmed) {
                  handleFinalizeVendor();
                }
              }}
              disabled={selectedRows.length == 0}
            >
              Finalize Vendor ({selectedRows.length})
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
