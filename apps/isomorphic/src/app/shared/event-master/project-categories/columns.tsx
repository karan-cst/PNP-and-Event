'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { Text, Title } from 'rizzui';
import { ProjectCategoriesTableDataType } from './table';
import { formatPrice } from '@/config/format-pricing';

const columnHelper = createColumnHelper<ProjectCategoriesTableDataType>();

export const ProjectCategoriesListColumns = [
  columnHelper.display({
    id: 'Sr',
    size: 50,
    header: 'Sr.',
    cell: ({ row }) => <Text className="text-sm">{row.index + 1}</Text>,
  }),
  columnHelper.accessor('category', {
    id: 'category',
    size: 100,
    header: 'Category',
    cell: ({ row }) => (
      <Title as="h6" className="!text-sm font-medium">
        {row.original.category}
      </Title>
    ),
  }),
  columnHelper.accessor('min_range', {
    id: 'min_range',
    size: 150,
    header: 'Min Range',
    cell: ({ row }) => (
      <Text className="text-sm">{formatPrice(row.original.min_range)}</Text>
    ),
  }),
  columnHelper.accessor('max_range', {
    id: 'max_range',
    size: 150,
    header: 'Max Range',
    cell: ({ row }) => (
      <Text className="text-sm"> {formatPrice(row.original.max_range)}</Text>
    ),
  }),
  columnHelper.accessor('vendorSelectionBy', {
    id: 'vendorSelectionBy',
    size: 250,
    header: 'Vendor Selection By',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.vendorSelectionBy.user}</Text>
        <Text className="text-sm">
          {`(${row.original.vendorSelectionBy.description})`}
        </Text>
      </>
    ),
  }),
  columnHelper.accessor('vendorApprovalBy', {
    id: 'vendorApprovalBy',
    size: 250,
    header: 'Vendor Approval By',
    cell: ({ row }) => (
      <>
        <Text className="text-sm">{row.original.vendorApprovalBy.user}</Text>
        <Text className="text-sm">
          {`(${row.original.vendorApprovalBy.description})`}
        </Text>
      </>
    ),
  }),
];
