'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';
import { typeOption } from './form-utils';

export default function EventSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Summary"
      description="Add basics of your event here."
      className={cn(className)}
    >
      <Controller
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
      />
      <Input
        label="Event Name"
        placeholder="Event Name"
        {...register('eventName')}
        error={errors?.eventName?.message as string}
      />

      <Controller
        name="startDate"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <DatePicker
            inputProps={{ label: 'Start date' }}
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            // error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="endDate"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <DatePicker
            inputProps={{ label: 'End date' }}
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            // error={fieldState.error?.message}
          />
        )}
      />
    </FormGroup>
  );
}
