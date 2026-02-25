'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { Text, Title } from 'rizzui';
import { EventtypesTableDataType } from './table';

const columnHelper = createColumnHelper<EventtypesTableDataType>();

export const EventTypesListColumns = [
  columnHelper.display({
    id: 'Sr',
    size: 50,
    header: 'Sr.',
    cell: ({ row }) => <Text className="text-sm">{row.index + 1}</Text>,
  }),
  columnHelper.accessor('type', {
    id: 'type',
    size: 100,
    header: 'Type',
    cell: ({ row }) => (
      <Title as="h6" className="!text-sm font-medium">
        {row.original.type}
      </Title>
    ),
  }),
  columnHelper.display({
    id: 'finish',
    size: 100,
    header: 'Finished Projects',
    cell: ({ row }) => (
      <Title as="h6" className="!text-sm font-medium">
        {Math.floor(Math.random() * 100)}
      </Title>
    ),
  }),
];
