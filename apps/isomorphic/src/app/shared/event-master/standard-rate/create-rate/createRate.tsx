'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Select, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  StandardRateFormInput,
  StandardRateFormSchema,
} from '@/validators/NEW/create-standardRate.schema';
import UploadZone from '@core/ui/file-upload/upload-zone';
import FileInput from '@/app/shared/logistics/shipment/create-edit/file-input';
import { UploadDropzone } from '@core/utils/uploadthing';

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
export default function CreateStandardRate({
  id,
  standardRate,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  standardRate?: StandardRateFormInput;
}) {
  console.log('standardRate', standardRate);
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const onSubmit: SubmitHandler<StandardRateFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReset({
        eventType: '',
        elementType: '',
        elementItem: '',
        tier1Price: 0,
        tier2Price: 0,
        tier3Price: 0,
        isActive: false,
      });
    }, 600);
  };

  return (
    <Form<StandardRateFormInput>
      validationSchema={StandardRateFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: standardRate,
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
                title="Element Pricing Information"
                description="Event element pricing and tier configuration"
                isModalView={isModalView}
              >
                <Input
                  label="Event Type"
                  {...register('eventType')}
                  error={errors.eventType?.message}
                />
                <Input
                  label="Element Type"
                  {...register('elementType')}
                  error={errors.elementType?.message}
                />
                <Input
                  label="Element Item"
                  {...register('elementItem')}
                  error={errors.elementItem?.message}
                />
                <Input
                  label="Tier 1 Price"
                  type="number"
                  {...register('tier1Price')}
                  error={errors.tier1Price?.message}
                />
                <Input
                  label="Tier 2 Price"
                  type="number"
                  {...register('tier2Price')}
                  error={errors.tier2Price?.message}
                />
                <Input
                  label="Tier 3 Price"
                  type="number"
                  {...register('tier3Price')}
                  error={errors.tier3Price?.message}
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
                        { label: 'Active', value: true },
                        { label: 'Inactive', value: false },
                      ]}
                      onChange={onChange}
                      value={value}
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        [
                          { label: 'Active', value: true },
                          { label: 'Inactive', value: false },
                        ].find((r) => r.value === selected)?.label ?? ''
                      }
                      error={errors?.isActive?.message as string}
                    />
                  )}
                />
                {standardRate?.id ? null : (
                  <UploadZone
                    label="Upload File"
                    name="src"
                    getValues={getValues}
                    setValue={setValue}
                    className="col-span-2"
                    accept="image/jpeg,image/png"
                  />
                )}
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
              {id ? 'Update' : 'Create'} Rate
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
