'use client';

import React, { Dispatch, SetStateAction } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Flex, Input, Select } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import { useRouter } from 'next/navigation';

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
  type?: boolean | null;
  setType?: Dispatch<SetStateAction<boolean | null>>;
};

export default function EventApprovePageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
  type = false,
  setType,
}: PageHeaderTypes<T>) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
        <Flex
          direction="col"
          gap="3"
          className="mb-3 w-full sm:flex-row sm:items-center sm:justify-end"
        >
          <Input
            type="search"
            placeholder="Search..."
            value={table.getState().globalFilter ?? ''}
            onClear={() => table.setGlobalFilter('')}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
          />
          <Select
            placeholder="All"
            options={[
              { label: 'All', value: 'all' },
              { label: 'Pharma', value: 'pharma' },
              { label: 'Non Pharma', value: 'non-pharma' },
            ]}
            value={type}
            onChange={(option: { value: boolean | null }) => {
              if (setType) {
                setType(option.value);
              }
            }}
            displayValue={(value: boolean | null) =>
              value ? 'Pharma' : 'Non Pharma'
            }
            dropdownClassName="z-[10000]"
            className="w-[50%]"
          />
          <div className="flex items-center gap-4">
            <ToggleColumns table={table} />
          </div>
        </Flex>
      </PageHeader>
    </>
  );
}
