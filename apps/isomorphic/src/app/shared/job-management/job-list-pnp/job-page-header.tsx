'use client';
import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Flex, Input } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiMagnifyingGlassBold, PiPlusBold } from 'react-icons/pi';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import { FaFileArchive } from 'react-icons/fa';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

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
  const session = useSession();
  const role = session?.data?.user?.role;
  const router = useRouter();
  const allowCreate = ['csUser', 'operationHeadPrint'];

  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
        <Flex direction="row" align="center" gap="3">
          <Button as="button" onClick={() => router.push('/archive/pnp-jobs')}>
            <FaFileArchive className="h-[15px] w-[15px]" />
            <span>Archive</span>
          </Button>
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
          {/* <div className="flex items-center gap-4"> */}
          {role && allowCreate.includes(role) && (
            <Button
              as="span"
              // className="mt-4 w-2 cursor-pointer @sm:mt-0 @sm:w-full @lg:mt-0 @lg:w-auto"
              onClick={() => router.push('/job-management/create-job')}
            >
              <PiPlusBold className="h-[15px] w-[15px]" />
            </Button>
          )}
          <ToggleColumns table={table} />
        </Flex>
      </PageHeader>
    </>
  );
}
