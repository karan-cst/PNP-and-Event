'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Text, Title, Tooltip } from 'rizzui';
import cn from '@core/utils/class-names';
import { PODataType } from './table';
import { AiOutlineExport } from 'react-icons/ai';
import {
  PiCheckFatDuotone,
  PiDownloadDuotone,
  PiUploadDuotone,
  PiXLogoDuotone,
} from 'react-icons/pi';
import { formatPrice } from '@/config/format-pricing';

const columnHelper = createColumnHelper<PODataType>();

export const POColumns = [
  columnHelper.accessor('clientName', {
    id: 'clientName',
    size: 150,
    header: 'Client',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.clientName}`}
        </Title>
        <Text className="text-sm">{row.original?.UserName}</Text>
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
  columnHelper.display({
    id: 'city',
    size: 150,
    header: 'City',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">Ahmedabad</Text>
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
        <Tooltip
          size="sm"
          content={'View Prices'}
          placement="top"
          color="invert"
        >
          <Text className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
            {formatPrice(row.original?.venodrCost)}
            <span>
              <AiOutlineExport />
            </span>
          </Text>
        </Tooltip>
      </div>
    ),
  }),
  columnHelper.accessor('firstLevelStatus', {
    id: 'firstLevelStatus',
    size: 150,
    header: '1st Level Status (FM)',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Tooltip
          size="sm"
          content={'View Comment'}
          placement="top"
          color="invert"
        >
          <Text className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
            {row.original?.firstLevelStatus}{' '}
            <span>
              <AiOutlineExport />
            </span>
          </Text>
        </Tooltip>
        <Text className="text-sm">{row.original?.firstLevelBy}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('secondLevelStatus', {
    id: 'secondLevelStatus',
    size: 150,
    header: '2nd Level Status (FH)',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        {row.original?.secondLevelStatus && (
          <Tooltip
            size="sm"
            content={'View Comment'}
            placement="top"
            color="invert"
          >
            <Text className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
              {row.original?.secondLevelStatus}
              <span>
                <AiOutlineExport />
              </span>
            </Text>
          </Tooltip>
        )}
        <Text className="text-sm">{row.original?.secondLevelBy}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('poStatus', {
    id: 'poStatus',
    size: 150,
    header: 'Invoice',
    cell: ({ row }) => (
      <Flex align="center" justify="start" gap="3" className="pe-4">
        <Tooltip
          size="sm"
          content={'Download Invoice'}
          placement="top"
          color="invert"
        >
          <PiDownloadDuotone className="h-6 w-6" />
        </Tooltip>
        <Tooltip
          size="sm"
          content={'Upload Invoice'}
          placement="top"
          color="invert"
        >
          <PiUploadDuotone className="h-6 w-6" />
        </Tooltip>
      </Flex>
    ),
  }),
  columnHelper.accessor('poStatus', {
    id: 'poStatus',
    size: 150,
    header: 'Invoice',
    cell: ({ row }) => (
      <Flex align="center" justify="start" gap="3" className="pe-4">
        <Tooltip
          size="sm"
          content={'Approve Invoice'}
          placement="top"
          color="invert"
        >
          <PiCheckFatDuotone className="h-6 w-6" />
        </Tooltip>
        <Tooltip
          size="sm"
          content={'Reject Invoice'}
          placement="top"
          color="invert"
        >
          <PiXLogoDuotone className="h-6 w-6" />
        </Tooltip>
      </Flex>
    ),
  }),
];
