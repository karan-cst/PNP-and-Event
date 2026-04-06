'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';

export default function JobProduct({ className }: { className?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
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
    </>
  );
}
