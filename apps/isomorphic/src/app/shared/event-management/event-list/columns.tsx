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
import dayjs from 'dayjs';
import { FiCheck } from 'react-icons/fi';
import ClientUploadModal from '../client-upload/ClientUploadModal';

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
      id: 'startDate',
      size: 120,
      header: 'Event Date',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{`${dayjs(row.original.startDate).format('DD/MM/YYYY')} - ${dayjs(row.original.endDate).format('DD/MM/YYYY')}`}</Text>
        </div>
      ),
    }),
    columnHelper.accessor('location.city', {
      id: 'location',
      size: 120,
      header: 'Location',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{`${row.original.location.city}, ${row.original.location.state}`}</Text>
        </div>
      ),
    }),

    columnHelper.display({
      id: 'elements',
      size: 120,
      header: 'Elements',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title
            as="h5"
            className="flex cursor-pointer items-center gap-1 !text-sm font-medium hover:underline"
            onClick={() => {}}
          >
            {`${row.original.elements}`}
            <span>
              <AiOutlineExport />
            </span>
          </Title>
        </div>
      ),
    }),

    columnHelper.accessor('stdTotal', {
      id: 'stdTotal',
      size: 120,
      header: 'Std Total/ Tentative Cost',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{formatPrice(row.original.stdTotal)}/</Text>
          <Text className="text-sm">
            {formatPrice(row.original.vendor1Total)}
          </Text>
        </div>
      ),
    }),
    columnHelper.accessor('clientRate', {
      id: 'clientRate',
      size: 120,
      header: 'Client Rate',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">
            {formatPrice(row.original.clientRate)}/
          </Text>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'priority',
      size: 100,
      header: 'Priority',
      cell: ({ row }) => getStatusBadge(row.original.priority),
    }),
    columnHelper.display({
      id: 'status',
      size: 100,
      header: 'Status',
      cell: ({ row }) => row.original.status,
    }),
    // columnHelper.accessor('lowestVendorName', {
    //   id: 'lowestVendorName',
    //   size: 150,
    //   header: 'Lowest vendor',
    //   cell: ({ row }) => (
    //     <div className={cn('grid gap-1')}>
    //       <Text className="text-sm">
    //         {`${row.original?.lowestVendorName ? row.original?.lowestVendorName : '-'}`}
    //       </Text>
    //     </div>
    //   ),
    // }),
    // columnHelper.accessor('finalizedBy', {
    //   id: 'finalizedBy',
    //   size: 150,
    //   header: 'Finalized By',
    //   cell: ({ row }) => (
    //     <div className={cn('grid gap-1')}>
    //       <Text className="text-sm">
    //         {`${row.original?.finalizedBy ? row.original?.finalizedBy : '-'}`}
    //       </Text>
    //     </div>
    //   ),
    // }),
    // columnHelper.accessor('finalizedVendorName', {
    //   id: 'finalizedVendorName',
    //   size: 150,
    //   header: 'Finalized Vendor',
    //   cell: ({ row }) => (
    //     <div className={cn('grid gap-1')}>
    //       <Text className="text-sm">{`${row.original?.finalizedVendorName ? row.original?.finalizedVendorName : '-'}`}</Text>
    //     </div>
    //   ),
    // }),
    // columnHelper.accessor('reasonToChoose', {
    //   id: 'reasonToChoose',
    //   size: 150,
    //   header: 'Reason To Choose',
    //   cell: ({ row }) => (
    //     <div className={cn('grid gap-1')}>
    //       <Text className="text-sm">{`${row.original?.reasonToChoose ? row.original?.reasonToChoose : '-'}`}</Text>
    //       {/* <Tooltip size="sm" content={'View User'} placement="top" color="invert">
    //       <ActionIcon
    //         as="span"
    //         size="sm"
    //         variant="outline"
    //         aria-label={'View Product'}
    //       >
    //         <EyeIcon className="h-4 w-4" />
    //       </ActionIcon>
    //     </Tooltip> */}
    //     </div>
    //   ),
    // }),
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

  const handleClient = (data: EventDataType) => {
    openModal({
      view: <ClientUploadModal rowData={data} onClose={() => closeModal()} />,
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
        content={'Client Update'}
        placement="top"
        color="invert"
      >
        {/* router.push('/event-management/vendors') */}
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Client Approval'}
          onClick={() => {
            handleClient(event);
          }}
        >
          <FiCheck className="h-4 w-4" />
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
