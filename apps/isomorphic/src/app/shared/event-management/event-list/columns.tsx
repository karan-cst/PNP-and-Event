'use client';
import { createColumnHelper } from '@tanstack/react-table';
import {
  ActionIcon,
  Button,
  Flex,
  Select,
  Switch,
  Text,
  Title,
  Tooltip,
} from 'rizzui';
import { EventDataType } from './table';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';
import {
  PiEyeBold,
  PiMicrosoftExcelLogo,
  PiPlusBold,
  PiUserSwitchDuotone,
  PiXBold,
} from 'react-icons/pi';
import { useModal } from '../../modal-views/use-modal';
import VendorUploadModal from '../vendor-upload/vendorUpload';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/config/format-pricing';
import { useState } from 'react';
import { AiOutlineExport } from 'react-icons/ai';

const columnHelper = createColumnHelper<EventDataType>();

export const EventListColumns = (role?: string) => {
  const router = useRouter();
  return [
    columnHelper.accessor('id', {
      id: 'id',
      size: 50,
      header: 'Id',
      cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
    }),
    columnHelper.accessor('eventName', {
      id: 'eventName',
      size: 200,
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
      header: 'Lowest vendor',
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
      header: 'Finalized Vendor',
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
      }) => <Action event={row.original} role={role} />,
    }),
  ];
};

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

const Action = ({ event, role }: { event: EventDataType; role?: string }) => {
  const router = useRouter();
  const [isApprove, setIsApprove] = useState<string>('karan');
  const { openModal, closeModal } = useModal();

  const handleOpen = () => {
    openModal({
      view: (
        <div className="m-auto px-5 pb-8 pt-5">
          <div className="mb-5 flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Assign New User
            </Title>

            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>
          <div className="space-y-4">
            <Select
              label="Reassign User"
              inPortal={false}
              labelClassName="text-sm font-medium text-gray-900"
              dropdownClassName="h-auto"
              placeholder="Approve or Reject"
              options={[
                { label: 'Karan', value: 'karan' },
                { label: 'Amulakh', value: 'Amulakh' },
              ]}
              value={isApprove}
              onChange={(e: string) => setIsApprove(e)}
              getOptionValue={(option) => option.value}
              displayValue={(selected) =>
                [
                  { label: 'Karan', value: 'karan' },
                  { label: 'Amulakh', value: 'Amulakh' },
                ].find((r) => r.value === selected)?.label ?? ''
              }
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => {}}>Submit</Button>
          </div>
        </div>
      ),
      customSize: 500,
    });
  };
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
      {role == 'operationHead' && (
        <Tooltip
          size="sm"
          content={'Reassign user'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'Reassign user'}
            onClick={handleOpen}
          >
            <PiUserSwitchDuotone className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      )}
    </Flex>
  );
};
