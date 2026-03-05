import { Text, Title } from 'rizzui/typography';
import { useModal } from '../../modal-views/use-modal';
import { ActionIcon } from 'rizzui/action-icon';
import { PiXBold } from 'react-icons/pi';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { createColumnHelper } from '@tanstack/react-table';
import { TableClassNameProps } from '@core/components/table/table-types';
import Table from '@core/components/table';

export function VendorViewModalView({
  pageSize = 75,
  classNames = {
    container: 'border border-muted rounded-md h-[350px] overflow-auto',
    rowClassName: 'last:border-0',
  },
}: {
  pageSize?: number;
  classNames?: TableClassNameProps;
}) {
  const { closeModal } = useModal();

  const venodrQutData = [
    {
      elementName: 'Chair',
      qty: 100,
      days: 1,
      vendorRate: 100,
      vendorTotal: 10000,
      stdRate: 95,
      stdTotal: 9500,
    },
    {
      elementName: 'Chair',
      qty: 100,
      days: 1,
      vendorRate: 100,
      vendorTotal: 10000,
      stdRate: 95,
      stdTotal: 9500,
    },
    {
      elementName: 'Chair',
      qty: 100,
      days: 1,
      vendorRate: 100,
      vendorTotal: 10000,
      stdRate: 95,
      stdTotal: 9500,
    },
  ];

  type venodrQutDataType = (typeof venodrQutData)[number];

  const columnHelper = createColumnHelper<venodrQutDataType>();

  const vendorQutColumns = [
    columnHelper.display({
      id: 'elementName',
      size: 130,
      header: 'Element Name',
      cell: ({ row }) => (
        <Text className="text-sm">{row.original.elementName}</Text>
      ),
    }),
    columnHelper.display({
      id: 'qty',
      size: 130,
      header: 'Qntity',
      cell: ({ row }) => <Text className="text-sm">{row.original.qty}</Text>,
    }),
    columnHelper.display({
      id: 'days',
      size: 130,
      header: 'Days',
      cell: ({ row }) => <Text className="text-sm">{row.original.days}</Text>,
    }),
    columnHelper.display({
      id: 'vendorRate',
      size: 130,
      header: 'Vendor Rate',
      cell: ({ row }) => {
        const { vendorRate, stdRate } = row.original;
        const isHigh = vendorRate > stdRate;

        return (
          <Text
            className={`text-sm font-medium ${isHigh ? 'text-red-600' : 'text-green-600'}`}
          >
            ₹ {vendorRate}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: 'vendorTotal',
      size: 130,
      header: 'Vendor Total',
      cell: ({ row }) => (
        <Text className="text-sm">{row.original.vendorTotal}</Text>
      ),
    }),
    columnHelper.display({
      id: 'stdRate',
      size: 130,
      header: 'Std Rate',
      cell: ({ row }) => (
        <Text className="text-sm">{row.original.stdRate}</Text>
      ),
    }),
    columnHelper.display({
      id: 'stdTotal',
      size: 130,
      header: 'Std Total',
      cell: ({ row }) => (
        <Text className="text-sm">{row.original.stdTotal}</Text>
      ),
    }),
  ];
  const { table } = useTanStackTable<venodrQutDataType>({
    tableData: venodrQutData,
    columnConfig: vendorQutColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      enableColumnResizing: false,
    },
  });
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Price Details
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Table table={table} variant="modern" classNames={classNames} />
    </div>
  );
}
