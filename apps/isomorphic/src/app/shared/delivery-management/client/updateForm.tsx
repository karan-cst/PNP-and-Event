'use client';

import cn from '@core/utils/class-names';
import React from 'react';
import { Text } from 'rizzui/typography';
import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Title } from 'rizzui';
import { Form } from '@core/ui/form';
import {
  PNPUpdateFormSchema,
  PNPUpdateFormSchemaFormInput,
} from '@/validators/NEW/update-pnp.schema';
import { JobFormDataType } from '@/data/jobpnp-data';
import { RxCross1 } from 'react-icons/rx';

const UpdateForm = ({
  className,
  selectedJob,
  setSelectedJob,
}: {
  className?: string;
  selectedJob: JobFormDataType | null;
  setSelectedJob: React.Dispatch<React.SetStateAction<JobFormDataType | null>>;
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="h-full overflow-y-scroll">
        {/* <div className="block"> */}
        <div className="relative flex items-center justify-between p-3">
          <Text className="font-inter text-[18px] font-semibold">
            Job Detailes Update
          </Text>
          <RxCross1 size={16} onClick={() => setSelectedJob(null)} />
        </div>

        <div className="flex flex-col pt-5">
          <UpdateJob />
        </div>
      </div>
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
        deliveryDate: '',
        Status: '',
        VendorRemarks: '',
      });
    }, 600);
  };

  const dayOptions = [
    { label: 'Mon', value: 'Mon' },
    { label: 'Tue', value: 'Tue' },
    { label: 'Wed', value: 'Wed' },
    { label: 'Thu', value: 'Thu' },
    { label: 'Fri', value: 'Fri' },
    { label: 'Sat', value: 'Sat' },
    { label: 'Sun', value: 'Sun' },
  ];

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
                title="Division Information"
                description="Basic division details"
                isModalView={isModalView}
              >
                <Input
                  label="Location"
                  {...register('location')}
                  className="col-span-full"
                  error={errors.location?.message}
                />
                <Input
                  label="Delivery Date"
                  {...register('deliveryDate')}
                  className="col-span-full"
                  error={errors.deliveryDate?.message}
                />
                <Input
                  label="Status"
                  className="col-span-full"
                  {...register('Status')}
                  error={errors.Status?.message}
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
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto"
            >
              Update Job
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
