'use client';
import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, FileInput, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  PaymentApproveFormInput,
  PaymentApproveSchema,
} from '@/validators/NEW/payment-approve.schema';
import Image from 'next/image';
import { DatePicker } from '@core/ui/datepicker';

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

export default function PaymentApprove({
  id,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
}) {
  const onSubmit: SubmitHandler<PaymentApproveFormInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
  };

  return (
    <Form<PaymentApproveFormInput>
      validationSchema={PaymentApproveSchema}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: undefined,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ control, formState: { errors } }) => (
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
                <div className="col-span-2 flex items-center justify-between">
                  <Controller
                    name="date"
                    control={control}
                    render={({
                      field: { value, onChange, onBlur },
                      fieldState,
                    }) => (
                      <DatePicker
                        inputProps={{ label: 'Payment date' }}
                        placeholderText="Payment Date"
                        dateFormat="dd/MM/yyyy"
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        maxDate={new Date()}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
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
            <Button type="submit" className="w-full @xl:w-auto">
              Payment Done
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
