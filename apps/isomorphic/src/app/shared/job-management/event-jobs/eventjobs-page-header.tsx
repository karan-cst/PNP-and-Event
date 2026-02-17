'use client';

import React, { Dispatch, SetStateAction } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Title, ActionIcon, Input, Flex, Select } from 'rizzui';
import {
  PiArrowsOutBold,
  PiMagnifyingGlassBold,
  PiPlusBold,
  PiXBold,
} from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { type Table as ReactTableType } from '@tanstack/react-table';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import FullScreenWrapper from '../../tables/fullscreen-wrapper';
import EventjobsTable from './eventjobs-list/table';

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
  const { isOpen, openModal, closeModal } = useModal();
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
          <ActionIcon
            size="sm"
            variant="text"
            onClick={() => {
              if (isOpen) {
                closeModal();
              } else {
                openModal({
                  view: (
                    <FullScreenWrapper>
                      {/** Re-render SAME table here */}
                      <EventjobsTable pageSize={10} />
                    </FullScreenWrapper>
                  ),
                  size: 'full',
                });
              }
            }}
          >
            {isOpen ? (
              <PiXBold className="h-5 w-5" />
            ) : (
              <PiArrowsOutBold className="h-5 w-5" />
            )}
          </ActionIcon>
        </Flex>
      </PageHeader>
    </>
  );
}
