'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Avatar, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { VendorDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import DeletePopover from '@core/components/delete-popover';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateVendorModalView } from '../pnp-page-header';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<VendorDataType>();

export const VendorListColumns = [
  columnHelper.display({
    id: 'id',
    size: 100,
    header: 'Vendor Id',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),

  columnHelper.accessor('companyName', {
    id: 'companyName',
    size: 200,
    header: 'Vendor Name',
    cell: ({ row }) => {
      const { companyName, name } = row.original;

      return (
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <Avatar
            name={`${companyName}`}
            size="sm"
            color="primary"
            className="bg-[#F1F1F1] !text-black"
          />

          {/* Name + Role */}
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-900">
              {companyName}
            </span>
            <span className="text-xs text-gray-500">{name}</span>
          </div>
        </div>
      );
    },
  }),

  columnHelper.display({
    id: 'email',
    size: 190,
    header: 'Email',
    cell: ({ row }) => <Text className="text-sm">{row.original.email}</Text>,
  }),
  columnHelper.accessor('mobile', {
    id: 'mobile',
    size: 170,
    header: 'Mobile',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{`${row.original.mobile}`}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row }) =>
      getStatusBadge(row.original.isActive ? 'Active' : 'Deactive'),
  }),
  columnHelper.display({
    id: 'action',
    size: 150,
    header: 'Action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="start" gap="3" className="pe-4">
        <VendorEdit vendor={row.original} />
      </Flex>
    ),
  }),
];

const VendorEdit = ({ vendor }: { vendor: VendorDataType }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Edit Vendor'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Vendor'}
        onClick={() =>
          openModal({
            view: <CreateVendorModalView vendor={vendor} />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
