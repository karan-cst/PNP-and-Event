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
  columnHelper.accessor('company', {
    id: 'company',
    size: 150,
    header: 'Company',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.company}`}
        </Title>
        <Text className="text-sm">{row.original?.division}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('eventName', {
    id: 'eventName',
    size: 150,
    header: 'Event Name',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.eventName}`}
        </Title>
        <Text className="text-sm">{row.original?.client}</Text>
      </div>
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
        {row.original?.venodrCost ? (
          <ShowPrice EventTrackerData={row.original} />
        ) : (
          '-'
        )}
      </div>
    ),
  }),
  columnHelper.accessor('clientCost', {
    id: 'clientCost',
    size: 150,
    header: 'Client Cost',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.clientStatus}</Text>
        {row.original?.clientCost ? (
          <Tooltip
            size="sm"
            content={'Download'}
            placement="top"
            color="invert"
          >
            <Text
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
              onClick={() => {}}
            >
              {formatPrice(row?.original?.clientCost)}
              <span>
                <AiOutlineExport />
              </span>
            </Text>
          </Tooltip>
        ) : (
          '-'
        )}
      </div>
    ),
  }),
  columnHelper.accessor('margin', {
    id: 'margin',
    size: 150,
    header: 'Margin',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {row.original?.margin ? `${row.original?.margin} %` : '-'}
        </Title>
        <Text className="text-sm">
          {row.original?.venodrCost
            ? formatPrice(row.original?.clientCost - row.original?.venodrCost)
            : '-'}
        </Text>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'poStatus',
    size: 120,
    header: 'PO Status',
    cell: ({ row }) => (
      // <Text className="text-sm">
      //   {row.original?.poStatus ? row.original?.poStatus : '-'}
      // </Text>
      <div className={cn('grid gap-1')}>
        {row.original?.poStatus ? (
          <Tooltip
            size="sm"
            content={'Download PO'}
            placement="top"
            color="invert"
          >
            <Text
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
              onClick={() => {}}
            >
              {row?.original?.poStatus}
              <span>
                <AiOutlineExport />
              </span>
            </Text>
          </Tooltip>
        ) : (
          '-'
        )}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'invoiceStatus',
    size: 120,
    header: 'Invoice Status',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        {row.original?.invoiceStatus ? (
          <Tooltip
            size="sm"
            content={'Download Invoice'}
            placement="top"
            color="invert"
          >
            <Text
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
              onClick={() => {}}
            >
              {row?.original?.invoiceStatus}
              <span>
                <AiOutlineExport />
              </span>
            </Text>
          </Tooltip>
        ) : (
          '-'
        )}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'paymentStatus',
    size: 120,
    header: 'Payment Status',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        {row.original?.paymentStatus ? (
          <Tooltip
            size="sm"
            content={'Download Payment Receipt'}
            placement="top"
            color="invert"
          >
            <Text
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
              onClick={() => {}}
            >
              {row?.original?.paymentStatus}
              <span>
                <AiOutlineExport />
              </span>
            </Text>
          </Tooltip>
        ) : (
          '-'
        )}
      </div>
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
