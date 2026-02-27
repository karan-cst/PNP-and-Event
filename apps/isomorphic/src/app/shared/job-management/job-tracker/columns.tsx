'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { Text, Title } from 'rizzui';
import { formatPrice } from '@/config/format-pricing';
import { JobTrackerTableType } from '@/data/jobpnp-data';
import Link from 'next/link';

const columnHelper = createColumnHelper<JobTrackerTableType>();

export const JobTrackerListColumns = [
  // 1️⃣ Job Details (Job Name + Division)
  columnHelper.accessor('jobName', {
    id: 'jobDetails',
    size: 220,
    header: 'Job Details',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Link href={`/job-management/job-view`} className="group inline-block">
          <Title
            as="h5"
            className="cursor-pointer !text-sm font-medium text-blue-600 transition group-hover:underline"
          >
            {row.original.jobName}
          </Title>
        </Link>

        <Text className="text-sm text-gray-500">{row.original.division}</Text>
      </div>
    ),
  }), // columnHelper.accessor('jobName', {
  //   id: 'jobDetails',
  //   size: 220,
  //   header: 'Job Details',
  //   cell: ({ row }) => (
  //     <div className="grid gap-1">
  //       <Title as="h5" className="!text-sm font-medium">
  //         {row.original.jobName}
  //       </Title>
  //       <Text className="text-sm text-gray-500">{row.original.division}</Text>
  //     </div>
  //   ),
  // }),

  // 2️⃣ Created Date
  columnHelper.accessor('createdDate', {
    id: 'createdDate',
    size: 130,
    header: 'Created Date',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.createdDate}</Text>
    ),
  }),

  // 3️⃣ Operation Head (Name + Status + Date)
  columnHelper.accessor('operationHead', {
    id: 'operationHead',
    size: 220,
    header: 'Operation Head',
    cell: ({ row }) => {
      const stage = row.original.operationHead;
      return (
        <div className="grid gap-1">
          <Text className="text-sm font-medium">{stage.userName}</Text>
          <Text className="text-xs">
            {stage.status}
            {stage.date ? ` • ${stage.date}` : ''}
          </Text>
        </div>
      );
    },
  }),

  // 4️⃣ Design Cost + Business Head
  columnHelper.accessor('designCost', {
    id: 'designCost',
    size: 200,
    header: 'Design Cost + Business Head',
    cell: ({ row }) => (
      <div className="grid gap-1">
        <Text className="text-sm font-medium">
          {formatPrice(row.original.designCost)}
        </Text>
        <Text className="text-xs text-gray-500">
          {row.original.businessHeadName}
        </Text>
      </div>
    ),
  }),

  // 5️⃣ Print Executive (Name + Status + Date)
  columnHelper.accessor('printExecutive', {
    id: 'printExecutive',
    size: 220,
    header: 'Print Executive',
    cell: ({ row }) => {
      const stage = row.original.printExecutive;
      return (
        <div className="grid gap-1">
          <Text className="text-sm font-medium">{stage.userName}</Text>
          <Text className="text-xs">
            {stage.status}
            {stage.date ? ` • ${stage.date}` : ''}
          </Text>
        </div>
      );
    },
  }),

  // 6️⃣ Print Manager + Vendor Selection
  columnHelper.accessor('printManager', {
    id: 'printManager',
    size: 220,
    header: 'Print Manager',
    cell: ({ row }) => {
      const manager = row.original.printManager;
      return (
        <div className="grid gap-1">
          <Text className="text-sm font-medium">{manager.managerName}</Text>
          <Text className="text-xs">{manager.vendorSelectionStatus}</Text>
        </div>
      );
    },
  }),

  // 7️⃣ Finalized Vendor
  columnHelper.accessor('finalizedVendorName', {
    id: 'finalizedVendorName',
    size: 180,
    header: 'Finalized Vendor',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.finalizedVendorName || '-'}</Text>
    ),
  }),
];
