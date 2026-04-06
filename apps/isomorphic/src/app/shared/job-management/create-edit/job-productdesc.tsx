'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Input } from 'rizzui';

export default function JobProductDesc({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
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
    </>
  );
}
