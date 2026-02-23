'use client';

import React, { Dispatch, SetStateAction } from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Title, ActionIcon, Flex, Input, Select } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import {
  PiArrowsOutBold,
  PiMagnifyingGlassBold,
  PiPlusBold,
  PiXBold,
} from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import ToggleColumns from '@core/components/table-utils/toggle-columns';
import { useRouter } from 'next/navigation';
import FullScreenWrapper from '../../tables/fullscreen-wrapper';
import EventApproveTable from './table';

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
              { label: 'All', value: null },
              { label: 'Pharma', value: true },
              { label: 'Non Pharma', value: false },
            ]}
            value={type}
            onChange={(option: { value: boolean | null }) =>
              setType(option.value)
            }
            displayValue={(value: boolean | null) =>
              value ? 'Pharma' : 'Non Pharma'
            }
            dropdownClassName="z-[10000]"
            className="w-[50%]"
          />
          <div className="flex items-center gap-4">
            {/* <Button
              as="span"
              className="mt-4 w-2 cursor-pointer @sm:mt-0 @sm:w-full @lg:mt-0 @lg:w-auto"
              onClick={() => router.push('/event-management/create-event')}
            >
              <PiPlusBold className="h-[15px] w-[15px]" />
            </Button> */}
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
                        <EventApproveTable pageSize={10} />
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
          </div>
        </Flex>
      </PageHeader>
    </>
  );
}
