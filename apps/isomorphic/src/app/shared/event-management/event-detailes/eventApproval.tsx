'use client';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import { TableClassNameProps } from '@core/components/table/table-types';
import { AiOutlineExport } from 'react-icons/ai';
import { PiXBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui/action-icon';
import { Tooltip } from 'rizzui/tooltip';
import { ApprovalHistory } from '../event-approval/columns';
import { useModal } from '../../modal-views/use-modal';
import { Text, Title } from 'rizzui/typography';
import cn from '@core/utils/class-names';

// const columns = [
//   {
//     header: 'First Level Approval',
//     accessorKey: 'firstLevelHistory',
//     id: 'firstLevelHistory',
//     cell: ({ row }: any) => (
//       <div className="font-medium">{row.original.vendorName}</div>
//     ),
//   },
//   {
//     header: 'Total',
//     accessorKey: 'total',
//     id: 'total',
//     cell: ({ row }: any) => formatPrice(row.original.total),
//   },
//   {
//     header: 'EML Uploaded',
//     accessorKey: 'emailUrl',
//     id: 'emailUrl',
//     cell: ({ row }: any) =>
//       row.original.emailUrl ? (
//         <Tooltip
//           size="sm"
//           content="View EML File"
//           placement="top"
//           color="invert"
//         >
//           <ActionIcon size="sm" variant="outline">
//             <AiTwotoneMail className="h-4 w-4" />
//           </ActionIcon>
//         </Tooltip>
//       ) : (
//         '-'
//       ),
//   },
//   {
//     header: 'Excel Uploaded',
//     accessorKey: 'excelUrl',
//     id: 'excelUrl',
//     cell: ({ row }: any) =>
//       row.original.excelUrl ? (
//         <Tooltip
//           size="sm"
//           content="Download Excel File"
//           placement="top"
//           color="invert"
//         >
//           <ActionIcon size="sm" variant="outline">
//             <PiMicrosoftExcelLogo className="h-4 w-4" />
//           </ActionIcon>
//         </Tooltip>
//       ) : (
//         '-'
//       ),
//   },
//   {
//     header: 'Reason To Choose',
//     accessorKey: 'reasonToChoose',
//     id: 'reasonToChoose',
//     cell: ({ row }: any) => row.original.reasonToChoose || '-',
//   },
//   {
//     header: 'Selected By',
//     accessorKey: 'selectBy',
//     id: 'selectBy',
//     cell: ({ row }: any) => row.original.selectBy || '-',
//   },
// ];

const columns = [
  {
    header: 'First Level Approval',
    accessorKey: 'firstLevelHistory',
    id: 'firstLevelHistory',
    cell: ({ row }: any) => (
      <ShowComment history={row.original.firstLevelHistory} />
    ),
  },
  {
    header: 'Second Level Approval',
    accessorKey: 'secondLevelHistory',
    id: 'secondLevelHistory',
    cell: ({ row }: any) => (
      <ShowComment history={row.original.secondLevelHistory} />
    ),
  },
];
export const ShowComment = ({
  history = [],
}: {
  history: ApprovalHistory[];
}) => {
  const { openModal, closeModal } = useModal();

  const handleOpen = () => {
    openModal({
      view: (
        <div className="m-auto px-5 pb-8 pt-5">
          <div className="mb-5 flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Approval History
            </Title>

            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>
          {/* <Text className="text-sm leading-relaxed text-gray-700">
            {comment || 'No comment provided.'}
          </Text> */}
          {history.length === 0 ? (
            <Text className="text-sm text-gray-600">No history available</Text>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-3"
                >
                  <div className="flex justify-between">
                    <Text className="font-semibold">{item.userName}</Text>

                    <Text
                      className={cn(
                        'text-sm font-medium',
                        item.status === 'approve'
                          ? 'text-green-600'
                          : 'text-red-600'
                      )}
                    >
                      {item.status}
                    </Text>
                  </div>

                  <Text className="mt-1 text-sm text-gray-700">
                    {item.comment || 'No comment'}
                  </Text>

                  {item.date && (
                    <Text className="mt-1 text-xs text-gray-400">
                      {item.date}
                    </Text>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      customSize: 500,
    });
  };
  const { status, userName } = history?.[history?.length - 1] || {};
  return (
    <div className={cn('grid gap-1')}>
      {status?.length > 0 ? (
        <Tooltip
          size="sm"
          content="View History"
          placement="top"
          color="invert"
        >
          <Text
            className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:underline"
            onClick={handleOpen}
          >
            {status}
            <AiOutlineExport />
          </Text>
        </Tooltip>
      ) : null}
      <Text className="text-sm text-gray-600">{userName}</Text>
    </div>
  );
};

export default function EventApprovalTable({
  approvals,
  pageSize = 5,
  classNames = {
    container: '[&_td]:py-2 border border-muted rounded-md ',
    rowClassName: 'last:border-0',
  },
}: {
  approvals: {
    firstLevelHistory: ApprovalHistory[];
    secondLevelHistory: ApprovalHistory[];
  }[];
  pageSize?: number;
  hideFilters?: boolean;
  hideHeader?: boolean;
  hidePagination?: boolean;
  hideFooter?: boolean;
  classNames?: TableClassNameProps;
  paginationClassName?: string;
}) {
  const { table, setData } = useTanStackTable({
    tableData: approvals,
    columnConfig: columns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: pageSize,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          // setData((prev) => prev.filter((r) => r.id !== row.id));
          setData((prev) => prev);
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
        },
      },
      enableColumnResizing: false,
    },
  });

  return (
    <>
      <Table
        table={table}
        variant="modern"
        classNames={{
          ...classNames,
          cellClassName: '!py-2', // 👈 KEY FIX
        }}
      />
    </>
  );
}
