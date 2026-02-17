'use client';

import React from 'react';
import PageHeader from '@/app/shared/page-header';
import { Button, Title, ActionIcon } from 'rizzui';
import { PiPlusBold, PiXBold } from 'react-icons/pi';
import { useModal } from '@/app/shared/modal-views/use-modal';
import CreateUser from './createClient';
import { VendorDataType } from '../client-list/table';

export function CreateUserModalView({ vendor }: { vendor: VendorDataType }) {
  const { closeModal } = useModal();
  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add Vendor
        </Title>
        <ActionIcon size="sm" variant="text" onClick={() => closeModal()}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <CreateUser
        isModalView={false}
        vendor={
          vendor || {
            companyName: '',
            name: '',
            email: '',
            mobile: '',
            vendorType: '',
            city: '',
          }
        }
      />
    </div>
  );
}

type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

export default function UserPageHeader({
  title,
  breadcrumb,
  className,
}: PageHeaderTypes) {
  const { openModal } = useModal();
  return (
    <>
      <PageHeader title={title} breadcrumb={breadcrumb} className={className}>
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
          <PiPlusBold className="me-1.5 h-[17px] w-[17px]" />
          Add User
        </Button>
      </PageHeader>
    </>
  );
}
