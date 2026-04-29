'use client';
import { useEffect, useMemo, useState } from 'react';
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
  negotiation?: number;
  negotiationToal?: number;
};

export default function RateNegotiationModal() {
  const { closeModal } = useModal();
  const [grandNegotiationTotal, setGrandNegotiationTotal] = useState<
    number | ''
  >('');
  const [hasGrandTotal, setHasGrandTotal] = useState(false);

  const data: NegotiationRow[] = useMemo(
    () => [
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
    ],
    []
  );
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
      id: 'negotiation',
      header: 'Negotiation Total',
      cell: ({ row }) => {
        const rowId = row.original.id;
        console.log('rowId', rowId);
        return (
          <input
            type="number"
            disabled={hasGrandTotal}
            value={row.original.negotiation ?? ''}
            min={0}
            onChange={(e) => handleInputField(Number(e.target.value), rowId)}
            className="w-28 rounded border px-2 py-1"
          />
        );
      },
    }),
  ];

  const { table, setData } = useTanStackTable({
    tableData: data,
    columnConfig: columns,
  });

  const hasRowNegotiation = table.options.data.some(
    (row) =>
      row.negotiation !== undefined &&
      row.negotiation !== null &&
      row.negotiation !== 0
  );

  // check if total has value
  useEffect(() => {
    setHasGrandTotal(
      grandNegotiationTotal !== '' && Number(grandNegotiationTotal) > 0
    );
  }, [grandNegotiationTotal]);

  // const handleInputField = (value: number | '', rowId: string) => {
  //   setData((prev: NegotiationRow[]) =>
  //     prev.map((row) =>
  //       row.id === rowId
  //         ? {
  //             ...row,
  //             negotiation: value === '' ? undefined : Number(value),
  //           }
  //         : row
  //     )
  //   );
  // };

  const handleInputField = (value: number | '', rowId: string) => {
    // if row input used -> clear grand total
    setGrandNegotiationTotal('');

    setData((prev: NegotiationRow[]) =>
      prev.map((row) =>
        row.id === rowId
          ? {
              ...row,
              negotiation: value === '' ? undefined : Number(value),
            }
          : row
      )
    );
  };

  const handleGrandTotalChange = (value: string) => {
    const numValue = value === '' ? '' : Number(value);

    setGrandNegotiationTotal(numValue);

    // if grand total entered -> clear row values
    if (numValue !== '') {
      setData((prev: NegotiationRow[]) =>
        prev.map((row) => ({
          ...row,
          negotiation: undefined,
        }))
      );
    }
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4">Rate Negotiation</Title>

        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      <Table table={table} variant="modern" />

      <div className="mt-5 flex items-center justify-end gap-3">
        <Text>Total Negotiation</Text>

        <Input
          type="number"
          disabled={hasRowNegotiation}
          value={grandNegotiationTotal}
          onChange={
            (e) => handleGrandTotalChange(e.target.value)
            // setGrandNegotiationTotal(
            //   e.target.value === '' ? '' : Number(e.target.value)
            // )
          }
          className="w-40"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <Button
          onClick={() => {
            console.log('Updated table data', table.options.data);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
