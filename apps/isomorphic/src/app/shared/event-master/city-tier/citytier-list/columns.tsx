'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { cityTireDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateCitytierModalView } from '../citytier-page-header';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<cityTireDataType>();

export const CitytierListColumns = [
  columnHelper.display({
    id: 'id',
    size: 130,
    header: 'Rate ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.accessor('tierType', {
    id: 'tierType',
    size: 130,
    header: 'Tier Type',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.tierType}`}
        </Title>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'city',
    size: 150,
    header: 'City',
    cell: ({ row }) => <Text className="text-sm">{row.original.city}</Text>,
  }),
  columnHelper.display({
    id: 'state',
    size: 150,
    header: 'State',
    cell: ({ row }) => <Text className="text-sm">{row.original.state}</Text>,
  }),
  columnHelper.accessor('minimumProfitMargin', {
    id: 'minimumProfitMargin',
    size: 150,
    header: 'Minimum Profit Margin',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original.minimumProfitMargin} %</Text>
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
    size: 100,
    header: 'Action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="start" gap="3" className="pe-4">
        <CityTierEdit cityTier={row.original} />

        {/* <DeletePopover
          title={`Delete the vendor person`}
          description={`Are you sure you want to delete this #${row.original.name}?`}
          onDelete={() =>
            meta?.handleDeleteRow && meta?.handleDeleteRow(row.original)
          }
        /> */}
      </Flex>
    ),
  }),
];

const CityTierEdit = ({ cityTier }: { cityTier: cityTireDataType }) => {
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
            view: <CreateCitytierModalView cityTier={cityTier} />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
