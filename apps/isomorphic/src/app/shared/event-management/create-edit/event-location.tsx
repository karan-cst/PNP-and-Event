'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { cityOption, stateOption } from './form-utils';
import { CreateEventInput } from '@/validators/NEW/create-event.schema';

export default function EventLocation({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateEventInput>();
  console.log('errors', errors);

  return (
    <FormGroup
      title="Location"
      description="Add event location with their city and full address."
      className={cn(className)}
    >
      <Input
        label="Address line 1"
        placeholder="Address line 1"
        className="col-span-full"
        {...register('location.addressLine1')}
        error={errors?.location?.addressLine1?.message}
      />
      <Input
        label="Address line 2"
        placeholder="Address line 2"
        className="col-span-full"
        {...register('location.addressLine2')}
        error={errors?.location?.addressLine2?.message}
      />
      <Input
        label="pincode"
        placeholder="pincode"
        {...register('location.pincode')}
        error={errors?.location?.pincode?.message}
      />
      <Controller
        name="location.state"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={stateOption}
            value={value}
            onChange={onChange}
            label="State"
            error={errors?.location?.state?.message}
            getOptionValue={(option) => option.value}
          />
        )}
      />
      <Controller
        name="location.city"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            dropdownClassName="h-auto"
            options={cityOption}
            value={value}
            onChange={onChange}
            label="City"
            error={errors?.location?.city?.message}
            getOptionValue={(option) => option.value}
          />
        )}
      />
    </FormGroup>
  );
}
