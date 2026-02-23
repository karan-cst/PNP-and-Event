'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { Text, Title } from 'rizzui';
import { clientApproveDataType } from './table';
import cn from '@core/utils/class-names';

const columnHelper = createColumnHelper<clientApproveDataType>();

export const ClientApproveListColumns = [
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
  // columnHelper.accessor('name', {
  //   id: 'name',
  //   size: 150,
  //   header: 'Client Coordinator',
  //   cell: ({ row }) => (
  //     <div className={cn('grid gap-1')}>
  //       <Text className="text-sm">{row.original?.name}</Text>
  //     </div>
  //   ),
  // }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 150,
    header: 'Status',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.status}</Text>
      </div>
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
  columnHelper.accessor('venodrCost', {
    id: 'venodrCost',
    size: 150,
    header: 'Venodr Cost',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.venodrCost}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('clientCost', {
    id: 'clientCost',
    size: 150,
    header: 'Client Cost',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.clientCost}</Text>
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
  columnHelper.accessor('poStatus', {
    id: 'poStatus',
    size: 150,
    header: 'PO Status',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.poStatus}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('invoiceStatus', {
    id: 'invoiceStatus',
    size: 150,
    header: 'Invoice Status',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.invoiceStatus}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('paymentStatus', {
    id: 'paymentStatus',
    size: 150,
    header: 'Payment Status',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original?.paymentStatus}</Text>
    ),
  }),
  // columnHelper.display({
  //   id: 'action',
  //   size: 150,
  //   header: 'Action',
  //   cell: ({
  //     row,
  //     table: {
  //       options: { meta },
  //     },
  //   }) => {
  //     const router = useRouter();

  //     return (
  //       <Flex align="center" justify="start" gap="3" className="pe-4">
  //         <EventEdit event={row.original} />
  //         <Tooltip
  //           size="sm"
  //           content={'Download Excel'}
  //           placement="top"
  //           color="invert"
  //         >
  //           <ActionIcon
  //             as="span"
  //             size="sm"
  //             variant="outline"
  //             aria-label={'Edit Product'}
  //             onClick={() => {}}
  //           >
  //             <PiMicrosoftExcelLogo className="h-4 w-4" />
  //           </ActionIcon>
  //         </Tooltip>
  //         <Tooltip
  //           size="sm"
  //           content={'View Vendors'}
  //           placement="top"
  //           color="invert"
  //         >
  //           <ActionIcon
  //             as="span"
  //             size="sm"
  //             variant="outline"
  //             aria-label={'View Vendors'}
  //             onClick={() => router.push('/event-management/vendors')}
  //           >
  //             <PiEyeBold className="h-4 w-4" />
  //           </ActionIcon>
  //         </Tooltip>
  //       </Flex>
  //     );
  //   },
  // }),
];

// const EventEdit = ({ event }: { event: EventDataType }) => {
//   return (
//     <Tooltip size="sm" content={'Edit Event'} placement="top" color="invert">
//       <ActionIcon
//         as="span"
//         size="sm"
//         variant="outline"
//         aria-label={'Edit Product'}
//         onClick={() => {}}
//       >
//         <PencilIcon className="h-4 w-4" />
//       </ActionIcon>
//     </Tooltip>
//   );
// };
