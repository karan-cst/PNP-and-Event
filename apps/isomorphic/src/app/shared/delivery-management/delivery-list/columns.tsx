'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Text, Title, Tooltip } from 'rizzui';
import { DeliveryDataType } from './table';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import { AiOutlineExport } from 'react-icons/ai';
const columnHelper = createColumnHelper<DeliveryDataType>();

export const DeliveryListColumns = (opts: {
  role?: string;
  onEdit: (delivery: DeliveryDataType) => void;
  onOpenJob?: () => void; // optional (if you want)
}) => {
  const { role, onEdit, onOpenJob } = opts;

  return [
    columnHelper.accessor('jobName', {
      id: 'jobName',
      size: 240,
      header: 'Job',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title
            as="h5"
            className="flex cursor-pointer items-center gap-1 !text-sm font-medium hover:underline"
            onClick={onOpenJob}
          >
            {`${row.original.jobName}`}
            <span>
              <AiOutlineExport />
            </span>
          </Title>
          <Text className="text-sm">{row.original.jobId}</Text>
        </div>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      size: 140,
      header: 'User Name',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{row.original.createdBy}</Text>
          <Text className="text-xs">{row.original.createdAt}</Text>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'sapCode',
      size: 120,
      header: 'SAP Code',
      cell: ({ row }) => (
        <Text className="text-sm">{row.original.sapCode.join(', ')}</Text>
      ),
    }),
    columnHelper.accessor('division', {
      id: 'division',
      size: 100,
      header: 'Division / SBU',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">
            {`${row.original?.division?.name ? row.original?.division?.name : '-'}`}
          </Text>
        </div>
      ),
    }),
    columnHelper.accessor('printer', {
      id: 'printer',
      size: 150,
      header: 'Printer Name',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{`${row.original?.printer ? [row.original?.printer, 'Silver print'].join(', ') : '-'}`}</Text>
        </div>
      ),
    }),
    columnHelper.accessor('qty', {
      id: 'qty',
      size: 140,
      header: 'Total Qty ',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm font-semibold">{`${row.original?.qty ? row.original?.qty : '-'}`}</Text>
        </div>
      ),
    }),
    columnHelper.accessor('packing', {
      id: 'qty',
      size: 140,
      header: 'Packing Qty',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{`${row.original?.packing ? row.original?.packing : '-'}`}</Text>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'deliveryLocation',
      size: 150,
      header: 'Delivery Location',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm font-semibold">{`${row.original?.deliveryLocation ? row.original?.deliveryLocation : '-'}`}</Text>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'deliveryDate',
      size: 150,
      header: 'Delivery Date',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{`${row.original?.deliveryDate ? row.original?.deliveryDate : '-'}`}</Text>
        </div>
      ),
    }),
    // columnHelper.display({
    //   id: 'status',
    //   size: 150,
    //   header: 'Status',
    //   cell: ({ row }) => (
    //     <Text className="text-sm">{`${row.original?.status ? row.original?.status : '-'}`}</Text>
    //   ),
    // }),
    columnHelper.display({
      id: 'followupDate',
      size: 150,
      header: 'Follow Up Date',
      cell: ({ row }) => <Text className="text-sm">-</Text>,
    }),
    columnHelper.display({
      id: 'printerDate',
      size: 150,
      header: 'Printer Date',
      cell: ({ row }) => (
        <Text className="text-sm">{`${row.original?.printerDate ? row.original?.printerDate : '-'}`}</Text>
      ),
    }),
    columnHelper.display({
      id: 'remarks',
      size: 200,
      header: 'Remarks',
      cell: ({ row }) => {
        const remarks = row.original?.remarks || '';

        return (
          <Tooltip
            size="sm"
            content={
              <div className="max-w-[300px] whitespace-pre-wrap break-words">
                {remarks}
              </div>
            }
            placement="top"
            color="invert"
          >
            <Text className="text-sm">
              {remarks.length > 50 ? `${remarks.slice(0, 50)}...` : remarks}
            </Text>
          </Tooltip>
        );
      },
    }),
    columnHelper.display({
      id: 'action',
      size: 50,
      header: 'Action',
      cell: ({ row }) => (
        <DeliveryEdit delivery={row.original} onEdit={onEdit} />
      ),
    }),
  ];
};

const DeliveryEdit = ({
  delivery,
  onEdit,
}: {
  delivery: DeliveryDataType;
  onEdit: (delivery: DeliveryDataType) => void;
}) => {
  return (
    <Tooltip size="sm" content={'Edit Event'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Product'}
        onClick={() => onEdit(delivery)}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
