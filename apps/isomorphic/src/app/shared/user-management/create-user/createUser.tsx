'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Select, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  UserFormInput,
  userFormSchema,
} from '@/validators/NEW/create-user.schema';
import { eventUser } from '../users-list/table';
import { pnpUser } from '../users-list-pnp/table';
import { financeUser } from '../users-list-finance/table';

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// main category form component for create and update category
export default function CreateUser({
  id,
  user,
  isModalView = true,
  type = 'Event',
}: {
  id?: string;
  isModalView?: boolean;
  user?: UserFormInput;
  type: string;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  let userTypeOption: { label: string; value: string }[] = [
    { label: '', value: '' },
  ];
  const setOption = () => {
    if (type == 'Event') {
      userTypeOption = eventUser.map((u) => ({ label: u, value: u }));
    } else if (type == 'PNP') {
      userTypeOption = pnpUser.map((u) => ({ label: u, value: u }));
    } else if (type == 'Finance') {
      userTypeOption = financeUser.map((u) => ({ label: u, value: u }));
    }
  };
  console.log('type', type, userTypeOption);

  useEffect(() => {
    setOption();
  }, [type]);

  const onSubmit: SubmitHandler<UserFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('createCategory data ->', data);
      setReset({
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        userType: '',
        address: '',
        isActive: false,
      });
    }, 600);
  };

  return (
    <Form<UserFormInput>
      validationSchema={userFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: user,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div
              className={cn(
                'grid grid-cols-1',
                isModalView
                  ? 'grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11'
                  : 'gap-5'
              )}
            >
              <HorizontalFormBlockWrapper
                title="User Information"
                description="Basic user details"
                isModalView={isModalView}
              >
                <Input
                  label="First Name"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                />

                <Input
                  label="Last Name"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                />

                <Input
                  label="Email"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                />

                <Input
                  label="Mobile"
                  {...register('mobile')}
                  error={errors.mobile?.message}
                />
                <Controller
                  control={control}
                  name="userType"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label="User Type"
                      inPortal={false}
                      labelClassName="text-sm font-medium text-gray-900"
                      dropdownClassName="h-auto"
                      placeholder="Select role..."
                      options={userTypeOption}
                      onChange={onChange}
                      value={value}
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        userTypeOption?.find((r) => r.value === selected)
                          ?.label ?? ''
                      }
                      error={errors?.userType?.message as string}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="isActive"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label="User Active"
                      inPortal={false}
                      labelClassName="text-sm font-medium text-gray-900"
                      dropdownClassName="h-auto"
                      placeholder="Select status..."
                      options={[
                        { label: 'Active', value: 'active' },
                        { label: 'Deactive', value: 'inactive' },
                      ]}
                      onChange={onChange}
                      value={value}
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        [
                          { label: 'Active', value: 'active' },
                          { label: 'Deactive', value: 'inactive' },
                        ]?.find((r) => r.value === selected)?.label ?? ''
                      }
                      error={errors?.userType?.message as string}
                    />
                  )}
                />
                <Input
                  label="Address"
                  className="col-span-2"
                  {...register('address')}
                  error={errors.address?.message}
                />
              </HorizontalFormBlockWrapper>
            </div>
          </div>
          {/* z-40   */}
          <div
            className={cn(
              'sticky bottom-0 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
              isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
            )}
          >
            {/* <Button variant="outline" className="w-full @xl:w-auto">
              Save as Draft
            </Button> */}
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto"
            >
              {id ? 'Update' : 'Create'} User
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
