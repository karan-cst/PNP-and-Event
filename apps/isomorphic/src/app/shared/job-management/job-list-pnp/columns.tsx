'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Text, Title, Tooltip } from 'rizzui';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import { formatPrice } from '@/config/format-pricing';
import { JobFormDataType } from '@/data/jobpnp-data';
import { AiOutlineExport } from 'react-icons/ai';
import {PiMicrosoftExcelLogo } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';

const columnHelper = createColumnHelper<JobFormDataType>();

export const JobListColumns = [
  columnHelper.accessor('jobName', {
    id: 'jobName',
    size: 250,
    header: 'Job Details',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Link href={`/job-management/job-view`} className="group inline-block">
          <Title
            as="h5"
            className="cursor-pointer !text-sm font-medium text-blue-600 transition group-hover:underline"
          >
            {row.original.jobName}
          </Title>
        </Link>
        <Text className="text-sm">
          {row.original?.division}-{row.original.jobType}
        </Text>
        <Text className="text-sm">{row.original.jobNo}</Text>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'user',
    size: 120,
    header: 'User Name',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">ABC</Text>
        <Text className="text-sm">CS User</Text>
      </>
    ),
  }),
  columnHelper.display({
    id: 'totalQty',
    size: 120,
    header: 'Std Total/Qty',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{formatPrice(row.original.stdTotal)}</Text>
        <Text className="text-sm">{row.original.totalQty}</Text>
      </>
    ),
  }),
  columnHelper.display({
    id: 'PrintExecutiveStatus',
    size: 120,
    header: 'Print Executive Status',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title
          as="h5"
          className="cursor-pointer !text-sm font-medium transition group-hover:underline"
        >
          {row.original?.printExecutive?.userName || '-'}
        </Title>
        <Text className="text-xs">
          {row.original?.printExecutive?.status || ''}-
          {row.original?.printExecutive?.date || ''}
        </Text>
      </div>
    ),
  }),
  columnHelper.accessor('operationHead', {
    id: 'operationHead',
    size: 200,
    header: 'Operation Head',
    cell: ({ row }) => {
      const stage = row.original?.operationHead;
      return (
        <div className="grid gap-1">
          <Text className="text-sm font-medium">{stage?.userName || '-'}</Text>
          <Text className="text-xs">
            {stage?.status}
            {stage?.date ? ` • ${stage?.date}` : ''}
          </Text>
        </div>
      );
    },
  }),
  columnHelper.accessor('designCost', {
    id: 'designCost',
    size: 200,
    header: 'Design Cost + Business Head',
    cell: ({ row }) => {
      const stage = row.original?.businessHeadName;
      return (
        <div className="grid gap-1">
          <Text className="text-sm font-medium">
            {formatPrice(row.original.designCost || 0)}
          </Text>
          <Text className="text-xs text-gray-500">
            {row.original?.businessHeadName?.userName || '-'}
          </Text>
          <Text className="text-xs">
            {stage?.status}
            {stage?.date ? ` • ${stage?.date}` : ''}
          </Text>
        </div>
      );
    },
  }),
  columnHelper.accessor('printManager', {
    id: 'printManager',
    size: 200,
    header: 'Print Manager',
    cell: ({ row }) => {
      const manager = row.original?.printManager;
      return (
        <div className="grid gap-1">
          <Text className="text-sm font-medium">
            {manager?.managerName || '-'}
          </Text>
          <Text className="text-xs">
            {manager?.vendorSelectionStatus}
            {manager?.date ? ` • ${manager?.date}` : ''}
          </Text>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: 'finalizedVendor',
    size: 150,
    header: 'Finalized Vendor',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original?.finalizedVendor}</Text>
        <Text
          className={cn(
            'flex items-center gap-1 text-sm font-semibold',
            row.original?.finalizedVendor
              ? 'cursor-pointer text-blue-600 hover:underline'
              : 'cursor-not-allowed text-gray-400'
          )}
        >
          {formatPrice(row.original?.finalizedVendorCost)}
          <span>
            <AiOutlineExport />
          </span>
        </Text>
      </>
    ),
  }),

  columnHelper.display({
    id: 'deliveryDate',
    size: 120,
    header: 'Delivery Date',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Text className="text-sm">
          {dayjs(row.original.deliveryDate).format('DD/MM/YYYY')}
        </Text>
        <Text className="text-sm">{row.original?.deliveryPlace || ''}</Text>
      </div>
    ),
  }),

  columnHelper.display({
    id: 'action',
    size: 50,
    header: 'Action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <div className="flex gap-1">
        <EventEdit job={row.original as JobFormDataType} />
        <Flex>
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
                window.open('/templates/Vendor_Quote_Template.xlsx', '_blank');
              }}
            >
              <PiMicrosoftExcelLogo className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
        </Flex>
      </div>
    ),
  }),
];

const EventEdit = ({ job }: { job: JobFormDataType }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/job-management/edit-job`);
  };
  return (
    <Flex>
      <Tooltip size="sm" content={'Edit Job'} placement="top" color="invert">
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Job'}
          onClick={handleEdit}
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};
