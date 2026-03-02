'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { GlCodeDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateGLCodeModalView } from '../glcode-page-header';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<GlCodeDataType>();

export const GlCodeListColumns = [
  columnHelper.display({
    id: 'id',
    size: 130,
    header: 'GL ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.accessor('glCode', {
    id: 'glCode',
    size: 130,
    header: 'GL Code',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {row.original.glCode}
        </Title>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'jobPurpose',
    size: 150,
    header: 'Job Purpose',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.jobPurpose}</Text>
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
        <GLCodeEdit glcode={row.original} />
      </Flex>
    ),
  }),
];

const GLCodeEdit = ({ glcode }: { glcode: GlCodeDataType }) => {
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
            view: <CreateGLCodeModalView glcode={glcode} />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
