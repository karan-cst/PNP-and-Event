'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';

export default function JobDelivery({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Delivery"
      description="Add delivery instruction and detailes"
      className={cn(className)}
    >
      <Input
        label="Delivery Place"
        placeholder="Delivery Place"
        {...register('deliveryPlace')}
        error={errors?.deliveryPlace?.message as string}
      />
      <Controller
        name="deliveryDate"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <DatePicker
            inputProps={{ label: 'Date' }}
            placeholderText="Delivery Date"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            error={fieldState.error?.message}
          />
        )}
      />
      <Input
        label="Delivery Comment"
        placeholder="Delivery Comment"
        {...register('deliveryComment')}
        className="col-span-full"
        error={errors?.deliveryComment?.message as string}
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
