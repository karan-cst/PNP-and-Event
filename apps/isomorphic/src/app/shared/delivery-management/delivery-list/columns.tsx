'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Text, Title, Tooltip } from 'rizzui';
import { DeliveryDataType } from './table';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import { useRouter } from 'next/navigation';
import { AiOutlineExport } from 'react-icons/ai';

const columnHelper = createColumnHelper<DeliveryDataType>();

export const DeliveryListColumns = (role?: string) => {
  const router = useRouter();
  return [
    columnHelper.accessor('jobName', {
      id: 'jobName',
      size: 170,
      header: 'Job',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title
            as="h5"
            className="flex cursor-pointer items-center gap-1 !text-sm font-medium hover:underline"
            onClick={() => router.push(`/event-management/event-detailes`)}
          >
            {`${row.original.jobName}`}
            <span>
              <AiOutlineExport />
            </span>
          </Title>
          <Text className="text-sm">{row.original.jobId}</Text>
        </div>
      ),
    }),
    columnHelper.accessor('createdAt', {
      id: 'createdAt',
      size: 100,
      header: 'Date',
      cell: ({ row }) => (
        <Text className="text-sm">{row.original.createdAt}</Text>
      ),
    }),
    columnHelper.display({
      id: 'sapCode',
      size: 120,
      header: 'SAP Code',
      cell: ({ row }) => (
        <Text className="text-sm">{row.original.sapCode.join(', ')}</Text>
      ),
    }),
    columnHelper.accessor('description', {
      id: 'description',
      size: 150,
      header: 'Description',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">
            {`${row.original?.description ? row.original?.description : '-'}`}
          </Text>
        </div>
      ),
    }),
    columnHelper.accessor('division', {
      id: 'division',
      size: 100,
      header: 'Division',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">
            {`${row.original?.division?.name ? row.original?.division?.name : '-'}`}
          </Text>
        </div>
      ),
    }),
    columnHelper.accessor('printer', {
      id: 'printer',
      size: 150,
      header: 'Printer Name',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">{`${row.original?.printer ? row.original?.printer : '-'}`}</Text>
        </div>
      ),
    }),
    columnHelper.accessor('qty', {
      id: 'qty',
      size: 100,
      header: 'Quantity',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm font-semibold">{`${row.original?.qty ? row.original?.qty : '-'}`}</Text>
          <Text className="text-sm">{`${row.original?.packing ? row.original?.packing : '-'}`}</Text>
        </div>
      ),
    }),
    // columnHelper.display({
    //   id: 'packing',
    //   size: 100,
    //   header: 'Packing',
    //   cell: ({ row }) => (

    //   ),
    // }),
    columnHelper.display({
      id: 'deliveryLocation',
      size: 150,
      header: 'Delivery Location',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm font-semibold">{`${row.original?.deliveryLocation ? row.original?.deliveryLocation : '-'}`}</Text>
          <Text className="text-sm">{`${row.original?.deliveryDate ? row.original?.deliveryDate : '-'}`}</Text>
        </div>
      ),
    }),
    // columnHelper.display({
    //   id: 'deliveryDate',
    //   size: 150,
    //   header: 'Delivery Date',
    //   cell: ({ row }) => (

    //   ),
    // }),
    columnHelper.display({
      id: 'status',
      size: 150,
      header: 'Status',
      cell: ({ row }) => (
        <Text className="text-sm">{`${row.original?.status ? row.original?.status : '-'}`}</Text>
      ),
    }),
    columnHelper.display({
      id: 'studioRemarks',
      size: 150,
      header: 'Studio Remarks',
      cell: ({ row }) => (
        <Text className="text-sm">{`${row.original?.studioRemarks ? row.original?.studioRemarks : '-'}`}</Text>
      ),
    }),
    columnHelper.display({
      id: 'printerDate',
      size: 150,
      header: 'Printer Date',
      cell: ({ row }) => (
        <Text className="text-sm">{`${row.original?.printerDate ? row.original?.printerDate : '-'}`}</Text>
      ),
    }),
    columnHelper.display({
      id: 'action',
      size: 150,
      header: 'Action',
      cell: ({
        row,
        // table: {
        //   options: { meta },
        // },
      }) => <DeliveryEdit delivery={row.original} />,
    }),
  ];
};

const DeliveryEdit = ({ delivery }: { delivery: DeliveryDataType }) => {
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

// const Action = ({ event, role }: { event: EventDataType; role?: string }) => {
//   const router = useRouter();
//   const [isApprove, setIsApprove] = useState<string>('karan');
//   const { openModal, closeModal } = useModal();

//   const handleOpen = () => {
//     openModal({
//       view: (
//         <div className="m-auto px-5 pb-8 pt-5">
//           <div className="mb-5 flex items-center justify-between">
//             <Title as="h4" className="font-semibold">
//               Assign New User
//             </Title>

//             <ActionIcon size="sm" variant="text" onClick={closeModal}>
//               <PiXBold className="h-auto w-5" />
//             </ActionIcon>
//           </div>
//           <div className="space-y-4">
//             <Select
//               label="Reassign User"
//               inPortal={false}
//               labelClassName="text-sm font-medium text-gray-900"
//               dropdownClassName="h-auto"
//               placeholder="Approve or Reject"
//               options={[
//                 { label: 'Karan', value: 'karan' },
//                 { label: 'Amulakh', value: 'Amulakh' },
//               ]}
//               value={isApprove}
//               onChange={(e: string) => setIsApprove(e)}
//               getOptionValue={(option) => option.value}
//               displayValue={(selected) =>
//                 [
//                   { label: 'Karan', value: 'karan' },
//                   { label: 'Amulakh', value: 'Amulakh' },
//                 ].find((r) => r.value === selected)?.label ?? ''
//               }
//             />
//           </div>
//           <div className="mt-6 flex justify-end">
//             <Button onClick={() => {}}>Submit</Button>
//           </div>
//         </div>
//       ),
//       customSize: 500,
//     });
//   };
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
//       {role == 'operationHead' && (
//         <Tooltip
//           size="sm"
//           content={'Reassign user'}
//           placement="top"
//           color="invert"
//         >
//           <ActionIcon
//             as="span"
//             size="sm"
//             variant="outline"
//             aria-label={'Reassign user'}
//             onClick={handleOpen}
//           >
//             <PiUserSwitchDuotone className="h-4 w-4" />
//           </ActionIcon>
//         </Tooltip>
//       )}
//     </Flex>
//   );
// };
