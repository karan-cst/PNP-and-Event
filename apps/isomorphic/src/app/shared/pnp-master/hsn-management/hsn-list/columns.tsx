'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { HSNDataType } from './table';
import cn from '@core/utils/class-names';
import DateCell from '@core/ui/date-cell';
import PencilIcon from '@core/components/icons/pencil';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { CreateHSNModalView } from '../hsn-page-header';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<HSNDataType>();

export const HSNListColumns = [
  columnHelper.display({
    id: 'id',
    size: 130,
    header: 'HSN ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.accessor('HSNCode', {
    id: 'HSNCode',
    size: 130,
    header: 'HSN Code',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.HSNCode}`}
        </Title>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'title',
    size: 150,
    header: 'Title',
    cell: ({ row }) => <Text className="text-sm">{row.original.title}</Text>,
  }),
  columnHelper.display({
    id: 'subtitle',
    size: 150,
    header: 'Sub Title',
    cell: ({ row }) => <Text className="text-sm">{row.original.subtitle}</Text>,
  }),
  columnHelper.accessor('description', {
    id: 'description',
    size: 280,
    header: 'Description',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original.description}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('gst', {
    id: 'gst',
    size: 100,
    header: 'GST',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{`${row.original.gst} %`}</Text>
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
        <HSNEdit hsn={row.original} />

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

const HSNEdit = ({ hsn }: { hsn: HSNDataType }) => {
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
            view: <CreateHSNModalView hsn={hsn} />,
            customSize: 720,
          })
        }
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
