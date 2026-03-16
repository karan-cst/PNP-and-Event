'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { DivisionClientDataType } from './table';
import DateCell from '@core/ui/date-cell';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import {
  PiUserCircleGearDuotone,
  PiUserCirclePlusDuotone,
  PiXBold,
} from 'react-icons/pi';
import { DivisionDataType } from '../../division-management/division-list/table';
import { CreateClientModalView } from '../division-page-header';

const columnHelper = createColumnHelper<DivisionClientDataType>();

export const DivisionClientListColumns = [
  columnHelper.display({
    id: 'id',
    size: 130,
    header: 'Client ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.accessor('company', {
    id: 'company',
    size: 130,
    header: 'Company',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.company.name}</Text>
        <Text className="text-sm">{row.original.company.isPharma}</Text>
      </>
    ),
  }),
  columnHelper.accessor('division', {
    id: 'division',
    size: 130,
    header: 'Division',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.division.divisionCode}</Text>
        <Text className="text-sm">{row.original.division.team}</Text>
      </>
    ),
  }),
  columnHelper.accessor('name', {
    id: 'Name',
    size: 130,
    header: 'Name',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.name}</Text>
        <Text className="text-sm">{row.original.phone}</Text>
      </>
    ),
  }),
  columnHelper.display({
    id: 'email',
    size: 130,
    header: 'Email',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.email}</Text>
      </>
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
        <EditClient client={row.original} />
      </Flex>
    ),
  }),
];

const EditClient = ({ client }: { client: DivisionClientDataType }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Edit Client'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Client'}
        onClick={() =>
          openModal({
            view: <CreateClientModalView client={client} />,
            customSize: 720,
          })
        }
      >
        <PiUserCircleGearDuotone className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
