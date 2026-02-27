'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Switch, Text, Title, Tooltip } from 'rizzui';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import { formatPrice } from '@/config/format-pricing';
import { JobFormDataType } from '@/data/jobpnp-data';
import DateCell from '@core/ui/date-cell';

const columnHelper = createColumnHelper<JobFormDataType>();

export const JobListColumns = [
  columnHelper.accessor('jobName', {
    id: 'jobName',
    size: 180,
    header: 'Job Details',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.jobName}`}
        </Title>
        <Text className="text-sm">{row.original?.division}</Text>
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
    id: 'jobType',
    size: 80,
    header: 'Job Type',
    cell: ({ row }) => <Text className="text-sm">{row.original?.jobType}</Text>,
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
    header: 'Qty',
    cell: ({ row }) => <Text className="text-sm">{row.original.totalQty}</Text>,
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
