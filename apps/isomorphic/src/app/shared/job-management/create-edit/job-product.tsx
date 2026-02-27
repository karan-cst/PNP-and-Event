'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';

export default function JobProduct({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Product"
      description="Add product detailes here with their size paper, and budget"
      className={cn(className)}
    >
      <Input
        label="Size"
        placeholder="Size"
        {...register('size')}
        error={errors?.size?.message as string}
      />
      <Input
        label="Paper"
        placeholder="Paper"
        {...register('paper')}
        error={errors?.paper?.message as string}
      />
      <Input
        label="Colour"
        placeholder="Colour"
        {...register('colour')}
        error={errors?.colour?.message as string}
      />
      <Input
        label="Budget"
        placeholder="Budget"
        {...register('budget')}
        error={errors?.budget?.message as string}
      />
    </FormGroup>
  );
}

{
  /* <Controller
        name="eventType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={typeOption}
            value={value}
            onChange={onChange}
            label="Event Type"
            error={errors?.eventType?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      /> */
}
