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
  PiXBold,
  PiXLogoDuotone,
} from 'react-icons/pi';
import { formatPrice } from '@/config/format-pricing';
import { useModal } from '../modal-views/use-modal';

const columnHelper = createColumnHelper<PODataType>();

export const getPOColumns = (role?: string) => [
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
      <ShowComment history={row.original?.firstLevelHistory} />
      // <div className={cn('grid gap-1')}>
      //   <Tooltip
      //     size="sm"
      //     content={'View Comment'}
      //     placement="top"
      //     color="invert"
      //   >
      //     <Text className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
      //       {row.original?.firstLevelStatus}{' '}
      //       <span>
      //         <AiOutlineExport />
      //       </span>
      //     </Text>
      //   </Tooltip>
      //   <Text className="text-sm">{row.original?.firstLevelBy}</Text>
      // </div>
    ),
  }),
  columnHelper.accessor('secondLevelStatus', {
    id: 'secondLevelStatus',
    size: 150,
    header: '2nd Level Status (FH)',
    cell: ({ row }) => (
      <ShowComment history={row.original?.secondLevelHistory} />
      // <div className={cn('grid gap-1')}>
      //   {row.original?.secondLevelStatus && (
      //     <Tooltip
      //       size="sm"
      //       content={'View Comment'}
      //       placement="top"
      //       color="invert"
      //     >
      //       <Text className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline">
      //         {row.original?.secondLevelStatus}
      //         <span>
      //           <AiOutlineExport />
      //         </span>
      //       </Text>
      //     </Tooltip>
      //   )}
      //   <Text className="text-sm">{row.original?.secondLevelBy}</Text>
      // </div>
    ),
  }),
  columnHelper.accessor('poStatus', {
    id: 'poStatus',
    size: 150,
    header: 'PO',
    cell: ({ row }) => (
      <Flex align="center" justify="start" gap="3" className="pe-4">
        <Tooltip
          size="sm"
          content={'Download PO'}
          placement="top"
          color="invert"
        >
          <PiDownloadDuotone className="h-6 w-6" />
        </Tooltip>
        <Tooltip size="sm" content={'Upload PO'} placement="top" color="invert">
          <PiUploadDuotone className="h-6 w-6" />
        </Tooltip>
      </Flex>
    ),
  }),
  ...(role !== 'financeManager' && role !== 'financeHead'
    ? []
    : [
        columnHelper.display({
          id: 'action',
          size: 150,
          header: 'Action',
          cell: ({ row }) => (
            <Flex align="center" justify="start" gap="3" className="pe-4">
              <Tooltip
                size="sm"
                content={'Approve Po'}
                placement="top"
                color="invert"
              >
                <PiCheckFatDuotone className="h-6 w-6" />
              </Tooltip>

              <Tooltip
                size="sm"
                content={'Reject Po'}
                placement="top"
                color="invert"
              >
                <PiXLogoDuotone className="h-6 w-6" />
              </Tooltip>
            </Flex>
          ),
        }),
      ]),
];

export type ApprovalHistory = {
  userName: string;
  status: string;
  comment: string;
  date?: string;
};

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

  return (
    <div className={cn('grid gap-1')}>
      {history.length > 0 ? (
        <>
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
              {history[history.length - 1].status}
              <AiOutlineExport />
            </Text>
          </Tooltip>
          <Text className="text-sm text-gray-600">
            {history[history.length - 1].userName}
          </Text>
        </>
      ) : null}
    </div>
  );
};
