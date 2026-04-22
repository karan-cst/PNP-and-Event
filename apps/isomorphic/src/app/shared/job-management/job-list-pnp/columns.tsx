'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { ActionIcon, Button, Flex, Select, Text, Title, Tooltip } from 'rizzui';
import cn from '@core/utils/class-names';
import PencilIcon from '@core/components/icons/pencil';
import { formatPrice } from '@/config/format-pricing';
import { JobFormDataType } from '@/data/jobpnp-data';
import {
  PiMicrosoftExcelLogo,
  PiUserCirclePlusDuotone,
  PiXBold,
} from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dayjs from 'dayjs';
import { useModal } from '../../modal-views/use-modal';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import UploadIcon from '@core/components/shape/upload';
import UploadSample from './upload-sample/uploadSample';
import { BsFiletypePdf } from 'react-icons/bs';
const allowEdit = [
  'csUser',
  'printExecutive',
  'operationHeadPrint',
  'businessHead',
];
const allowAuditAssign = ['pnpHead'];
const allowUploadSample = ['csUser'];
const allowPDF = ['poUser'];
const notAlloeExcel = ['poUser'];

const columnHelper = createColumnHelper<JobFormDataType>();

export const JobListColumns = () => {
  const [isApprove, setIsApprove] = useState<string>('karan');
  const { openModal, closeModal } = useModal();
  const session = useSession();
  const role = session?.data?.user?.role;
  const handleOpen = () => {
    openModal({
      view: (
        <div className="m-auto px-5 pb-8 pt-5">
          <div className="mb-5 flex items-center justify-between">
            <Title as="h4" className="font-semibold">
              Assign User For Audit
            </Title>

            <ActionIcon size="sm" variant="text" onClick={closeModal}>
              <PiXBold className="h-auto w-5" />
            </ActionIcon>
          </div>
          <div className="space-y-4">
            <Select
              label="Assign User"
              dropdownClassName="h-auto z-[99999]"
              placeholder="Approve or Reject"
              searchable
              options={[
                { label: 'Karan', value: 'karan' },
                { label: 'Amulakh', value: 'Amulakh' },
              ]}
              value={isApprove}
              onChange={(e: string) => setIsApprove(e)}
              getOptionValue={(option) => option.value}
              displayValue={(selected) =>
                [
                  { label: 'Karan', value: 'karan' },
                  { label: 'Amulakh', value: 'Amulakh' },
                ].find((r) => r.value === selected)?.label ?? ''
              }
            />
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={() => {}}>Submit</Button>
          </div>
        </div>
      ),
      customSize: 500,
    });
  };
  return [
    columnHelper.accessor('jobName', {
      id: 'jobName',
      size: 250,
      header: 'Job Details',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Link
            href={`/job-management/job-view`}
            className="group inline-block"
          >
            <Title
              as="h5"
              className="cursor-pointer !text-sm font-medium text-blue-600 transition group-hover:underline"
            >
              {row.original.jobName}
            </Title>
          </Link>
          <Text className="text-sm">
            {row.original?.division}-{row.original.jobType}
          </Text>
          <Text className="text-sm">{row.original.jobNo}</Text>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'user',
      size: 120,
      header: 'User Name',
      cell: ({ row }) => (
        <>
          <Text className="text-sm">ABC</Text>
          <Text className="text-sm">CS User</Text>
        </>
      ),
    }),
    columnHelper.display({
      id: 'totalQty',
      size: 120,
      header: 'Total Qty / Packing QTY',
      cell: ({ row }) => (
        <>
          <Text className="text-sm">{row.original.totalQty}</Text>
          <Text className="text-sm">{row.original.packageQty}</Text>
        </>
      ),
    }),
    columnHelper.display({
      id: 'PrintExecutiveStatus',
      size: 120,
      header: 'Print Executive Status',
      cell: ({ row }) => (
        <div className={cn('grid gap-1')}>
          <Title
            as="h5"
            className="cursor-pointer !text-sm font-medium transition group-hover:underline"
          >
            {row.original?.printExecutive?.userName || '-'}
          </Title>
          <Text className="text-xs">
            {row.original?.printExecutive?.status || ''}-
            {row.original?.printExecutive?.date || ''}
          </Text>
        </div>
      ),
    }),
    columnHelper.accessor('operationHead', {
      id: 'operationHead',
      size: 200,
      header: 'Operation Head',
      cell: ({ row }) => {
        const stage = row.original?.operationHead;
        return (
          <div className="grid gap-1">
            <Text className="text-sm font-medium">
              {stage?.userName || '-'}
            </Text>
            <Text className="text-xs">
              {stage?.status}
              {stage?.date ? ` • ${stage?.date}` : ''}
            </Text>
          </div>
        );
      },
    }),
    columnHelper.accessor('designCost', {
      id: 'designCost',
      size: 200,
      header: 'Design Cost + Business Head',
      cell: ({ row }) => {
        const stage = row.original?.businessHeadName;
        return (
          <div className="grid gap-1">
            <Text className="text-sm font-medium">
              {formatPrice(row.original.designCost || 0)}
            </Text>
            <Text className="text-xs text-gray-500">
              {row.original?.businessHeadName?.userName || '-'}
            </Text>
            <Text className="text-xs">
              {stage?.status}
              {stage?.date ? ` • ${stage?.date}` : ''}
            </Text>
          </div>
        );
      },
    }),
    columnHelper.accessor('printManager', {
      id: 'printManager',
      size: 200,
      header: 'Print Manager',
      cell: ({ row }) => {
        const manager = row.original?.printManager;
        return (
          <div className="grid gap-1">
            <Text className="text-sm font-medium">
              {manager?.managerName || '-'}
            </Text>
            <Text className="text-xs">
              {manager?.vendorSelectionStatus}
              {manager?.date ? ` • ${manager?.date}` : ''}
            </Text>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'finalizedVendor',
      size: 150,
      header: 'Finalized Vendor',
      cell: ({ row }) => (
        <>
          <Text className="text-sm">
            {row.original?.finalizedVendor ? 'Done' : 'Pending'}
          </Text>
          {/* <Text
          className={cn(
            'flex items-center gap-1 text-sm font-semibold',
            row.original?.finalizedVendor
              ? 'cursor-pointer text-blue-600 hover:underline'
              : 'cursor-not-allowed text-gray-400'
          )}
        >
          {formatPrice(row.original?.finalizedVendorCost)}
          <span>
            <AiOutlineExport />
          </span>
        </Text> */}
        </>
      ),
    }),

    columnHelper.display({
      id: 'deliveryDate',
      size: 120,
      header: 'Delivery Date',
      cell: ({ row }) => (
        <div className="grid gap-1">
          <Text className="text-sm">
            {dayjs(row.original.deliveryDate).format('DD/MM/YYYY')}
          </Text>
          <Text className="text-sm">{row.original?.deliveryPlace || ''}</Text>
        </div>
      ),
    }),

    columnHelper.display({
      id: 'action',
      size: 50,
      header: 'Action',
      cell: ({
        row,
        table: {
          options: { meta },
        },
      }) => (
        <div className="flex gap-1">
          {role && allowEdit.includes(role) && (
            <EventEdit job={row.original as JobFormDataType} />
          )}
          {role && !notAlloeExcel.includes(role) && (
            <Flex>
              <Tooltip
                size="sm"
                content={'Download Excel'}
                placement="top"
                color="invert"
              >
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  aria-label={'Edit Product'}
                  onClick={() => {
                    window.open(
                      '/templates/Vendor_Quote_Template.xlsx',
                      '_blank'
                    );
                  }}
                >
                  <PiMicrosoftExcelLogo className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
            </Flex>
          )}
          {role && allowUploadSample.includes(role) && (
            <UploadButton id={row.original._id} />
          )}
          {role && allowAuditAssign.includes(role) && (
            <Flex>
              <Tooltip
                size="sm"
                content={'Assign Audit'}
                placement="top"
                color="invert"
              >
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  aria-label={'Assign Audit'}
                  onClick={() => handleOpen()}
                >
                  <PiUserCirclePlusDuotone className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
            </Flex>
          )}
          {role && allowPDF.includes(role) && (
            <Flex>
              <Tooltip
                size="sm"
                content={'Download PDF'}
                placement="top"
                color="invert"
              >
                <ActionIcon
                  as="span"
                  size="sm"
                  variant="outline"
                  aria-label={'Download PDF'}
                  onClick={() => {
                    window.open(
                      '/templates/Vendor_Quote_Template.xlsx',
                      '_blank'
                    );
                  }}
                >
                  <BsFiletypePdf className="h-4 w-4" />
                </ActionIcon>
              </Tooltip>
            </Flex>
          )}
        </div>
      ),
    }),
  ];
};

const EventEdit = ({ job }: { job: JobFormDataType }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/job-management/edit-job`);
  };
  return (
    <Flex>
      <Tooltip size="sm" content={'Edit Job'} placement="top" color="invert">
        <ActionIcon
          as="span"
          size="sm"
          variant="outline"
          aria-label={'Edit Job'}
          onClick={handleEdit}
        >
          <PencilIcon className="h-4 w-4" />
        </ActionIcon>
      </Tooltip>
    </Flex>
  );
};

const UploadButton = ({ id }: { id: string }) => {
  const { openModal } = useModal();
  return (
    <Tooltip size="sm" content={'Upload Sample'} placement="top" color="invert">
      <ActionIcon
        as="span"
        size="sm"
        variant="outline"
        aria-label={'Upload Sample'}
        onClick={() =>
          openModal({
            view: <UploadSampleModalView id={id} />,
            customSize: 720,
          })
        }
      >
        <UploadIcon className="h-4 w-4" />
      </ActionIcon>
    </Tooltip>
  );
};

export function UploadSampleModalView({ id }: { id: string }) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add Sample Files
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <UploadSample isModalView={false} id={id} />
    </div>
  );
}
