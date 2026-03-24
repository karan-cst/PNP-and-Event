'use client';

import React from 'react';
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
};

export default function Header<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
}: PageHeaderTypes<T>) {
  const router = useRouter();
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
        <Flex
          direction="col"
          gap="3"
          className="w-full sm:flex-row sm:items-center sm:justify-end"
        >
          <Input
            type="search"
            placeholder="Search..."
            value={table.getState().globalFilter ?? ''}
            onClear={() => table.setGlobalFilter('')}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
          />
        </Flex>
      </PageHeader>
    </>
  );
}
