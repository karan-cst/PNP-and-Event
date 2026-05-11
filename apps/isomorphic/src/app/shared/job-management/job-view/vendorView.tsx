'use client';
import PencilIcon from '@core/components/icons/pencil';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { TableClassNameProps } from '@core/components/table/table-types';
import { AiTwotoneMail } from 'react-icons/ai';
import {
  PiMicrosoftExcelLogo,
  PiCheckFatDuotone,
  PiXBold,
  PiUploadBold,
} from 'react-icons/pi';
import { ActionIcon } from 'rizzui/action-icon';
import { Flex } from 'rizzui/flex';
import { Tooltip } from 'rizzui/tooltip';
import { useModal } from '../../modal-views/use-modal';
import VendorUploadModal from '../vendor-upload/vendorUpload';
import { useSession } from 'next-auth/react';
import { Text, Title } from 'rizzui/typography';
import { Button } from 'rizzui/button';
import { Input } from 'rizzui/input';
import { formatPrice } from '@/config/format-pricing';
import { UpdateRateModalView } from './UpdateRate';

const BAseColumns = [
  {
    header: 'Vendor Name',
    accessorKey: 'vendorName',
    id: 'vendorName',
    cell: ({ row }: any) => (
      <div className="font-medium">{row.original.vendorName}</div>
    ),
  },
  {
    header: 'Spoc Name',
    accessorKey: 'name',
    id: 'name',
  },
  {
    header: 'Price',
    accessorKey: 'price',
    id: 'price',
    cell: ({ row }: any) => `Rs. ${row.original.price} x 3000 QTY`,
  },
  {
    header: 'Total',
    accessorKey: 'total',
    id: 'total',
    cell: ({ row }: any) => `Rs. ${row.original.total}`,
  },
  {
    header: 'EML Uploaded',
    accessorKey: 'emlFileUrl',
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
  },
  {
    header: 'Excel Uploaded',
    accessorKey: 'excelFileUrl',
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
  },
];

const columns = (viewOnly: boolean) => {
  return viewOnly
    ? [
        ...BAseColumns,
        {
          header: 'Action',
          id: 'action',
          cell: ({ row }: any) => {
            return viewOnly ? (
              <Action row={row.original} viewOnly={viewOnly} />
            ) : null;
          },
        },
      ]
    : BAseColumns;
};

// {
//       header: 'Action',
//       id: 'action',
//       cell: ({ row }: any) => {
//         return viewOnly ? (
//           <Action row={row.original} viewOnly={viewOnly} />
//         ) : null;
//       },
//     },

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
  const allowApprove = ['pnpHead'];
  const session = useSession();
  const role = session?.data?.user?.role;
  console.log(row);
  return (
    <Flex align="center" gap="3">
      <Tooltip size="sm" content="Update Rate" placement="top" color="invert">
        <ActionIcon
          size="sm"
          variant="outline"
          onClick={() => {
            openModal({
              view: (
                <UpdateRateModalView row={row} />
                // <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
                //   <div className="mb-7 flex items-center justify-between">
                //     <Title as="h4" className="font-semibold">
                //       Update Rate - {row.vendorName}
                //     </Title>
                //     <ActionIcon size="sm" variant="text" onClick={closeModal}>
                //       <PiXBold className="h-auto w-5" />
                //     </ActionIcon>
                //   </div>
                //   <div className="space-y-4">
                //     {/* Vendor Selection */}
                //     <Input
                //       type="number"
                //       label="Updated Rate"
                //       placeholder="Enter Updated price per piece"
                //     />

                //     <Text className="text-sm">
                //       Previous Amount - {formatPrice(row.total)}
                //     </Text>
                //     <div className="flex justify-end gap-3 pt-3">
                //       <Button variant="outline" onClick={closeModal}>
                //         Cancel
                //       </Button>
                //       <Button onClick={() => {}}>Submit</Button>
                //     </div>
                //   </div>
                // </div>
              ),
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
      {role && allowApprove.includes(role) && (
        <Tooltip
          size="sm"
          content="Approve Vendor"
          placement="top"
          color="invert"
        >
          <ActionIcon size="sm" variant="outline" onClick={() => {}}>
            <PiCheckFatDuotone className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      )}
    </Flex>
  );
};

export default function VendorsPNPTable({
  vendors,
  pageSize = 5,
  viewOnly = false,
  classNames = {
    container: '[&_td]:py-2 border border-muted rounded-md ',
    rowClassName: 'last:border-0',
  },
  paginationClassName,
}: {
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
