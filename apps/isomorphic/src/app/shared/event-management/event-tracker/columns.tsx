'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Text, Title, Tooltip } from 'rizzui';
import { EventTrackerDataType } from './table';
import cn from '@core/utils/class-names';
import { PiDownloadDuotone, PiEyeBold } from 'react-icons/pi';
import { AiOutlineExport } from 'react-icons/ai';
import { formatPrice } from '@/config/format-pricing';
import { useModal } from '../../modal-views/use-modal';
import { VendorViewModalView } from '../vendor-view/vendorViewModal';

const columnHelper = createColumnHelper<EventTrackerDataType>();

export const EventTrackerListColumns = [
  columnHelper.accessor('clientName', {
    id: 'clientName',
    size: 150,
    header: 'Client',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.clientName}`}
        </Title>
        <Text className="text-sm">{row.original?.name}</Text>
        {/* <Text className="text-sm">{`${row.original.isPharma ? row.original?.divisionName : row.original.clientName} - ${row.original.eventType}`}</Text> */}
      </div>
    ),
  }),
  columnHelper.accessor('eventName', {
    id: 'eventName',
    size: 150,
    header: 'Event Name',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.eventName}</Text>
    ),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row }) => <Text className="text-sm">{row.original?.status}</Text>,
  }),
  columnHelper.accessor('UserName', {
    id: 'UserName',
    size: 150,
    header: 'User Name',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.UserName}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('vendorName', {
    id: 'vendorName',
    size: 150,
    header: 'Venodr Name',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.vendorName}</Text>
        <ShowPrice EventTrackerData={row.original} />
      </div>
    ),
  }),
  columnHelper.accessor('clientCost', {
    id: 'clientCost',
    size: 150,
    header: 'Client Cost',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">
          {' '}
          {formatPrice(row.original?.clientCost)}
        </Text>
      </div>
    ),
  }),
  columnHelper.accessor('margin', {
    id: 'margin',
    size: 150,
    header: 'Margin',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">
          {row.original?.margin ? `${row.original?.margin} %` : '-'}
        </Text>
      </div>
    ),
  }),
  columnHelper.accessor('poStatus', {
    id: 'poStatus',
    size: 150,
    header: 'PO Status',
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original?.poStatus ? row.original?.poStatus : '-'}
      </Text>
    ),
  }),
];

export const ShowPrice = ({
  EventTrackerData,
}: {
  EventTrackerData: EventTrackerDataType;
}) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'View Prices'} placement="top" color="invert">
      <Text
        className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
        onClick={() => {
          openModal({
            view: <VendorViewModalView />,
            customSize: 900,
          });
        }}
      >
        {formatPrice(EventTrackerData?.venodrCost)}
        <span>
          <AiOutlineExport />
        </span>
      </Text>
    </Tooltip>
  );
};
