'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { ActionIcon, Button, Input, Textarea } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { IoMdCheckmark } from 'react-icons/io';
import { HiXMark } from 'react-icons/hi2';
import { PiBicycle } from 'react-icons/pi';
import { MdDeleteOutline } from 'react-icons/md';

export default function JobInstruction({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specialInstructions',
  });
  const descriptionStatus = watch('descriptionStatus');
  return (
    <>
      <div className="col-span-full flex justify-end">
        <Button
          type="button"
          onClick={() => append({ text: '', descriptionStatus: 'approved' })}
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
