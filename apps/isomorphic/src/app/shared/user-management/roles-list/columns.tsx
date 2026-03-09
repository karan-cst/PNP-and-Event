'use client';
import { ProductType } from '@/data/products-data';

import { createColumnHelper } from '@tanstack/react-table';

import { Text, Title } from 'rizzui';
import { RolesDataType } from './role';

const columnHelper = createColumnHelper<RolesDataType>();

export const RolesListColumns = [
  columnHelper.accessor('name', {
    id: 'name',
    size: 200,
    header: 'Role',
    cell: ({ row }) => (
      <Title as="h6" className="!text-sm font-medium">
        {row.original.name}
      </Title>
    ),
  }),
  columnHelper.display({
    id: 'sku',
    size: 150,
    header: 'Type',
    cell: ({ row }) => <Text className="text-sm">{row.original.type}</Text>,
  }),
  columnHelper.display({
    id: 'number',
    size: 150,
    header: 'Total',
    cell: ({ row }) => (
      <Text className="text-sm">{Math.floor(Math.random() * 10)}</Text>
    ),
  }),
];
