'use client';

import React, { Dispatch, SetStateAction } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Flex, Input, Select } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiMagnifyingGlassBold } from 'react-icons/pi';

import ToggleColumns from '@core/components/table-utils/toggle-columns';

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
  type?: string;
  setType?: Dispatch<SetStateAction<string>>;
};

export default function EventApprovePageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
  type = 'all',
  setType,
}: PageHeaderTypes<T>) {
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
            onChange={(value: { label: string; value: string }) =>
              setType?.(value.value || 'all')
            }
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
            <ToggleColumns table={table} />
          </div>
        </Flex>
      </PageHeader>
    </>
  );
}
