'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, FileInput, Text, Title, Tooltip } from 'rizzui';
import { EventTrackerDataType } from './table';
import cn from '@core/utils/class-names';
import { AiOutlineCloudDownload, AiOutlineExport } from 'react-icons/ai';
import { formatPrice } from '@/config/format-pricing';
import { useModal } from '../../modal-views/use-modal';
import { VendorViewModalView } from '../vendor-view/vendorViewModal';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import { PiXBold } from 'react-icons/pi';

const columnHelper = createColumnHelper<EventTrackerDataType>();

export const EventTrackerListColumns = () => {
  const router = useRouter();
  return [
    columnHelper.accessor('company', {
      id: 'company',
      size: 240,
      header: 'Company',
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
          <Text className="text-sm">{`${row.original.isPharma == 'pharma' ? row.original?.division : row.original.company} - ${row.original.eventType}`}</Text>
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
    columnHelper.accessor('clientCost', {
      id: 'clientCost',
      size: 150,
      header: 'Client Cost',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          {row.original?.clientCost ? (
            <Tooltip
              size="sm"
              content={'Download'}
              placement="top"
              color="invert"
            >
              <Text
                className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                onClick={() => {}}
              >
                {formatPrice(row?.original?.clientCost)}
                <span>
                  <AiOutlineCloudDownload />
                </span>
              </Text>
            </Tooltip>
          ) : (
            '-'
          )}
          <Text className="text-sm">
            {row.original?.clientCost
              ? `+10% (${row.original.clientCost * 0.1})`
              : null}
          </Text>
        </div>
      ),
    }),
    columnHelper.accessor('clientBilling', {
      id: 'clientBilling',
      size: 150,
      header: 'Billing',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Text className="text-sm">
            {row.original?.clientBilling
              ? formatPrice(row.original?.clientBilling)
              : '-'}
          </Text>
          <Title as="h5" className="!text-sm font-medium">
            {row.original?.totalMargin
              ? `${row.original?.totalMargin}% (${row.original?.clientBilling - row.original.venodrCost}) `
              : '-'}
          </Title>
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
          {row.original?.venodrCost ? (
            <ShowPrice EventTrackerData={row.original} />
          ) : (
            '-'
          )}
        </div>
      ),
    }),
    // columnHelper.accessor('margin', {
    //   id: 'margin',
    //   size: 150,
    //   header: 'Client Margin',
    //   cell: ({ row }) => (
    //     <div className={cn('grid gap-1')}>
    //       <Text className="text-sm">
    //         {row.original?.venodrCost
    //           ? formatPrice(row.original?.clientCost - row.original?.venodrCost)
    //           : '-'}
    //       </Text>
    //       <Title as="h5" className="!text-sm font-medium">
    //         {row.original?.margin ? `${row.original?.margin} %` : '-'}
    //       </Title>
    //     </div>
    //   ),
    // }),

    columnHelper.display({
      id: 'poStatus',
      size: 120,
      header: 'PO Status',
      cell: ({ row }) => (
        // <Text className="text-sm">
        //   {row.original?.poStatus ? row.original?.poStatus : '-'}
        // </Text>
        <div className={cn('grid gap-1')}>
          {row.original?.poStatus ? (
            <div className={cn('grid gap-1')}>
              <Tooltip
                size="sm"
                content={'Download PO'}
                placement="top"
                color="invert"
              >
                <Text
                  className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                  onClick={() => {}}
                >
                  {row?.original?.poStatus}
                  <span>
                    <AiOutlineCloudDownload />
                  </span>
                </Text>
              </Tooltip>
              {row?.original?.poStatus == 'Done' && (
                <Text className="text-xs">Rajat Sharma, 22/03/2026 13:10</Text>
              )}
            </div>
          ) : (
            '-'
          )}
        </div>
      ),
    }),
    columnHelper.display({
      id: 'invoiceStatus',
      size: 120,
      header: 'Invoice Status',
      cell: ({ row }) => <UploadButton job={row.original} />,
    }),
    columnHelper.display({
      id: 'paymentStatus',
      size: 120,
      header: 'Payment Status',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          {row.original?.paymentStatus ? (
            <Tooltip
              size="sm"
              content={'Download Payment Receipt'}
              placement="top"
              color="invert"
            >
              <Text
                className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
                onClick={() => {}}
              >
                {row?.original?.paymentStatus}
                <span>
                  <AiOutlineCloudDownload />
                </span>
              </Text>
            </Tooltip>
          ) : (
            '-'
          )}
        </div>
      ),
    }),
  ];
};

export const ShowPrice = ({
  EventTrackerData,
}: {
  EventTrackerData: EventTrackerDataType;
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
        {formatPrice(EventTrackerData?.venodrCost)}
        <span>
          <AiOutlineExport />
        </span>
      </Text>
    </Tooltip>
  );
};

const UploadButton = ({ job }: { job: EventTrackerDataType }) => {
  const { openModal } = useModal();
  return (
    <div className={cn('grid gap-1')}>
      {job.invoiceStatus ? (
        <div className={cn('grid gap-1')}>
          <Tooltip
            size="sm"
            content={`${job.invoiceStatus == 'Awaiting' ? 'Upload' : 'Download'} - Invoice`}
            placement="top"
            color="invert"
          >
            <Text
              className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
              onClick={() =>
                openModal({
                  view: <UploadSampleModalView />,
                  customSize: 720,
                })
              }
            >
              {job.invoiceStatus}
              <span>
                <AiOutlineCloudDownload />
              </span>
            </Text>
          </Tooltip>
          {job.invoiceStatus == 'Done' && (
            <Text className="text-xs">Mayur Patel, 23/03/2026 13:10</Text>
          )}
        </div>
      ) : (
        '-'
      )}
    </div>
  );
};

export function UploadSampleModalView() {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Upload Invoice
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <FileInput
        label="Upload Invoice File"
        accept=".jpg,.jpeg,.png,.pdf"
        onChange={(e) => {
          const selectedFiles = e?.target?.files;
        }}
      />
    </div>
  );
}
