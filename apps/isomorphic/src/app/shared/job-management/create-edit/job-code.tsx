'use client';

import { useFormContext } from 'react-hook-form';
import { ActionIcon, Input } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { HiXMark } from 'react-icons/hi2';
import { IoMdCheckmark } from 'react-icons/io';

export default function JobCode({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const sapCodeStatus = watch('sapCodeStatus');
  const printsapCodeStatus = watch('printsapCodeStatus');
  const hsnCodeStatus = watch('hsnCodeStatus');

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
        label="HSN Code"
        placeholder="HSN Code"
        {...register('hsnCode')}
        error={errors?.hsnCode?.message as string}
      />
    </FormGroup>
  );
}
