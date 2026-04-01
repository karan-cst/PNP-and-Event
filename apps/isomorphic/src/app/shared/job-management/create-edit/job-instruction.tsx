'use client';

import { useFormContext } from 'react-hook-form';
import { ActionIcon, Input, Textarea } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { IoMdCheckmark } from 'react-icons/io';
import { HiXMark } from 'react-icons/hi2';

export default function JobInstruction({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const descriptionStatus = watch('descriptionStatus');
  return (
    <FormGroup
      title="Product Description"
      description="Add product Description here with required fields and types"
      className={cn(className)}
    >
      <div className="col-span-full flex items-end gap-2">
        <div className="flex-1">
          <Textarea
            label="Special Instruction(optional)"
            placeholder="Notes about your order, e.g. special notes for delivery."
            {...register('specialInstructions')}
            error={errors.specialInstructions?.message as string}
            textareaClassName="h-20"
            className="col-span-full"
          />
        </div>

        {true && (
          <div className="flex gap-1 pb-[2px]">
            <ActionIcon
              size="md"
              variant={descriptionStatus === 'approved' ? 'solid' : 'outline'}
              color="primary"
              onClick={() => setValue('descriptionStatus', 'approved')}
            >
              <IoMdCheckmark className="h-4 w-4" />
            </ActionIcon>

            <ActionIcon
              size="md"
              variant={descriptionStatus === 'rejected' ? 'solid' : 'outline'}
              color="danger"
              onClick={() => setValue('descriptionStatus', 'rejected')}
            >
              <HiXMark className="h-4 w-4" />
            </ActionIcon>
          </div>
        )}
      </div>
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
