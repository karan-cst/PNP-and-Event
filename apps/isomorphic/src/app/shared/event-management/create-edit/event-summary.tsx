'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';
import { typeOption } from './form-utils';
import DateCell from '@core/ui/date-cell';

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
            minDate={new Date()}
            error={fieldState.error?.message}
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
            minDate={new Date()}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="possessionDate"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <DatePicker
            inputProps={{ label: 'Possession date' }}
            placeholderText="Select Date"
            dateFormat="dd/MM/yyyy h:mm aa"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            showTimeSelect={true}
            minDate={new Date()}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="stallType"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={[
              {
                label: 'Fabricated',
                value: 'fabricated',
              },
              {
                value: 'frame',
                label: 'Frame Flex',
              },
            ]}
            value={value}
            onChange={onChange}
            label="Stall Type (optional)"
            error={errors?.eventType?.message as string}
            getOptionValue={(option) => option.value}
          />
        )}
      />
      <Input
        label="Stall Size SQFT.(optional)"
        placeholder="Stall Size In SQFT."
        {...register('stallSize')}
        type="number"
        error={errors?.stallSize?.message as string}
      />
      <Input
        label="Stall Open Sides(optional)"
        placeholder="Open Sides"
        {...register('sideOpen')}
        type="number"
        error={errors?.sideOpen?.message as string}
      />
    </FormGroup>
  );
}
