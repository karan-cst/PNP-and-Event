'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Title, ActionIcon, Input, Flex } from 'rizzui';
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
import CityTierTable, { cityTireDataType } from './citytier-list/table';
import CreateCityTier from './create-citytier/createRate';

export function CreateCitytierModalView({
  cityTier,
}: {
  cityTier: cityTireDataType;
}) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add City Tier
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <CreateCityTier
        isModalView={false}
        cityTier={
          cityTier || {
            tierType: 1,
            city: '',
            state: '',
            minimumProfitMargin: 15, // store as number (15 = 15%)
            isActive: false,
          }
        }
      />
    </div>
  );
}

type PageHeaderTypes<T extends Record<string, any>> = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
  table: ReactTableType<T>;
};

export default function StandardRatePageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
}: PageHeaderTypes<T>) {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
        <Flex align="center" justify="end" gap="4" className="mb-4">
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
          <Button
            as="span"
            className="mt-4 w-full cursor-pointer @lg:mt-0 @lg:w-auto"
            onClick={() =>
              openModal({
                view: <CreateCitytierModalView />,
                customSize: 720,
              })
            }
          >
            <PiPlusBold className="h-[17px] w-[17px]" />
          </Button>
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
                      <CityTierTable pageSize={10} />
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
