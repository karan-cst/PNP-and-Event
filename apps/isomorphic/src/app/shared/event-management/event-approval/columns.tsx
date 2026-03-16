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
import { EventApproveDataType } from './table';
import cn from '@core/utils/class-names';
import {
  PiCheckFatDuotone,
  PiDownloadDuotone,
  PiEyeBold,
  PiXBold,
} from 'react-icons/pi';
import { AiOutlineExport } from 'react-icons/ai';
import { formatPrice } from '@/config/format-pricing';
import { VendorViewModalView } from '../vendor-view/vendorViewModal';
import { useModal } from '../../modal-views/use-modal';
import { useState } from 'react';
import PencilIcon from '@core/components/icons/pencil';
import RateNegotiationModal from '../RateNegotiationModal';

const columnHelper = createColumnHelper<EventApproveDataType>();

export const EventApproveListColumns = (role?: string) => [
  columnHelper.accessor('company', {
    id: 'company',
    size: 150,
    header: 'Company',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.company}`}
        </Title>
        <Text className="text-sm">{row.original?.division}</Text>
        {/* <Text className="text-sm">{`${row.original.isPharma ? row.original?.divisionName : row.original.clientName} - ${row.original.eventType}`}</Text> */}
      </div>
    ),
  }),
  columnHelper.accessor('eventName', {
    id: 'eventName',
    size: 150,
    header: 'Event Name',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Title as="h5" className="!text-sm font-medium">
          {`${row.original.eventName}`}
        </Title>
        <Text className="text-sm">{row.original?.client}</Text>
        {/* <Text className="text-sm">{`${row.original.isPharma ? row.original?.divisionName : row.original.clientName} - ${row.original.eventType}`}</Text> */}
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
  columnHelper.accessor('vendorName', {
    id: 'vendorName',
    size: 150,
    header: 'Venodr Name',
    cell: ({ row }) => (
      <div className={cn('grid gap-1')}>
        <Text className="text-sm">{row.original?.vendorName}</Text>
      </div>
    ),
  }),
  columnHelper.accessor('venodrCost', {
    id: 'venodrCost',
    size: 150,
    header: 'Venodr Cost',
    cell: ({ row }) => (
      <ShowPrice EventApproveData={row.original} />
      // <div className={cn('grid gap-1')}>
      //   <Text className="text-sm">{formatPrice(row.original?.venodrCost)}</Text>
      // </div>
    ),
  }),
  columnHelper.display({
    id: 'firstLevelStatus',
    size: 150,
    header: '1st Level Status',
    cell: ({ row }) => (
      <ShowComment
        status={row.original?.firstLevelStatus}
        history={row.original?.firstLevelHistory || []}
        by={row.original?.firstLevelBy}
        comment={row.original?.firstLevelComment}
      />
    ),
  }),
  columnHelper.display({
    id: 'secondLevelStatus',
    size: 150,
    header: '2nd Level Status',
    cell: ({ row }) => (
      <ShowComment
        status={row.original?.secondLevelStatus}
        by={row.original?.secondLevelBy}
        comment={row.original?.secondLevelComment}
        history={[]}
      />
    ),
  }),
  columnHelper.display({
    id: 'rateNegotiate',
    size: 150,
    header: 'Negotiation',
    cell: () => {
      <Ratenegotiate />;
    },
  }),
  columnHelper.display({
    id: 'action',
    size: 150,
    header: 'Action',
    cell: ({ row }) => (
      <Flex align="center" gap="3">
        <Action data={row.original} role={role} />
      </Flex>
    ),
  }),
];

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
          <PencilIcon className="h-4 w-4" />
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
export const ShowPrice = ({
  EventApproveData,
}: {
  EventApproveData: EventApproveDataType;
}) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'View Prices'} placement="top" color="invert">
      <Text
        className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
        onClick={() => {
          openModal({
            view: <VendorViewModalView />,
            customSize: 900,
          });
        }}
      >
        {formatPrice(EventApproveData?.venodrCost)}
        <span>
          <AiOutlineExport />
        </span>
      </Text>
    </Tooltip>
  );
};

export const ShowComment = ({
  status,
  history = [],
  comment,
  by,
}: {
  status: string;
  history: ApprovalHistory[];
  comment: string;
  by: string;
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

  return (
    <div className={cn('grid gap-1')}>
      {status.length > 0 ? (
        <Tooltip
          size="sm"
          content="View History"
          placement="top"
          color="invert"
        >
          <Text
            className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
            onClick={handleOpen}
          >
            {status}
            <AiOutlineExport />
          </Text>
        </Tooltip>
      ) : null}
      <Text className="text-sm text-gray-600">{by}</Text>
    </div>
  );
};

export const Action = ({
  data,
  role,
}: {
  data: EventApproveDataType;
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
  const operationDisabled =
    role === 'operationHead' && lastFirst?.status === 'approve';
  console.log(role === 'operationHead', lastFirst?.status === 'approve');
  const headDisabled =
    role === 'eventHead' &&
    (lastFirst?.status !== 'approve' || lastSecond?.status === 'approve');
  const disabled = operationDisabled || headDisabled;
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
          onClick={() => {}}
          disabled={disabled}
        >
          <PiCheckFatDuotone className="h-6 w-6" onClick={handleOpen} />
        </ActionIcon>
      </Tooltip>
    </div>
  );
};
