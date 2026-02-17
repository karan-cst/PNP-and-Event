'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { Text, Title } from 'rizzui';
import { PNPJobsDataType } from './table';
import DateCell from '@core/ui/date-cell';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

const columnHelper = createColumnHelper<PNPJobsDataType>();

export const PNPJobListColumns = [
  // JOB ID
  columnHelper.display({
    id: 'id',
    size: 120,
    header: 'JOB ID',
    cell: ({ row }) => <Text className="text-sm">{row.original.id}</Text>,
  }),

  // EVENT NAME
  columnHelper.accessor('eventName', {
    id: 'eventName',
    size: 160,
    header: 'Event Name',
    cell: ({ row }) => (
      <Title as="h5" className="!text-sm font-medium">
        {row.original.eventName}
      </Title>
    ),
  }),

  // CLIENT COORDINATOR
  columnHelper.accessor('clientCoordinator', {
    id: 'clientCoordinator',
    size: 170,
    header: 'Client Coordinator',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.clientCoordinator}</Text>
    ),
  }),

  // STATUS
  columnHelper.accessor('status', {
    id: 'status',
    size: 170,
    header: 'Status',
    cell: ({ row }) => <Text className="text-sm">{row.original.status}</Text>,
  }),

  // CS NAME
  columnHelper.accessor('csName', {
    id: 'csName',
    size: 140,
    header: 'CS Name',
    cell: ({ row }) => <Text className="text-sm">{row.original.csName}</Text>,
  }),

  // VENDOR COST
  columnHelper.accessor('vendorCost', {
    id: 'vendorCost',
    size: 130,
    header: 'Vendor Cost',
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.vendorCost !== null ? `₹${row.original.vendorCost}` : '-'}
      </Text>
    ),
  }),

  // CLIENT COST
  columnHelper.accessor('clientCost', {
    id: 'clientCost',
    size: 130,
    header: 'Client Cost',
    cell: ({ row }) => (
      <Text className="text-sm">
        {row.original.clientCost !== null ? `₹${row.original.clientCost}` : '-'}
      </Text>
    ),
  }),

  // PO STATUS
  columnHelper.accessor('poStatus', {
    id: 'poStatus',
    size: 130,
    header: 'PO Status',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.poStatus ?? '-'}</Text>
    ),
  }),

  // INVOICE STATUS
  columnHelper.accessor('invoiceStatus', {
    id: 'invoiceStatus',
    size: 150,
    header: 'Invoice Status',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.invoiceStatus ?? '-'}</Text>
    ),
  }),

  // PAYMENT STATUS
  columnHelper.accessor('paymentStatus', {
    id: 'paymentStatus',
    size: 150,
    header: 'Payment Status',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.paymentStatus ?? '-'}</Text>
    ),
  }),

  // VENDOR NAME
  columnHelper.accessor('vendorName', {
    id: 'vendorName',
    size: 160,
    header: 'Vendor Name',
    cell: ({ row }) => (
      <Text className="text-sm">{row.original.vendorName ?? '-'}</Text>
    ),
  }),

  // // PHARMA / NON-PHARMA
  // columnHelper.display({
  //   id: 'isPharma',
  //   size: 120,
  //   header: 'Client Type',
  //   cell: ({ row }) =>
  //     getStatusBadge(row.original.isPharma ? 'Pharma' : 'Non-Pharma'),
  // }),

  // ACTIVE STATUS
  columnHelper.display({
    id: 'isActive',
    size: 120,
    header: 'Status',
    cell: ({ row }) =>
      getStatusBadge(row.original.isActive ? 'Active' : 'Inactive'),
  }),

  // CREATED AT
  columnHelper.accessor('createdAt', {
    id: 'createdAt',
    size: 180,
    header: 'Created At',
    cell: ({ row }) => <DateCell date={new Date(row.original.createdAt)} />,
  }),
];
