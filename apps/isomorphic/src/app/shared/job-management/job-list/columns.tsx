'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import { formatPrice } from '@/config/format-pricing';
import { JobFormDataType } from '@/data/jobpnp-data';
import DateCell from '@core/ui/date-cell';
import { AiOutlineExport } from 'react-icons/ai';
import { PiEyeBold } from 'react-icons/pi';
import { useRouter } from 'next/navigation';

const columnHelper = createColumnHelper<JobFormDataType>();

export const JobListColumns = [
  columnHelper.accessor('jobName', {
    id: 'jobName',
    size: 160,
    header: 'Job Details',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.jobName}`}
        </Title>
        <Text className="text-sm">
          {row.original?.division}-{row.original.jobType}
        </Text>
      </div>
    ),
  }),
  columnHelper.display({
    id: 'createdAt',
    size: 120,
    header: 'Created Date',
    cell: ({ row }) => <DateCell date={new Date(row.original?.createdAt)} />,
  }),

  columnHelper.display({
    id: 'jobNo',
    size: 70,
    header: 'JOB ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.jobNo}</Text>,
  }),
  columnHelper.display({
    id: 'totalQty',
    size: 50,
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
      <Text className="text-sm">{row.original.PrintExecutiveStatus}</Text>
    ),
  }),
  columnHelper.display({
    id: 'deliveryDate',
    size: 120,
    header: 'Delivery Date',
    cell: ({ row }) => <DateCell date={new Date(row.original.deliveryDate)} />,
  }),
  columnHelper.display({
    id: 'finalizedVendor',
    size: 80,
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
    id: 'action',
    size: 50,
    header: 'Action',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => <EventEdit job={row.original} />,
  }),
];

const EventEdit = ({ job }: { job: JobFormDataType }) => {
  const router = useRouter();
  return (
    <Flex>
      <Tooltip size="sm" content={'Edit Job'} placement="top" color="invert">
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Job'}
          onClick={() => {}}
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
      <Tooltip size="sm" content={'View Job'} placement="top" color="invert">
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'View Job'}
          onClick={() => router.push('/job-management/vendors')}
        >
          <PiEyeBold className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

// const Action = ({ event }: { event: EventDataType }) => {
//   const router = useRouter();

//   return (
//     <Flex align="center" justify="start" gap="3" className="pe-4">
//       <EventEdit event={event} />
//       <Tooltip
//         size="sm"
//         content={'Download Excel'}
//         placement="top"
//         color="invert"
//       >
//         <ActionIcon
//           as="span"
//           size="sm"
//           variant="outline"
//           aria-label={'Edit Product'}
//           onClick={() => {
//             window.open('/templates/events.xlsx', '_blank');
//           }}
//         >
//           <PiMicrosoftExcelLogo className="h-4 w-4" />
//         </ActionIcon>
//       </Tooltip>
//       <Tooltip
//         size="sm"
//         content={'View Vendors'}
//         placement="top"
//         color="invert"
//       >
//         <ActionIcon
//           as="span"
//           size="sm"
//           variant="outline"
//           aria-label={'View Vendors'}
//           onClick={() => router.push('/event-management/vendors')}
//         >
//           <PiEyeBold className="h-4 w-4" />
//         </ActionIcon>
//       </Tooltip>
//     </Flex>
//   );
// };
