'use client';
import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Flex, Input } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import ToggleColumns from '@core/components/table-utils/toggle-columns';

import { useRouter } from 'next/navigation';

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
};

export default function JobPageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
}: PageHeaderTypes<T>) {
  const router = useRouter();
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
            placeholder="Search by job name..."
            value={table.getState().globalFilter ?? ''}
            onClear={() => table.setGlobalFilter('')}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
          />
          <div className="flex items-center gap-4">
            <Button
              as="span"
              className="mt-4 w-2 cursor-pointer @sm:mt-0 @sm:w-full @lg:mt-0 @lg:w-auto"
              onClick={() => router.push('/job-management/create-job')}
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
