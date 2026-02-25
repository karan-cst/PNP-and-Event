'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import { EventDataType } from './table';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import { PiEyeBold, PiMicrosoftExcelLogo, PiPlusBold } from 'react-icons/pi';
import { useModal } from '../../modal-views/use-modal';
import VendorUploadModal from '../vendor-upload/vendorUpload';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/config/format-pricing';

const columnHelper = createColumnHelper<EventDataType>();

export const EventListColumns = [
  columnHelper.display({
    id: 'id',
    size: 50,
    header: 'Event Id',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),
  columnHelper.accessor('eventName', {
    id: 'eventName',
    size: 200,
    header: 'Event Details',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.eventName}`}
        </Title>
        <Text className="text-sm">{`${row.original.isPharma ? row.original?.divisionName : row.original.clientName} - ${row.original.eventType}`}</Text>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'stdTotal',
    size: 120,
    header: 'Std Total',
    cell: ({ row }) => (
      <Text className="text-sm">{formatPrice(row.original.stdTotal)}</Text>
    ),
  }),
  columnHelper.accessor('lowestVendorName', {
    id: 'lowestVendorName',
    size: 150,
    header: 'Lowest vendor name',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">
          {`${row.original?.lowestVendorName ? row.original?.lowestVendorName : '-'}`}
        </Text>
      </div>
    ),
  }),
  columnHelper.accessor('finalizedBy', {
    id: 'finalizedBy',
    size: 150,
    header: 'Finalized By',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">
          {`${row.original?.finalizedBy ? row.original?.finalizedBy : '-'}`}
        </Text>
      </div>
    ),
  }),
  columnHelper.accessor('finalizedVendorName', {
    id: 'finalizedVendorName',
    size: 150,
    header: 'Finalized Vendor Name',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{`${row.original?.finalizedVendorName ? row.original?.finalizedVendorName : '-'}`}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('reasonToChoose', {
    id: 'reasonToChoose',
    size: 150,
    header: 'Reason To Choose',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{`${row.original?.reasonToChoose ? row.original?.reasonToChoose : '-'}`}</Text>
        {/* <Tooltip size="sm" content={'View User'} placement="top" color="invert">
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'View Product'}
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip> */}
      </div>
    ),
  }),
  columnHelper.display({
    id: 'action',
    size: 150,
    header: 'Action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => <Action event={row.original} />,
  }),
];

const EventEdit = ({ event }: { event: EventDataType }) => {
  return (
    <Tooltip size="sm" content={'Edit Event'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Product'}
        onClick={() => {}}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

const Action = ({ event }: { event: EventDataType }) => {
  const router = useRouter();

  return (
    <Flex align="center" justify="start" gap="3" className="pe-4">
      <EventEdit event={event} />
      <Tooltip
        size="sm"
        content={'Download Excel'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Product'}
          onClick={() => {
            window.open('/templates/events.xlsx', '_blank');
          }}
        >
          <PiMicrosoftExcelLogo className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <Tooltip
        size="sm"
        content={'View Vendors'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'View Vendors'}
          onClick={() => router.push('/event-management/vendors')}
        >
          <PiEyeBold className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
