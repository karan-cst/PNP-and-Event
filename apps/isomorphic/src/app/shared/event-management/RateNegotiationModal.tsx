'use client';

import { useState } from 'react';
import { ActionIcon, Button, Input, Text, Title } from 'rizzui';
import { PiXBold } from 'react-icons/pi';
import { createColumnHelper } from '@tanstack/react-table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import Table from '@core/components/table';
import { useModal } from '../modal-views/use-modal';

type NegotiationRow = {
  id: string;
  sr: number;
  elementName: string;
  qty: number;
  vendorRate: number;
  negotiatedRate: number;
  total: number;
  stdRate: number;
  stdTotal: number;
};

export default function RateNegotiationModal() {
  const { closeModal } = useModal();

  const [rowInputs, setRowInputs] = useState<Record<string, number>>({});

  const data: NegotiationRow[] = [
    {
      id: '1',
      sr: 1,
      elementName: 'Chair',
      qty: 100,
      vendorRate: 100,
      negotiatedRate: 97.5,
      total: 9500,
      stdRate: 95,
      stdTotal: 9500,
    },
    {
      id: '2',
      sr: 2,
      elementName: 'Chair',
      qty: 100,
      vendorRate: 100,
      negotiatedRate: 95,
      total: 9500,
      stdRate: 95,
      stdTotal: 9500,
    },
  ];

  const handleInputField = (value: number, rowId: string) => {
    setRowInputs((prev) => ({
      ...prev,
      [rowId]: value,
    }));
  };

  const columnHelper = createColumnHelper<NegotiationRow>();

  const columns = [
    columnHelper.accessor('sr', {
      header: 'Sr',
    }),

    columnHelper.accessor('elementName', {
      header: 'Element Name',
    }),

    columnHelper.accessor('qty', {
      header: 'Qty',
    }),

    columnHelper.accessor('vendorRate', {
      header: 'Vendor Rate',
      cell: ({ row }) => <Text>{row.original.vendorRate}</Text>,
    }),

    columnHelper.accessor('negotiatedRate', {
      header: '1st Level Negotiated Rate',
    }),

    columnHelper.accessor('total', {
      header: 'Total',
    }),

    columnHelper.accessor('stdRate', {
      header: 'Std Rate',
    }),

    columnHelper.accessor('stdTotal', {
      header: 'Std Total',
    }),

    // 🔥 INPUT COLUMN
    columnHelper.display({
      id: 'negotiationTotal',
      header: 'Negotiation Total',
      cell: ({ row }) => {
        const rowId = row.original.id;
        console.log('rowId', rowId);
        return (
          <Input
            type="number"
            value={rowInputs[rowId] ?? ''}
            onChange={(e) => handleInputField(Number(e.target.value), rowId)}
            className="w-28"
          />
        );
      },
    }),
  ];

  const { table } = useTanStackTable({
    tableData: data,
    columnConfig: columns,
  });

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4">Rate Negotiation</Title>

        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Table table={table} variant="modern" />

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => {
            console.log('Negotiation values:', rowInputs);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
