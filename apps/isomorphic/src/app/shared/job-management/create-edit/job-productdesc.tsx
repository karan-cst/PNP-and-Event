'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';

export default function JobProductDesc({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Product Description"
      description="Add product Description here with required fields and types"
      className={cn(className)}
    >
      <Controller
        name="lamination"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Lamination"
          />
        )}
      />
      <Controller
        name="matt"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Matt"
          />
        )}
      />
      <Controller
        name="gloss"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Gloss"
          />
        )}
      />
      <Controller
        name="front"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Front"
          />
        )}
      />
      <Controller
        name="back"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Back"
          />
        )}
      />
      <Controller
        name="uv"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="UV"
          />
        )}
      />
      <Controller
        name="vaidB2B"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="V.AID(B2B)"
          />
        )}
      />
      <Controller
        name="hBound"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="H.BOUND"
          />
        )}
      />
      <Controller
        name="spiral"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Spiral"
          />
        )}
      />
      <Controller
        name="wiroWire"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="WIRO'O'WIRE"
          />
        )}
      />
      <Controller
        name="indexing"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="INDEXING"
          />
        )}
      />
      <Controller
        name="foil"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="FOIL"
          />
        )}
      />
      <Input
        label="Other Lamination"
        placeholder="Other Lamination"
        className="col-span-full row-span-2"
        {...register('otherLamination')}
        error={errors?.otherLamination?.message as string}
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
