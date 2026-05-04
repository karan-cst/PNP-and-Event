'use client';
import { createColumnHelper } from '@tanstack/react-table';
import {
  ActionIcon,
  Button,
  Flex,
  Input,
  Select,
  Text,
  Title,
  Tooltip,
} from 'rizzui';
import { EventDataType } from './table';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiMicrosoftExcelLogo,
  PiUserSwitchDuotone,
  PiXBold,
} from 'react-icons/pi';
import { useModal } from '../../modal-views/use-modal';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/config/format-pricing';
import { useState } from 'react';
import { AiOutlineExport } from 'react-icons/ai';
import dayjs from 'dayjs';
import { FiCheck } from 'react-icons/fi';
import ClientUploadModal from '../client-upload/ClientUploadModal';
import { VendorPriceCompairView } from '../vendor-price-compair-view/vendorPriceCompair';
import { VendorViewModalView } from '../vendor-view/vendorViewModal';
import RateNegotiationModal from '../RateNegotiationModal';
import { RiUserFollowFill } from 'react-icons/ri';
import { TbMoneybag } from 'react-icons/tb';
import { useSession } from 'next-auth/react';
import UploadIcon from '@core/components/shape/upload';
import UploadSample from './upload-sample/uploadSample';

const columnHelper = createColumnHelper<EventDataType>();

const allowApprove = ['operationHead', 'eventHead', 'eventUser'];
const allowEdit = ['operationHead', 'eventHead', 'eventUser'];
const allowClientUpdate = ['operationHead', 'eventHead', 'eventUser'];

export const EventListColumns = (expanded: boolean = true) => {
  const { openModal, closeModal } = useModal();
  const handleOpenPriceModal = () => {
    openModal({
      view: <VendorPriceCompairView onClose={() => closeModal()} />,
      customSize: 900,
    });
  };
  const session = useSession();
  const role = session?.data?.user?.role;
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
      size: 240,
      header: 'Event Details',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title
            as="h5"
            className={`flex cursor-pointer items-center gap-1 !text-sm font-medium hover:underline ${row.original.isRejected ? 'text-red-500' : 'text-blue-600'}`}
            onClick={() => router.push(`/event-management/event-detailes`)}
          >
            {`${row.original.eventName}`}
            <span>
              <AiOutlineExport />
            </span>
          </Title>
          <Text className="text-sm">{`${row.original.isPharma ? row.original?.divisionName : row.original.clientName} - ${row.original.eventType} - ${row.original.eventId}`}</Text>
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
      size: 130,
      header: 'Elements / Std Cost',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title
            as="h5"
            className="flex cursor-pointer items-center gap-1 !text-sm font-medium hover:underline"
            onClick={() => handleOpenPriceModal()}
          >
            {`${row.original.elements}`}
            <span>
              <AiOutlineExport />
            </span>
          </Title>
          <Text className="text-sm">{formatPrice(row.original.stdTotal)}/</Text>
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
          <Text
            className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
            onClick={() => {
              openModal({
                view: <VendorViewModalView />,
                customSize: 900,
              });
            }}
          >
            {formatPrice(row.original.vendor1Total)}
            <span>
              <AiOutlineExport />
            </span>
          </Text>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'firstLevelStatus',
      size: 160,
      header: '1st Level Status',
      cell: ({ row }) => (
        <ShowComment history={row.original?.firstLevelHistory || []} />
      ),
    }),
    columnHelper.display({
      id: 'secondLevelStatus',
      size: 160,
      header: '2nd Level Status',
      cell: ({ row }) => (
        <ShowComment history={row.original?.secondLevelHistory || []} />
      ),
    }),
    columnHelper.display({
      id: 'rateNegotiate',
      size: 50,
      header: 'Negotiation / Approval',
      cell: ({ row }) => (
        <Flex align="center" justify="start" gap="3" className="pe-4">
          {role && allowApprove.includes(role) && (
            <>
              <Ratenegotiate />
              <Approve data={row.original} role={role} />
            </>
          )}
        </Flex>
      ),
    }),
    // columnHelper.display({
    //   id: 'action',
    //   size: 150,
    //   header: 'Action',
    //   cell: ({ row }) => (
    //     <Flex align="center" gap="3">
    //       <Action data={row.original} role={role} />
    //     </Flex>
    //   ),
    // }),
    // columnHelper.accessor('clientRate', {
    //   id: 'clientRate',
    //   size: 120,
    //   header: 'Client Rate',
    //   cell: ({ row }) => (
    //     <div className={cn('grid gap-1')}>
    //       <Text className="text-sm">
    //         {formatPrice(row.original.clientRate)}/
    //       </Text>
    //     </div>
    //   ),
    // }),
    // columnHelper.display({
    //   id: 'priority',
    //   size: 100,
    //   header: 'Priority',
    //   cell: ({ row }) => getStatusBadge(row.original.priority),
    // }),
    // columnHelper.display({
    //   id: 'status',
    //   size: 100,
    //   header: 'Status',
    //   cell: ({ row }) => row.original.status,
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
      {role && allowEdit.includes(role) && <EventEdit event={event} />}
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
      {role && allowEdit.includes(role) && (
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
            <RiUserFollowFill className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      )}
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
      <UploadButton id={'event.id'} />
    </Flex>
  );
};

const Ratenegotiate = () => {
  const { openModal } = useModal();

  return (
    <Flex align="center" gap="3">
      <Tooltip
        size="sm"
        content={'Rate Negotiation'}
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          onClick={() =>
            openModal({
              view: <RateNegotiationModal />,
              customSize: 900,
            })
          }
        >
          <TbMoneybag className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

export type ApprovalHistory = {
  userName: string;
  status: string;
  comment: string;
  date?: string;
};
// export const ShowPrice = ({
//   EventApproveData,
// }: {
//   EventApproveData: EventApproveDataType;
// }) => {
//   const { openModal } = useModal();
//   return (
//     <Tooltip size="sm" content={'View Prices'} placement="top" color="invert">
//       <Text
//         className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
//         onClick={() => {
//           openModal({
//             view: <VendorViewModalView />,
//             customSize: 900,
//           });
//         }}
//       >
//         {formatPrice(EventApproveData?.venodrCost)}
//         <span>
//           <AiOutlineExport />
//         </span>
//       </Text>
//     </Tooltip>
//   );
// };

export const ShowComment = ({
  history = [],
}: {
  history: ApprovalHistory[];
}) => {
  const { openModal, closeModal } = useModal();

  const handleOpen = () => {
    openModal({
      view: (
        <div className="m-auto px-5 pb-8 pt-5">
          <div className="mb-5 flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Approval History
            </Title>

            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>
          {/* <Text className="text-sm leading-relaxed text-gray-700">
            {comment || 'No comment provided.'}
          </Text> */}
          {history.length === 0 ? (
            <Text className="text-sm text-gray-600">No history available</Text>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <div className="flex justify-between">
                    <Text className="font-semibold">{item.userName}</Text>

                    <Text
                      className={cn(
                        'text-sm font-medium',
                        item.status === 'approve'
                          ? 'text-green-600'
                          : 'text-red-600'
                      )}
                    >
                      {item.status}
                    </Text>
                  </div>

                  <Text className="mt-1 text-sm text-gray-700">
                    {item.comment || 'No comment'}
                  </Text>

                  {item.date && (
                    <Text className="mt-1 text-xs text-gray-400">
                      {item.date}
                    </Text>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      customSize: 500,
    });
  };
  const lastHistory = history[history.length - 1];
  return (
    <div className={cn('grid gap-1')}>
      {lastHistory?.status.length > 0 ? (
        <Tooltip
          size="sm"
          content="View History"
          placement="top"
          color="invert"
        >
          <Text
            className={`flex cursor-pointer items-center gap-1 text-sm font-semibold ${lastHistory?.status === 'approve' ? 'text-blue-600' : 'text-red-600'} hover:underline`}
            onClick={handleOpen}
          >
            {lastHistory?.status}
            <AiOutlineExport />
          </Text>
        </Tooltip>
      ) : null}
      <Text className="text-sm text-gray-600">{lastHistory?.userName}</Text>
    </div>
  );
};

export const Approve = ({
  data,
  role,
}: {
  data: EventDataType;
  role?: string;
}) => {
  const { openModal, closeModal } = useModal();

  const [isApprove, setIsApprove] = useState<string>('approve');
  const [comment, setComment] = useState<string>('');

  const handleOpen = () => {
    const approveOptions = [
      { label: 'Approve', value: 'approve' },
      { label: 'Reject', value: 'reject' },
    ];

    openModal({
      view: (
        <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
          <div className="mb-5 flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Comment
            </Title>
            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>

          <div className="space-y-4">
            <Select
              label="Approve or Reject"
              inPortal={false}
              labelClassName="text-sm font-medium text-gray-900"
              dropdownClassName="h-auto"
              placeholder="Approve or Reject"
              options={approveOptions}
              value={isApprove}
              onChange={(e: string) => setIsApprove(e)}
              getOptionValue={(option) => option.value}
              displayValue={(selected) =>
                approveOptions.find((r) => r.value === selected)?.label ?? ''
              }
            />
            <Input
              label="Your Comments"
              placeholder="Comments...."
              className="col-span-full"
              onChange={(e) => setComment(e.target.value)}
              // {...register('location.addressLine1')}
              // error={errors?.location?.addressLine1?.message}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <Button onClick={() => {}}>Submit</Button>
          </div>
        </div>
      ),
      customSize: 500,
    });
  };

  const firstHistory = data?.firstLevelHistory || [];
  const secondHistory = data?.secondLevelHistory || [];

  const lastFirst = firstHistory[firstHistory.length - 1];
  const lastSecond = secondHistory[secondHistory.length - 1];
  const notAllowedRole = role !== 'operationHead' && role !== 'eventHead';
  const operationDisabled =
    role === 'operationHead' && lastFirst?.status === 'approve';
  console.log(role === 'operationHead', lastFirst?.status === 'approve');
  const headDisabled =
    role === 'eventHead' &&
    (lastFirst?.status !== 'approve' || lastSecond?.status === 'approve');
  const disabled = notAllowedRole || operationDisabled || headDisabled;
  return (
    <div className={cn('grid gap-1')}>
      <Tooltip
        size="sm"
        content="Approve or Reject"
        placement="top"
        color="invert"
      >
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Download PO'}
          onClick={() => (disabled ? null : handleOpen())}
          disabled={disabled}
        >
          <FiCheck className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};

const UploadButton = ({ id }: { id: string }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Upload Sample'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Upload Sample'}
        onClick={() =>
          openModal({
            view: <UploadSampleModalView id={id} />,
            customSize: 720,
          })
        }
      >
        <UploadIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export function UploadSampleModalView({ id }: { id: string }) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add Sample Files
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <UploadSample isModalView={false} id={id} />
    </div>
  );
}
