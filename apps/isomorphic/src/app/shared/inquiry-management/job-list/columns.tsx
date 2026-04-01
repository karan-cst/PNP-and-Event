'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Flex, Text, Title, Tooltip } from 'rizzui';
import { InquiryTableType } from '@/data/jobInquiry.data';
import PencilIcon from '@core/components/icons/pencil';
import UploadIcon from '@core/components/shape/upload';
import { useModal } from '../../modal-views/use-modal';
import { PiXBold } from 'react-icons/pi';
import UploadSample from '../upload-sample/uploadSample';

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
    size: 200,
    header: 'Job Details',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Title as="h5" className="!text-sm font-medium">
          {row.original.jobName}
        </Title>
        <Text className="text-sm text-gray-500">{row.original.division}</Text>
      </div>
    ),
  }),

  // 2️⃣ Created Date
  columnHelper.accessor('createdDate', {
    id: 'createdDate',
    size: 120,
    header: 'Created Date',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.createdDate}</Text>
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

  // 5️⃣ Client Name
  columnHelper.accessor('clientName', {
    id: 'clientName',
    size: 150,
    header: 'Client Name',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.clientName}</Text>
    ),
  }),

  // 6️⃣ Budget
  columnHelper.accessor('budget', {
    id: 'budget',
    size: 100,
    header: 'Budget',
    cell: ({ row }) => <Text className="text-sm">₹ {row.original.budget}</Text>,
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

  // 8️⃣ Sample Required
  columnHelper.accessor('sampleRequired', {
    id: 'sampleRequired',
    size: 120,
    header: 'Sample Required',
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.sampleRequired ? 'Yes' : 'No'}
      </Text>
    ),
  }),

  // 9️⃣ Delivery Time
  columnHelper.accessor('deliveryTime', {
    id: 'deliveryTime',
    size: 120,
    header: 'Delivery Time',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.deliveryTime}</Text>
    ),
  }),

  // 🔟 Action (Edit)
  columnHelper.display({
    id: 'action',
    size: 80,
    header: 'Action',
    cell: ({ row }) => (
      <Flex>
        <Tooltip
          size="sm"
          content={'Edit Inquiry'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'Edit Inquiry'}
            onClick={() => {}}
          >
            <PencilIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'Upload Sample'}
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            aria-label={'Upload Sample'}
            onClick={() => {}}
          >
            <UploadIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
  }),
];
