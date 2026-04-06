'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { RadioGroup } from 'rizzui/radio-group';
import { Radio } from 'rizzui/radio';
import { Text } from 'rizzui/typography';
import { CheckboxGroup } from 'rizzui/checkbox-group';
import { Checkbox } from 'rizzui/checkbox';
import { useEffect, useState } from 'react';
import { Textarea } from 'rizzui/textarea';
import { ActionIcon } from 'rizzui/action-icon';
import { MdDeleteOutline } from 'react-icons/md';
import { IoMdCheckmark } from 'react-icons/io';
import { HiXMark } from 'react-icons/hi2';
import { Button } from 'rizzui/button';

export default function GiftInstruction({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const jobType = watch('jobType');
  const [isDisabled, setDisabled] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'giftSpecialInstructions',
  });

  useEffect(() => {
    setDisabled(jobType.includes('gift'));
  }, [jobType]);

  useEffect(() => {
    if (!isDisabled) {
      setValue('giftInstruction.giftingType', undefined);
      setValue('giftInstruction.logoType', undefined);
      setValue('giftInstruction.colorType', undefined);
      setValue('giftInstruction.engraveType', undefined);
      setValue('giftInstruction.printingType', undefined);
      setValue('giftInstruction.packingType', undefined);
    }
  }, [isDisabled, setValue]);

  return (
    <>
      <FormGroup
        title="Gifting Description"
        description="Add gifting Description here with required fields and types"
        className={cn(className)}
      >
        <Controller
          name="giftInstruction.giftingType"
          control={control}
          disabled={true}
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Text className="font-bold">Gifting Type</Text>
              <RadioGroup
                value={value}
                setValue={onChange}
                className="flex flex-row gap-4"
              >
                <Radio value="branded" label="Branded" disabled={!isDisabled} />
                <Radio
                  value="non_branded"
                  label="Non Branded"
                  disabled={!isDisabled}
                />
              </RadioGroup>
            </div>
          )}
        />
        <Controller
          name="giftInstruction.logoType"
          control={control}
          disabled={!isDisabled}
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Text className="font-bold">Logo Type</Text>
              <RadioGroup
                value={value}
                setValue={onChange}
                className="flex flex-row gap-4"
              >
                <Radio value="logo" label="Logo" disabled={!isDisabled} />
                <Radio
                  value="customized"
                  label="Customized"
                  disabled={!isDisabled}
                />
              </RadioGroup>
            </div>
          )}
        />
        <Controller
          name="giftInstruction.colorType"
          control={control}
          disabled={!isDisabled}
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Text className="font-bold">Colour Type</Text>

              <RadioGroup
                value={value}
                setValue={onChange}
                className="flex flex-row gap-4"
              >
                <Radio
                  value="four_color"
                  label="Four Color"
                  disabled={!isDisabled}
                />
                <Radio
                  value="single_color"
                  label="Single Color"
                  disabled={!isDisabled}
                />
              </RadioGroup>
            </div>
          )}
        />
        <Controller
          name="giftInstruction.engraveType"
          control={control}
          disabled={!isDisabled}
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Text className="font-bold">Engrave Type</Text>

              <RadioGroup
                value={value}
                setValue={onChange}
                className="flex flex-row gap-4"
              >
                <Radio value="engrave" label="Engrave" disabled={!isDisabled} />
                <Radio value="laser" label="Laser" disabled={!isDisabled} />
              </RadioGroup>
            </div>
          )}
        />
        <Controller
          name="giftInstruction.printingType"
          control={control}
          disabled={!isDisabled}
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Text className="font-bold">Printing Type</Text>

              <RadioGroup
                value={value}
                setValue={onChange}
                className="flex flex-row gap-4"
              >
                <Radio value="screen" label="Screen" disabled={!isDisabled} />
                <Radio value="other" label="Other" disabled={!isDisabled} />
              </RadioGroup>
            </div>
          )}
        />
        <Controller
          name="giftInstruction.packingType"
          control={control}
          disabled={!isDisabled}
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Text className="font-bold">Packing Type</Text>
              <CheckboxGroup
                values={value || []}
                setValues={onChange}
                className="flex flex-row gap-10"
              >
                <Checkbox
                  value="bubble"
                  label="Bubble"
                  disabled={!isDisabled}
                />
                <Checkbox
                  value="shrink"
                  label="Shrink"
                  disabled={!isDisabled}
                />
                <Checkbox
                  value="thermocol"
                  label="Thermocol"
                  disabled={!isDisabled}
                />
                <Checkbox
                  value="polythin"
                  label="Polythin Pack"
                  disabled={!isDisabled}
                />
              </CheckboxGroup>
            </div>
          )}
        />
      </FormGroup>

      <div className="col-span-full flex justify-end">
        <Button
          type="button"
          onClick={() => append({ text: '', descriptionStatus: 'approved' })}
          className="mb-4"
        >
          + Add Instruction
        </Button>
      </div>
      {fields.map((field, index) => {
        const status = watch(`specialInstructions.${index}.descriptionStatus`);

        return (
          <div key={field.id} className="col-span-full flex items-end gap-2">
            <div className="flex-1">
              <Textarea
                label={
                  <div className="flex items-center justify-between">
                    Instruction {index + 1}{' '}
                    <ActionIcon
                      color="danger"
                      variant="outline"
                      disabled={fields.length === 1}
                      onClick={() => remove(index)}
                    >
                      <MdDeleteOutline className="h-4 w-4" />
                    </ActionIcon>
                  </div>
                }
                {...register(`specialInstructions.${index}.text`)}
              />
            </div>

            <div className="flex gap-1 pb-[2px]">
              <ActionIcon
                size="md"
                variant={status === 'approved' ? 'solid' : 'outline'}
                onClick={() =>
                  setValue(
                    `specialInstructions.${index}.descriptionStatus`,
                    'approved'
                  )
                }
              >
                <IoMdCheckmark className="h-4 w-4" />
              </ActionIcon>

              <ActionIcon
                size="md"
                variant={status === 'rejected' ? 'solid' : 'outline'}
                color="danger"
                onClick={() =>
                  setValue(
                    `specialInstructions.${index}.descriptionStatus`,
                    'rejected'
                  )
                }
              >
                <HiXMark className="h-4 w-4" />
              </ActionIcon>
            </div>

            {/* ❌ remove button */}
          </div>
        );
      })}
    </>
  );
}
