'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Flex, Input } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiFunnel, PiMagnifyingGlassBold } from 'react-icons/pi';

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
  openDrawer,
  setOpenDrawer,
}: PageHeaderTypes<T>) {
  const [today, setToday] = React.useState(false);
  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
        <Flex
          direction="col"
          gap="3"
          className="w-full sm:flex-row sm:items-center sm:justify-end"
        >
          {/* <Button
            variant={'outline'}
            onClick={() => setToday(!today)}
            className={`h-9 pe-3 ps-2.5 ${today ? 'bg-gray-200 text-gray-700' : 'bg-primary text-white hover:text-white'}`}
          >
            Today Followup
          </Button> */}
          <Input
            type="search"
            placeholder="Search..."
            value={table.getState().globalFilter ?? ''}
            onClear={() => table.setGlobalFilter('')}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="size-4" />}
          />
          <Button
            variant={'outline'}
            onClick={() => setOpenDrawer(!openDrawer)}
            className="h-9 pe-3 ps-2.5"
          >
            <PiFunnel className="me-1.5 size-[18px]" strokeWidth={1.7} />
            Filters
          </Button>
        </Flex>
      </PageHeader>
    </>
  );
}
