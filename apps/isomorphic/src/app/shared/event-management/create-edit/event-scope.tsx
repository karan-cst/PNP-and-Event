'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';

export default function EventScope({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Scope"
      description="Add basics of your event scope here."
      className={cn(className)}
    >
      <Input
        label="Title"
        placeholder="Title"
        {...register('scope.titleeventName')}
        error={errors?.scope?.titleeventName?.message}
      />
      <Input
        label="Tentative Cost"
        placeholder="Tentative Cost"
        type="number"
        min={0}
        {...register('scope.tentativeCost')}
        error={errors?.scope?.tentativeCost?.message}
      />
    </FormGroup>
  );
}
