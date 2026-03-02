'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Avatar, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { standardRateDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateStandardrateModalView } from '../rate-page-header';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { formatPrice } from '@/config/format-pricing';

const columnHelper = createColumnHelper<standardRateDataType>();

export const HSNListColumns = [
  columnHelper.display({
    id: 'id',
    size: 130,
    header: 'Rate ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.accessor('eventType', {
    id: 'eventType',
    size: 130,
    header: 'Event Type',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.eventType}`}
        </Title>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'elementType',
    size: 150,
    header: 'Element Type',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.elementType}</Text>
    ),
  }),
  columnHelper.display({
    id: 'elementItem',
    size: 150,
    header: 'Element Item',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar
          name={row.original.elementItem}
          size="md"
          src={row.original.src}
        />
        <Text className="text-sm">{row.original.elementItem}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('tier1Price', {
    id: 'tier1Price',
    size: 100,
    header: 'Tier 1',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{formatPrice(row.original.tier1Price)}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('tier2Price', {
    id: 'tier2Price',
    size: 100,
    header: 'Tier 2',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{formatPrice(row.original.tier2Price)}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('tier3Price', {
    id: 'tier3Price',
    size: 100,
    header: 'Tier 3',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{formatPrice(row.original.tier3Price)}</Text>
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
    cell: ({ row }) => getStatusBadge(row.original.isActive),
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
        <StandardRateEdit standardRate={row.original} />

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
  // columnHelper.display({
  //   id: 'isActive',
  //   size: 120,
  //   header: 'Is Active',
  //   cell: ({ row }) => (
  //     <Switch
  //       // label="Free Shipping"
  //       className="col-span-full"
  //       value={row.original.isActive ? 'true' : 'false'}
  //       checked={row.original.isActive}
  //       onChange={(e) =>
  //         e.target.value == 'true'
  //           ? (row.original.isActive = true)
  //           : (row.original.isActive = false)
  //       }
  //     />
  //   ),
  // }),
];

const StandardRateEdit = ({
  standardRate,
}: {
  standardRate: standardRateDataType;
}) => {
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
            view: <CreateStandardrateModalView standardRate={standardRate} />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
