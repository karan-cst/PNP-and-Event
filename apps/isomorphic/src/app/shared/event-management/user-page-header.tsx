'use client';

import React, { Dispatch, SetStateAction } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Flex, Input, Select } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ToggleColumns from '@core/components/table-utils/toggle-columns';

import { useRouter } from 'next/navigation';

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
};

export default function UserPageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
  type = 'all',
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
            placeholder="Search by vendor name..."
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
            onChange={(option: { value: string }) => setType(option.value)}
            displayValue={(value: string) =>
              value == 'all'
                ? 'All'
                : value == 'pharma'
                  ? 'Pharma'
                  : 'Non Pharma'
            }
            dropdownClassName="z-[10000]"
            className="w-[50%]"
          />
          <div className="flex items-center gap-4">
            <Button
              as="span"
              className="mt-4 w-2 cursor-pointer @sm:mt-0 @sm:w-full @lg:mt-0 @lg:w-auto"
              onClick={() => router.push('/event-management/create-event')}
            >
              <PiPlusBold className="h-[15px] w-[15px]" />
            </Button>
            <ToggleColumns table={table} />
          </div>
        </Flex>
      </PageHeader>
    </>
  );
}
