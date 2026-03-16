'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, Input, Select, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  CategoryUpdateInput,
  CategoryUpdateSchema,
} from '@/validators/NEW/update-category.schema';

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
export default function UpdateCategory({
  id,
  ProjectCategory,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
  ProjectCategory: CategoryUpdateInput;
}) {
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CategoryUpdateInput> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReset({
        min_range: 0,
        max_range: null,
      });
    }, 600);
  };

  return (
    <Form<CategoryUpdateInput>
      validationSchema={CategoryUpdateSchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          min_range: ProjectCategory.min_range,
          max_range: ProjectCategory?.max_range,
        },
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
                <Input
                  type="number"
                  label="Min Range"
                  placeholder="Enter min range"
                  {...register('min_range', { valueAsNumber: true })}
                  error={errors?.min_range?.message}
                />

                <Input
                  type="number"
                  label="Max Range"
                  placeholder="Enter max range"
                  {...register('max_range', {
                    setValueAs: (v) => (v === '' ? null : Number(v)),
                  })}
                  error={errors?.max_range?.message}
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
              {'Update'} Range
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
