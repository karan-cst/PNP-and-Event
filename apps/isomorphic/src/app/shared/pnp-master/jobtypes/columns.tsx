'use client';
import { JobType } from '@/data/job-feed-data';

import { createColumnHelper } from '@tanstack/react-table';

import { Text, Title } from 'rizzui';

const columnHelper = createColumnHelper<JobType>();

export const JobTypeListColumns = [
  columnHelper.display({
    id: 'Sr',
    size: 150,
    header: 'Sr.',
    cell: ({ row }) => <Text className="text-sm">{row.index + 1}</Text>,
  }),
  columnHelper.accessor('type', {
    id: 'type',
    size: 200,
    header: 'Type',
    cell: ({ row }) => (
      <Title as="h6" className="!text-sm font-medium">
        {row.original.type}
      </Title>
    ),
  }),
];
