'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Title, ActionIcon, Flex, Input } from 'rizzui';
import { type Table as ReactTableType } from '@tanstack/react-table';
import { PiMagnifyingGlassBold, PiPlusBold, PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateUser from './createUser';
import { UserDataType } from '../users-list/table';
import ToggleColumns from '@core/components/table-utils/toggle-columns';

import USerPasswordChange from '../password-change';

export function CreateUserModalView({ user }: { user?: UserDataType }) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          {user?.id ? 'Update' : 'Add'} User
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <CreateUser
        isModalView={false}
        id={user?.id}
        user={
          user || {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            userType: '',
            address: '',
            isActive: 'active',
          }
        }
      />
    </div>
  );
}
export function CreatePasswordChangeModalView({
  user,
}: {
  user: UserDataType;
}) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Change Password
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <USerPasswordChange
        isModalView={false}
        id={user?.id}
        user={
          user || {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            userType: '',
            address: '',
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

export default function UserPageHeader<T extends Record<string, any>>({
  title,
  breadcrumb,
  className,
  table,
}: PageHeaderTypes<T>) {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
        <Flex align="center" justify="end" gap="4" className="mb-2">
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
          <Button
            as="span"
            className="mt-4 w-full cursor-pointer @lg:mt-0 @lg:w-auto"
            onClick={() =>
              openModal({
                view: <CreateUserModalView />,
                customSize: 720,
              })
            }
          >
            <PiPlusBold className="h-[15px] w-[15px]" />
          </Button>
          <ToggleColumns table={table} />
        </Flex>
      </PageHeader>
    </>
  );
}
