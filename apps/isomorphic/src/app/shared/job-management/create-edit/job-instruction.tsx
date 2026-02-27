'use client';

import { useFormContext } from 'react-hook-form';
import { Input, Textarea } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';

export default function JobInstruction({ className }: { className?: string }) {
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
      <Textarea
        label="Special Instruction(optional)"
        placeholder="Notes about your order, e.g. special notes for delivery."
        {...register('specialInstructions')}
        error={errors.specialInstructions?.message as string}
        textareaClassName="h-20"
        className="col-span-full"
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
