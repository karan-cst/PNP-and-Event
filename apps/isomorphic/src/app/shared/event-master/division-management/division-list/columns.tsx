'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { DivisionDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateDivisionModalView } from '../division-page-header';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { PiUserCirclePlusDuotone, PiXBold } from 'react-icons/pi';
import AddSPOC from '../add-spoc/addSpoc';
import EyeIcon from '@core/components/icons/eye';

const columnHelper = createColumnHelper<DivisionDataType>();

export const DivisionListColumns = [
  columnHelper.display({
    id: 'id',
    size: 130,
    header: 'Division ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.display({
    id: 'client',
    size: 130,
    header: 'Company',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.company.name}</Text>
        <Text className="text-sm">{row.original.company.isPharma}</Text>
      </>
    ),
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
  columnHelper.accessor('ccCode', {
    id: 'ccCode',
    size: 150,
    header: 'CC Code',
    cell: ({ row }) => <Text className="text-sm">{row.original.ccCode}</Text>,
  }),
  columnHelper.display({
    id: 'team',
    size: 150,
    header: 'Team',
    cell: ({ row }) => <Text className="text-sm">{row.original.team}</Text>,
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
        <Tooltip
          size="sm"
          content={'View Division'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'View Division'}
            onClick={() => {}}
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <DivisionEdit division={row.original} />
        <AddUser division={row.original} />
      </Flex>
    ),
  }),
];

const DivisionEdit = ({ division }: { division: DivisionDataType }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Edit Division'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Division'}
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

const AddUser = ({ division }: { division: DivisionDataType }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Add Client'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Add Client'}
        onClick={() =>
          openModal({
            view: <CreateSPOCAddModalView division={division} />,
            customSize: 720,
          })
        }
      >
        <PiUserCirclePlusDuotone className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export function CreateSPOCAddModalView({
  division,
}: {
  division?: DivisionDataType;
}) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add Client for {division?.divisionCode} - {division?.company?.name}
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <AddSPOC
        id={division?.id || ''}
        isModalView={false}
        division={division}
      />
    </div>
  );
}
