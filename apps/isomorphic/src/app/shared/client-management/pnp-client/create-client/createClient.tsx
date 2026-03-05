'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Select, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  ClientFormInput,
  clientFormSchema,
} from '@/validators/NEW/create-client.schema';

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
export default function CreateClient({
  id,
  client,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  client?: ClientFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ClientFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReset({
        companyName: '',
        name: '',
        email: '',
        mobile: '',
        division: '',
        clientFrom: '',
        clientType: '',
        address: '',
        isActive: 'active',
      });
    }, 600);
  };

  return (
    <Form<ClientFormInput>
      validationSchema={clientFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: client,
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
                  label="Client Name"
                  {...register('companyName')}
                  error={errors.companyName?.message}
                />

                <Controller
                  control={control}
                  name="division"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label="Division"
                      inPortal={false}
                      labelClassName="text-sm font-medium text-gray-900"
                      dropdownClassName="h-auto"
                      placeholder="Select division..."
                      options={[
                        { label: 'Arron', value: 'Arron' },
                        { label: 'Altis', value: 'Altis' },
                      ]}
                      onChange={onChange}
                      value={value}
                      getOptionValue={(option) => option.label}
                      // displayValue={(selected) =>
                      //   [
                      //     { label: 'PNP Client', value: 'pnpClient' },
                      //     { label: 'EVENT Client', value: 'eventClient' },
                      //   ]?.find((r) => r.value === selected)?.label ?? ''
                      // }
                      error={errors?.division?.message as string}
                    />
                  )}
                />

                <Input
                  label="Name"
                  {...register('name')}
                  error={errors.name?.message}
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
                {/* 
                <Controller
                  control={control}
                  name="clientType"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label="Client Type"
                      inPortal={false}
                      labelClassName="text-sm font-medium text-gray-900"
                      dropdownClassName="h-auto"
                      placeholder="Select type..."
                      options={[
                        { label: 'PNP Client', value: 'pnpClient' },
                        { label: 'EVENT Client', value: 'eventClient' },
                      ]}
                      onChange={onChange}
                      value={value}
                      getOptionValue={(option) => option.label}
                      // displayValue={(selected) =>
                      //   [
                      //     { label: 'PNP Client', value: 'pnpClient' },
                      //     { label: 'EVENT Client', value: 'eventClient' },
                      //   ]?.find((r) => r.value === selected)?.label ?? ''
                      // }
                      error={errors?.clientType?.message as string}
                    />
                  )}
                /> */}

                <Controller
                  control={control}
                  name="clientFrom"
                  render={({ field: { value, onChange } }) => {
                    console.log('value', value);
                    return (
                      <Select
                        label="Client From"
                        inPortal={false}
                        labelClassName="text-sm font-medium text-gray-900"
                        dropdownClassName="h-auto"
                        placeholder="Select ..."
                        options={[
                          { label: 'Pharma', value: 'pharma' },
                          { label: 'Non Pharma', value: 'non-pharma' },
                        ]}
                        onChange={onChange}
                        value={value}
                        getOptionValue={(option) => option.label}
                        // displayValue={(selected) =>
                        //   [
                        //     { label: 'Pharma', value: 'pharma' },
                        //     { label: 'Non Pharma', value: 'non-pharma' },
                        //   ]?.find((r) => r.value === selected)?.label ?? ''
                        // }
                        error={errors?.clientFrom?.message as string}
                      />
                    );
                  }}
                />

                <Controller
                  control={control}
                  name="isActive"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label="Status"
                      inPortal={false}
                      labelClassName="text-sm font-medium text-gray-900"
                      dropdownClassName="h-auto"
                      placeholder="Select..."
                      options={[
                        { label: 'Active', value: 'active' },
                        { label: 'InActivate', value: 'inactive' },
                      ]}
                      onChange={onChange}
                      value={value}
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        [
                          { label: 'Active', value: 'active' },
                          { label: 'InActivate', value: 'inactive' },
                        ]?.find((r) => r.value === selected)?.label ?? ''
                      }
                      error={errors?.isActive?.message as string}
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
              {id ? 'Update' : 'Create'} Client
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
