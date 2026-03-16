'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Avatar, Flex, Text, Tooltip } from 'rizzui';
import { CompanyDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateCompanyModalView } from '../pnp-page-header';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<CompanyDataType>();

export const CompanyListColumns = [
  columnHelper.accessor('id', {
    id: 'id',
    size: 120,
    header: 'Client Id',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.id}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('companyName', {
    id: 'companyName',
    size: 200,
    header: 'Client Name',
    cell: ({ row }) => {
      const { companyName, clientFrom } = row.original;

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
            <span className="text-xs text-gray-500">{clientFrom}</span>
          </div>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'email',
    size: 180,
    header: 'Email',
    cell: ({ row }) => <Text className="text-sm">{row.original.email}</Text>,
  }),
  columnHelper.display({
    id: 'isGSTApplicable',
    size: 200,
    header: 'GST Applicable',
    cell: ({ row }) => {
      const { isGSTApplicable, GSTNumber } = row.original;

      return (
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium text-gray-900">
            {isGSTApplicable ? `Yes` : 'No'}
          </span>
          <span className="text-xs text-gray-500">
            {isGSTApplicable ? GSTNumber : ''}
          </span>
        </div>
      );
    },
  }),
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 200,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
  columnHelper.display({
    id: 'status',
    size: 100,
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
        <ClientEdit client={row.original} />

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

const ClientEdit = ({ client }: { client: CompanyDataType }) => {
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
            view: <CreateCompanyModalView client={client} />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
