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
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            label="Item SAP Code"
            placeholder="Item SAP Code"
            {...register('sapCode')}
            error={errors?.sapCode?.message as string}
          />
        </div>

        {true && (
          <div className="flex gap-1 pb-[2px]">
            <ActionIcon
              size="md"
              variant={sapCodeStatus === 'approved' ? 'solid' : 'outline'}
              color="primary"
              onClick={() => setValue('sapCodeStatus', 'approved')}
            >
              <IoMdCheckmark className="h-4 w-4" />
            </ActionIcon>

            <ActionIcon
              size="md"
              variant={sapCodeStatus === 'rejected' ? 'solid' : 'outline'}
              color="danger"
              onClick={() => setValue('sapCodeStatus', 'rejected')}
            >
              <HiXMark className="h-4 w-4" />
            </ActionIcon>
          </div>
        )}
      </div>
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            label="Print SAP Code"
            placeholder="Print SAP Code"
            {...register('printsapCode')}
            error={errors?.printsapCode?.message as string}
          />
        </div>

        {true && (
          <div className="flex gap-1 pb-[2px]">
            <ActionIcon
              size="md"
              variant={printsapCodeStatus === 'approved' ? 'solid' : 'outline'}
              color="primary"
              onClick={() => setValue('printsapCodeStatus', 'approved')}
            >
              <IoMdCheckmark className="h-4 w-4" />
            </ActionIcon>

            <ActionIcon
              size="md"
              variant={printsapCodeStatus === 'rejected' ? 'solid' : 'outline'}
              color="danger"
              onClick={() => setValue('printsapCodeStatus', 'rejected')}
            >
              <HiXMark className="h-4 w-4" />
            </ActionIcon>
          </div>
        )}
      </div>

      <Input
        label="CC Code"
        placeholder="CC Code"
        {...register('ccCode')}
        error={errors?.ccCode?.message as string}
      />

      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            label="HSN Code"
            placeholder="HSN Code"
            {...register('hsnCode')}
            error={errors?.hsnCode?.message as string}
          />
        </div>

        {true && (
          <div className="flex gap-1 pb-[2px]">
            <ActionIcon
              size="md"
              variant={hsnCodeStatus === 'approved' ? 'solid' : 'outline'}
              color="primary"
              onClick={() => setValue('hsnCodeStatus', 'approved')}
            >
              <IoMdCheckmark className="h-4 w-4" />
            </ActionIcon>

            <ActionIcon
              size="md"
              variant={hsnCodeStatus === 'rejected' ? 'solid' : 'outline'}
              color="danger"
              onClick={() => setValue('hsnCodeStatus', 'rejected')}
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
  /* 
  <Input
        label="HSN Code"
        placeholder="HSN Code"
        {...register('hsnCode')}
        error={errors?.hsnCode?.message as string}
      />
  <Input
        label="Item SAP Code"
        placeholder="SAP Code"
        {...register('sapCode')}
        error={errors?.sapCode?.message as string}
      /> 
         <Input
        label="Print SAP Code"
        placeholder="Print SAP Code"
        {...register('printsapCode')}
        error={errors?.printsapCode?.message as string}
      />
      */
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
