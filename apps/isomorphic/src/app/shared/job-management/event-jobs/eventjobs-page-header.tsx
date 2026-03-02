'use client';

import React, { Dispatch, SetStateAction } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Input, Flex, Select } from 'rizzui';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { type Table as ReactTableType } from '@tanstack/react-table';
import ToggleColumns from '@core/components/table-utils/toggle-columns';

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
};

export default function EventjobPageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
  type = 'non-pharma',
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
              { label: 'Pharma', value: 'pharma' },
              { label: 'Non Pharma', value: 'non-pharma' },
            ]}
            value={type}
            onChange={(option: { value: string }) => setType(option.value)}
            displayValue={(value: string) =>
              value == 'pharma' ? 'Pharma' : 'Non Pharma'
            }
            dropdownClassName="z-[10000]"
            className="h-9"
          />
          <ToggleColumns table={table} />
        </Flex>
      </PageHeader>
    </>
  );
}
