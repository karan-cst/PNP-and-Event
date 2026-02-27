'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';

export default function JobCode({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Code"
      description="Add codes of your job here like GL, CC, HSN, etc...."
      className={cn(className)}
    >
      <Input
        label="GL Code"
        placeholder="GL Code"
        {...register('glCode')}
        error={errors?.glCode?.message as string}
      />
      <Input
        label="SAP Code"
        placeholder="SAP Code"
        {...register('sapCode')}
        error={errors?.sapCode?.message as string}
      />
      <Input
        label="CC Code"
        placeholder="CC Code"
        {...register('ccCode')}
        error={errors?.ccCode?.message as string}
      />
      <Input
        label="HSN Code"
        placeholder="HSN Code"
        {...register('hsnCode')}
        error={errors?.hsnCode?.message as string}
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
