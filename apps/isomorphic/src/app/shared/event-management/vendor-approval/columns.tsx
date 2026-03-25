'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Text, Title, Tooltip } from 'rizzui';
import { EventDataType } from './table';
import cn from '@core/utils/class-names';
import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiMicrosoftExcelLogo,
} from 'react-icons/pi';
import { useModal } from '../../modal-views/use-modal';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/config/format-pricing';
import { AiOutlineExport } from 'react-icons/ai';
import { FiEye } from 'react-icons/fi';
import { VendorPriceCompairView } from '../vendor-price-compair-view/vendorPriceCompair';

const columnHelper = createColumnHelper<EventDataType>();

export const EventListColumns = (role?: string, expanded: boolean = true) => {
  const { openModal, closeModal } = useModal();
  const handleOpenPriceModal = () => {
    openModal({
      view: <VendorPriceCompairView onClose={() => closeModal()} />,
      customSize: 900,
    });
  };
  const router = useRouter();
  const columns = [
    columnHelper.accessor('id', {
      id: 'id',
      size: 50,
      header: 'Id',
      cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
    }),
    columnHelper.accessor('eventName', {
      id: 'eventName',
      size: 220,
      header: 'Event Details',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title
            as="h5"
            className="flex cursor-pointer items-center gap-1 !text-sm font-medium hover:underline"
            onClick={() => router.push(`/event-management/event-detailes`)}
          >
            {`${row.original.eventName}`}
            <span>
              <AiOutlineExport />
            </span>
          </Title>
          <Text className="text-sm">{`${row.original.isPharma ? row.original?.divisionName : row.original.clientName} - ${row.original.eventType}`}</Text>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'totalVendor',
      size: 120,
      header: 'No. of Vendors',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title
            as="h5"
            className="flex cursor-pointer items-center gap-1 !text-sm font-semibold hover:underline"
            onClick={() => handleOpenPriceModal()}
          >
            {row.original.totalVendor}{' '}
            <span>
              <AiOutlineExport />
            </span>
          </Title>
        </div>
      ),
    }),
    columnHelper.accessor('finalizedVendorName', {
      id: 'finalizedVendorName',
      size: 150,
      header: 'Finalized Vendor',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{`${row.original?.finalizedVendorName ? row.original?.finalizedVendorName : '-'}`}</Text>
          <Text className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
            {formatPrice(row.original.vendor1Total)}
            <span>
              <AiOutlineExport />
            </span>
          </Text>
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
      }) => <Action event={row.original} role={role} />,
    }),
  ];

  return expanded ? [expandedOrdersColumns, ...columns] : columns;
};

const expandedOrdersColumns = columnHelper.display({
  id: 'expandedHandler',
  size: 60,
  cell: ({ row }) => (
    <>
      {row.getCanExpand() && (
        <ActionIcon
          size="sm"
          rounded="full"
          aria-label="Expand row"
          className="ms-2"
          variant={row.getIsExpanded() ? 'solid' : 'outline'}
          onClick={row.getToggleExpandedHandler()}
        >
          {row.getIsExpanded() ? (
            <PiCaretUpBold className="size-3.5" />
          ) : (
            <PiCaretDownBold className="size-3.5" />
          )}
        </ActionIcon>
      )}
    </>
  ),
});

const Action = ({ event, role }: { event: EventDataType; role?: string }) => {
  const router = useRouter();
  return (
    <Flex align="center" justify="start" gap="3" className="pe-4">
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
        content={'Vendor Detailes'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Vendor Detailes'}
          onClick={() => {
            router.push('/event-management/vendors');
          }}
        >
          <FiEye className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
