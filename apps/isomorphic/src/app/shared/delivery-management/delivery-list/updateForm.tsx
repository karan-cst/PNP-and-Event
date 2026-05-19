'use client';

import cn from '@core/utils/class-names';
import React, { useState } from 'react';
import { Text } from 'rizzui/typography';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Button, Select, Textarea, Title } from 'rizzui';
import { Form } from '@core/ui/form';
import {
  PNPUpdateFormSchema,
  PNPUpdateFormSchemaFormInput,
} from '@/validators/NEW/update-pnp.schema';
import { RxCross1 } from 'react-icons/rx';
import { DeliveryDataType } from './table';
import DateFiled from '@core/components/controlled-table/date-field';
import FormGroup from '../../form-group';

const UpdateForm = ({
  className,
  selectedJob,
  setSelectedJob,
}: {
  className?: string;
  selectedJob: DeliveryDataType | null;
  setSelectedJob: React.Dispatch<React.SetStateAction<DeliveryDataType | null>>;
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="h-full">
        {/* <div className="block"> */}
        <div className="relative flex items-center justify-between p-3">
          <Text className="font-inter text-[18px] font-semibold">
            Job Detailes Update - {selectedJob?.jobName}
          </Text>
          <RxCross1 size={16} onClick={() => setSelectedJob(null)} />
        </div>

        <div className="flex flex-col pt-5">
          <UpdateJob />
        </div>
      </div>
      {/* <Logs /> */}
    </div>
  );
};

export default UpdateForm;
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
export function UpdateJob({
  id,
  PNPUpdate,
  isModalView = false,
}: {
  id?: string;
  isModalView?: boolean;
  PNPUpdate?: PNPUpdateFormSchemaFormInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<PNPUpdateFormSchemaFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReset({
        location: '',
        followupDate: '',
        Status: '',
        VendorRemarks: '',
        remarks: '',
      });
    }, 600);
  };

  return (
    <Form<PNPUpdateFormSchemaFormInput>
      validationSchema={PNPUpdateFormSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: PNPUpdate,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ control, watch, setValue, register, formState: { errors } }) => {
        const selectedDivision = watch('division');
        return (
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
                <FormGroup
                  title="Update Delivery Information"
                  description="Select Division for the job and update delivery details"
                  // className={cn(className)}
                >
                  <Controller
                    name="followupDate"
                    control={control}
                    render={({ field }) => (
                      <DateFiled
                        dateFormat={'dd-MMM-yyyy'}
                        className="col-span-full"
                        placeholderText="Select Follow Up Date"
                        selected={field.value ?? null}
                        onChange={field.onChange}
                        inputProps={{
                          label: 'Revise Follow Up  Date',
                          labelClassName: '[@media(min-width:1860px)]:hidden',
                        }}
                        isClearable={true}
                        onClear={() => field.onChange(null)}
                        clearButtonClassName="translate-y-1 -translate-x-7 mt-2 background-color-[#fff]"
                      />
                    )}
                  />
                  <Controller
                    name="printerDate"
                    control={control}
                    render={({ field }) => (
                      <DateFiled
                        dateFormat={'dd-MMM-yyyy'}
                        className="col-span-full"
                        placeholderText="Select Printer Date"
                        selected={field.value ?? null}
                        onChange={field.onChange}
                        inputProps={{
                          label: 'Revise Printer Delivery Date',
                          labelClassName: '[@media(min-width:1860px)]:hidden',
                        }}
                        isClearable={true}
                        onClear={() => field.onChange(null)}
                        clearButtonClassName="translate-y-1 -translate-x-7 mt-2 background-color-[#fff]"
                      />
                    )}
                  />
                  <Controller
                    name="division"
                    control={control}
                    render={({
                      field: { value, onChange, onBlur },
                      fieldState,
                    }) => (
                      <Select
                        label="Division"
                        className="col-span-full"
                        dropdownClassName="h-auto"
                        placeholder="Select Division..."
                        searchable
                        clearable
                        onClear={() => onChange('')}
                        options={[
                          { label: 'Arron', value: 'Arron' },
                          { label: 'Altis', value: 'Altis' },
                          { label: 'Ortho', value: 'Ortho' },
                          { label: 'Optho', value: 'Optho' },
                        ]}
                        onChange={onChange}
                        value={value}
                        getOptionValue={(option) => option.value}
                        displayValue={(selected) =>
                          [
                            { label: 'Arron', value: 'Arron' },
                            { label: 'Altis', value: 'Altis' },
                            { label: 'Ortho', value: 'Ortho' },
                            { label: 'Optho', value: 'Optho' },
                          ]?.find((r) => r.value === selected)?.label ?? ''
                        }
                        error={errors?.division?.message as string}
                      />
                    )}
                  />
                  {selectedDivision && (
                    <>
                      <Controller
                        name="location"
                        control={control}
                        render={({
                          field: { value, onChange, onBlur },
                          fieldState,
                        }) => (
                          <Select
                            label="Revise Location"
                            className="col-span-full"
                            dropdownClassName="h-auto"
                            placeholder="Select Location..."
                            searchable
                            clearable
                            onClear={() => onChange('')}
                            options={[
                              { label: 'Matoda', value: 'Matoda' },
                              { label: 'HO', value: 'HO' },
                            ]}
                            onChange={onChange}
                            value={value}
                            getOptionValue={(option) => option.value}
                            displayValue={(selected) =>
                              [
                                { label: 'Matoda', value: 'Matoda' },
                                { label: 'HO', value: 'HO' },
                              ]?.find((r) => r.value === selected)?.label ?? ''
                            }
                            error={errors?.location?.message as string}
                          />
                        )}
                      />
                      <Controller
                        name="deliveryDate"
                        control={control}
                        render={({ field }) => (
                          <DateFiled
                            dateFormat={'dd-MMM-yyyy'}
                            className="col-span-full"
                            placeholderText="Select Delivery Date"
                            selected={field.value ?? null}
                            onChange={field.onChange}
                            inputProps={{
                              label: 'Revise Delivery Date',
                              labelClassName:
                                '[@media(min-width:1860px)]:hidden',
                            }}
                            isClearable={true}
                            onClear={() => field.onChange(null)}
                            clearButtonClassName="translate-y-1 -translate-x-7 mt-2 background-color-[#fff]"
                          />
                        )}
                      />
                    </>
                  )}

                  <Textarea
                    {...register('remarks')}
                    placeholder="Reamrks"
                    // rows={2}
                  />
                </FormGroup>
              </div>
            </div>
            {/* z-40   */}
            <div
              className={cn(
                'sticky bottom-0 flex flex-col items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
                isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
              )}
            >
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full @xl:w-auto"
              >
                Update Job
              </Button>
              <Button variant="outline" className="w-full @xl:w-auto">
                Job Finish
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
}
