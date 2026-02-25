'use client';

import React, { Dispatch, SetStateAction } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Input, Flex, Select } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { type Table as ReactTableType } from '@tanstack/react-table';
import ToggleColumns from '@core/components/table-utils/toggle-columns';

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
  type: boolean;
  setType: Dispatch<SetStateAction<boolean>>;
};

export default function EventjobPageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
  type = false,
  setType,
}: PageHeaderTypes<T>) {
  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
        <Flex align="center" justify="end" gap="4" className="mb-4">
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
            placeholder="Select..."
            options={[
              { label: 'Pharma', value: true },
              { label: 'Non Pharma', value: false },
            ]}
            value={type}
            onChange={(option: { value: boolean }) => setType(option.value)}
            displayValue={(value: boolean) => (value ? 'Pharma' : 'Non Pharma')}
            dropdownClassName="z-[10000]"
            className="h-9"
          />
          <ToggleColumns table={table} />
        </Flex>
      </PageHeader>
    </>
  );
}
