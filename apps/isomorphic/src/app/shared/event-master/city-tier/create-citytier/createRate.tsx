'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Select, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  CityTierFormInput,
  CityTierFormSchema,
} from '@/validators/NEW/create-citytier.schema';

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
export default function CreateCityTier({
  id,
  cityTier,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  cityTier?: CityTierFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CityTierFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReset({
        tierType: 1,
        city: '',
        state: '',
        minimumProfitMargin: 0,
        isActive: false,
      });
    }, 600);
  };

  return (
    <Form<CityTierFormInput>
      validationSchema={CityTierFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: cityTier,
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
                title="City Tier Profit Margin"
                description="Configure minimum profit margin by tier and city"
                isModalView={isModalView}
              >
                <Controller
                  control={control}
                  name="tierType"
                  render={({ field: { value, onChange } }) => (
                    <Select
                      label="Tier Type"
                      inPortal={false}
                      labelClassName="text-sm font-medium text-gray-900"
                      dropdownClassName="h-auto"
                      placeholder="Select Tier"
                      options={[
                        { label: 'Tier 1', value: 1 },
                        { label: 'Tier 2', value: 2 },
                        { label: 'Tier 3', value: 3 },
                      ]}
                      value={value}
                      onChange={onChange}
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        [
                          { label: 'Tier 1', value: 1 },
                          { label: 'Tier 2', value: 2 },
                          { label: 'Tier 3', value: 3 },
                        ].find((r) => r.value === selected)?.label ?? ''
                      }
                      error={errors?.tierType?.message as string}
                    />
                  )}
                />

                <Input
                  label="City"
                  {...register('city')}
                  error={errors.city?.message}
                />

                <Input
                  label="State"
                  {...register('state')}
                  error={errors.state?.message}
                />

                <Input
                  label="Minimum Profit Margin (%)"
                  type="number"
                  {...register('minimumProfitMargin')}
                  error={errors.minimumProfitMargin?.message}
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
                        { label: 'Inactive', value: 'inactive' },
                      ]}
                      onChange={onChange}
                      value={value}
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        [
                          { label: 'Active', value: 'active' },
                          { label: 'Inactive', value: 'inactive' },
                        ].find((r) => r.value === selected)?.label ?? ''
                      }
                      error={errors?.isActive?.message as string}
                    />
                  )}
                />
              </HorizontalFormBlockWrapper>
            </div>
          </div>

          {/* Footer */}
          <div
            className={cn(
              'sticky bottom-0 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
              isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
            )}
          >
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto"
            >
              {id ? 'Update' : 'Create'} City Tire
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
