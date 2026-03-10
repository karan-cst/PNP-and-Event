import { Text, Title } from 'rizzui/typography';
import { useModal } from '../../modal-views/use-modal';
import { ActionIcon } from 'rizzui/action-icon';
import { PiXBold } from 'react-icons/pi';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { createColumnHelper } from '@tanstack/react-table';
import { TableClassNameProps } from '@core/components/table/table-types';
import Table from '@core/components/table';
import { formatPrice } from '@/config/format-pricing';

export function VendorPriceCompairView({
  onClose,
  classNames = {
    container: 'border border-muted rounded-md h-[350px] overflow-auto',
    rowClassName: 'last:border-0',
  },
}: {
  onClose: () => void;
  classNames?: TableClassNameProps;
}) {
  const { closeModal } = useModal();
  type VendorPriceDataType = {
    elementName: string;
    qty?: number;
    days?: number;
    vendor1Rate?: number;
    vendor2Rate?: number;
    vendor3Rate?: number;
    stdRate?: number;
    stdTotal?: number;
  };

  const venodrPriceData: VendorPriceDataType[] = [
    {
      elementName: 'Chair',
      qty: 100,
      days: 1,
      vendor1Rate: 100,
      vendor2Rate: 98,
      vendor3Rate: 99,
      stdRate: 95,
      stdTotal: 9500,
    },
    {
      elementName: 'stage',
      qty: 2,
      days: 2,
      vendor1Rate: 2000,
      vendor2Rate: 1900,
      vendor3Rate: 1850,
      stdRate: 1800,
      stdTotal: 7200,
    },
    {
      elementName: 'cooler',
      qty: 10,
      days: 2,
      vendor1Rate: 100,
      vendor2Rate: 95,
      vendor3Rate: 98,
      stdRate: 100,
      stdTotal: 2000,
    },
    {
      elementName: 'TOTAL',
      vendor1Rate: 1000,
      vendor2Rate: 7500,
      vendor3Rate: 200,
    },
  ];

  // type venodrPriceDataType = (typeof venodrPriceData)[number];

  const columnHelper = createColumnHelper<VendorPriceDataType>();

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
      size: 80,
      header: 'Qntity',
      cell: ({ row }) => <Text className="text-sm">{row.original.qty}</Text>,
    }),
    columnHelper.display({
      id: 'days',
      size: 80,
      header: 'Days',
      cell: ({ row }) => <Text className="text-sm">{row.original.days}</Text>,
    }),
    columnHelper.display({
      id: 'vendor1Rate',
      size: 130,
      header: 'Vendor 1',
      cell: ({ row }) => {
        const { vendor1Rate, stdRate } = row.original;
        const isHigh =
          vendor1Rate !== undefined &&
          stdRate !== undefined &&
          vendor1Rate > stdRate;

        return (
          <Text
            className={`text-sm font-medium ${isHigh ? 'text-red-600' : 'text-green-600'}`}
          >
            {formatPrice(vendor1Rate)}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: 'vendor2Rate',
      size: 130,
      header: 'Vendor 2',
      cell: ({ row }) => {
        const { vendor2Rate, stdRate } = row.original;
        const isHigh =
          vendor2Rate !== undefined &&
          stdRate !== undefined &&
          vendor2Rate > stdRate;

        return (
          <Text
            className={`text-sm font-medium ${isHigh ? 'text-red-600' : 'text-green-600'}`}
          >
            ₹ {vendor2Rate}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: 'vendor3Rate',
      size: 130,
      header: 'Vendor 3',
      cell: ({ row }) => {
        const { vendor3Rate, stdRate } = row.original;
        const isHigh =
          vendor3Rate !== undefined &&
          stdRate !== undefined &&
          vendor3Rate > stdRate;

        return (
          <Text
            className={`text-sm font-medium ${isHigh ? 'text-red-600' : 'text-green-600'}`}
          >
            ₹ {vendor3Rate}
          </Text>
        );
      },
    }),
    columnHelper.display({
      id: 'stdRate',
      size: 110,
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
  const { table } = useTanStackTable<VendorPriceDataType>({
    tableData: venodrPriceData,
    columnConfig: vendorQutColumns,
    // options: {
    //   initialState: {
    //     pagination: {
    //       pageIndex: 0,
    //       pageSize: pageSize,
    //     },
    //   },
    //   enableColumnResizing: false,
    // },
  });
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Price Compair
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <Table table={table} variant="modern" classNames={classNames} />
    </div>
  );
}
