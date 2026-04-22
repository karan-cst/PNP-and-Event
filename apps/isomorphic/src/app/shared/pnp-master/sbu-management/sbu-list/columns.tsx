'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { sbuDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateDivisionModalView } from '../sbu-page-header';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<sbuDataType>();

export const DivisionListColumns = [
  columnHelper.display({
    id: 'id',
    size: 130,
    header: 'Division ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.accessor('divisionCode', {
    id: 'divisionCode',
    size: 130,
    header: 'Division Code',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.divisionCode}`}
        </Title>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'ccCode',
    size: 150,
    header: 'CC Code',
    cell: ({ row }) => <Text className="text-sm">{row.original.ccCode}</Text>,
  }),
  columnHelper.display({
    id: 'company',
    size: 150,
    header: 'CC Code',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {row.original.company.name}
        </Title>
        <Text className="text-sm">{row.original.company.isPharma}</Text>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'divisions',
    size: 150,
    header: 'Divisions',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">
          {row.original.divisions?.join(', ') || '-'}
        </Text>
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
        <DivisionEdit division={row.original} />

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

const DivisionEdit = ({ division }: { division: sbuDataType }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Edit SBU'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit SBU'}
        onClick={() =>
          openModal({
            view: <CreateDivisionModalView division={division} />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
