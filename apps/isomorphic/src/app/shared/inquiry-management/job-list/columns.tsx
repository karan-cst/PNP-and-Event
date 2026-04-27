'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Text, Title, Tooltip } from 'rizzui';
import { InquiryTableType } from '@/data/jobInquiry.data';
import PencilIcon from '@core/components/icons/pencil';
import UploadIcon from '@core/components/shape/upload';
import { useModal } from '../../modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';
import UploadSample from '../upload-sample/uploadSample';
import { FaCheckToSlot } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

const columnHelper = createColumnHelper<InquiryTableType>();

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

export const InquiryListColumns = [
  // 1️⃣ Job Details (Job Name + Division)
  columnHelper.accessor('jobName', {
    id: 'jobDetails',
    size: 180,
    header: 'Job Details',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Title as="h5" className="!text-sm font-medium">
          {row.original.jobName}
        </Title>
        <Text className="text-sm text-gray-500">
          {row.original.division}-{row.original.clientName}
        </Text>
      </div>
    ),
  }),

  // 2️⃣ Created Date
  columnHelper.accessor('createdDate', {
    id: 'createdDate',
    size: 120,
    header: 'Created By',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Text className="text-sm">ABC</Text>
        <Text className="text-xs">{row.original.createdDate}</Text>
      </div>
    ),
  }),

  // 3️⃣ Inquiry Type
  columnHelper.accessor('inquiryType', {
    id: 'inquiryType',
    size: 100,
    header: 'Inquiry Type',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.inquiryType}</Text>
    ),
  }),

  // 4️⃣ Inquiry ID
  columnHelper.accessor('inquiryId', {
    id: 'inquiryId',
    size: 120,
    header: 'Inquiry ID',
    cell: ({ row }) => (
      <Text className="text-sm font-medium">{row.original.inquiryId}</Text>
    ),
  }),
  // 6️⃣ Budget
  columnHelper.accessor('budget', {
    id: 'budget',
    size: 100,
    header: 'Budget / Qty',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Text className="text-sm">₹ {row.original.budget}</Text>
        <Text className="text-sm">Qty: {row.original.qty}</Text>
      </div>
    ),
  }),

  // 7️⃣ Print Manager Status
  columnHelper.display({
    id: 'printManagerStatus',
    size: 180,
    header: 'Print Manager Status',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Text className="text-sm font-medium">
          {row.original.printManagerName}
        </Text>
        <Text className="text-xs text-gray-500">{row.original.status}</Text>
      </div>
    ),
  }),
  // 9️⃣ Delivery Time
  columnHelper.accessor('deliveryTime', {
    id: 'deliveryTime',
    size: 120,
    header: 'Delivery Time',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Text className="text-sm">{row.original.deliveryTime}</Text>
        <Text className="text-sm">{row.original.deliveryLocation}</Text>
      </div>
    ),
  }),
  // 🔟 Action (Edit)
  columnHelper.display({
    id: 'action',
    size: 80,
    header: 'Action',
    cell: ({ row }) => (
      <Flex>
        <EditButton />
        <UploadButton id={row.original.inquiryId} />
        <Tooltip
          size="sm"
          content={'Convert To Job'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'Convert To Job'}
            onClick={() => {}}
          >
            <FaCheckToSlot className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  }),
];

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

const EditButton = () => {
  const router = useRouter();
  return (
    <Tooltip size="sm" content={'Edit Inquiry'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Edit Inquiry'}
        onClick={() => router.push('/inquiry-management/create-inquiry')}
      >
        <PencilIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};
