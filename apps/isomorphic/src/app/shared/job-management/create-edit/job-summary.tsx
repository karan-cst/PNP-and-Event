'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';

export default function JobSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Summary"
      description="Add basics of your job here."
      className={cn(className)}
    >
      <Input
        label="Job Name"
        placeholder="Job Name"
        {...register('jobName')}
        error={errors?.jobName?.message as string}
      />

      <Controller
        name="date"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <DatePicker
            inputProps={{ label: 'Date' }}
            placeholderText="Job Date"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            error={fieldState.error?.message}
          />
        )}
      />

      <Input
        label="Requisitioner Name"
        placeholder="Requisitioner Name"
        {...register('requisitionerName')}
        error={errors?.requisitionerName?.message as string}
      />
      <Input
        label="Floor"
        placeholder="Floor"
        {...register('floor')}
        error={errors?.floor?.message as string}
      />
      <Input
        label="Division"
        placeholder="Division"
        {...register('division')}
        error={errors?.division?.message as string}
      />
      <Input
        label="Total Qty"
        placeholder="Total Qty"
        {...register('totalQty')}
        error={errors?.totalQty?.message as string}
      />
      <Input
        label="Package Qty"
        placeholder="Package Qty"
        {...register('packageQty')}
        error={errors?.packageQty?.message as string}
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
