'use client';

import { useEffect, useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { Input, Select, Text } from 'rizzui';
import type { CreateEventInput } from '@/validators/NEW/create-event.schema';

const toNumberOrUndef = (v: any) => (v === '' ? undefined : Number(v));

function calcSqftFromAnyTwo(dims: Array<number | undefined>) {
  const nums = dims.filter(
    (n) => typeof n === 'number' && Number.isFinite(n) && n > 0
  ) as number[];
  if (nums.length < 2) return undefined;
  return nums[0] * nums[1];
}

export function EventElementRow({
  index,
  options,
}: {
  index: number;
  options: Array<{ label: string; value: string; rate: number }>;
}) {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<CreateEventInput>();

  const [elementName, width, length, height, depth, days, quantity, stdRate] =
    useWatch({
      control,
      name: [
        `elements.${index}.standardElementName`,
        `elements.${index}.width`,
        `elements.${index}.length`,
        `elements.${index}.height`,
        `elements.${index}.depth`,
        `elements.${index}.days`,
        `elements.${index}.quantity`,
        `elements.${index}.standardRate`,
      ] as const,
    });

  const selectedOption = useMemo(
    () => options.find((o) => o.value === elementName) ?? null,
    [options, elementName]
  );

  const sqft = useMemo(
    () => calcSqftFromAnyTwo([width, length, height, depth]),
    [width, length, height, depth]
  );

  const amount = useMemo(() => {
    const d = Number(days) || 0;
    const q = Number(quantity) || 0;
    const r = Number(stdRate) || 0;

    const sqftFactor = sqft ?? 1; // if no size given, still calculate qty*days*rate
    const total = sqftFactor * d * q * r;

    return Number.isFinite(total) ? Math.round(total * 100) / 100 : undefined;
  }, [sqft, days, quantity, stdRate]);

  // store computed values in RHF state (so it goes in submit payload)
  useEffect(() => {
    setValue(`elements.${index}.sqft`, sqft, { shouldDirty: true });
    setValue(`elements.${index}.total`, amount, { shouldDirty: true });
  }, [sqft, amount, index, setValue]);

  const rowErr: any = errors?.elements?.[index];

  return (
    <div className="grid grid-cols-12 gap-4 rounded-lg border p-4">
      {/* Element dropdown */}
      <Controller
        control={control}
        name={`elements.${index}.standardElementName`}
        render={({ field: { value, onChange } }) => (
          <Select
            label="Element"
            options={options}
            value={options.find((o) => o.value === value) ?? null}
            onChange={(opt: any) => {
              console.log('opt', opt);
              let element = options.find((o) => o.value == opt);
              // opt is the selected option object
              onChange(element?.value);

              // set standard rate from backend option
              setValue(`elements.${index}.standardRate`, element?.rate ?? 0, {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            getOptionValue={(opt) => opt.value}
            dropdownClassName="h-auto"
            className="col-span-3"
            error={rowErr?.elementName?.message}
          />
        )}
      />

      {/* Std Rate (auto-filled but editable if you want) */}
      <Input
        type="number"
        label="Std Rate"
        className="col-span-3"
        {...register(`elements.${index}.standardRate`, {
          setValueAs: toNumberOrUndef,
        })}
        error={rowErr?.stdRate?.message}
      />

      {/* Optional dimensions */}
      <Input
        type="number"
        label="Width"
        className="col-span-3"
        {...register(`elements.${index}.width`, {
          setValueAs: toNumberOrUndef,
        })}
        error={rowErr?.width?.message}
      />
      <Input
        type="number"
        label="Length"
        className="col-span-3"
        {...register(`elements.${index}.length`, {
          setValueAs: toNumberOrUndef,
        })}
        error={rowErr?.length?.message}
      />
      <Input
        type="number"
        label="Height"
        className="col-span-3"
        {...register(`elements.${index}.height`, {
          setValueAs: toNumberOrUndef,
        })}
        error={rowErr?.height?.message}
      />
      <Input
        type="number"
        label="Depth"
        className="col-span-3"
        {...register(`elements.${index}.depth`, {
          setValueAs: toNumberOrUndef,
        })}
        error={rowErr?.depth?.message}
      />

      {/* Required for amount */}
      <Input
        type="number"
        label="Days"
        className="col-span-3"
        {...register(`elements.${index}.days`, { setValueAs: toNumberOrUndef })}
        error={rowErr?.days?.message}
      />
      <Input
        type="number"
        label="Quantity"
        className="col-span-3"
        {...register(`elements.${index}.quantity`, {
          setValueAs: toNumberOrUndef,
        })}
        error={rowErr?.quantity?.message}
      />

      {/* computed display */}
      <div className="col-span-3 flex flex-col justify-end">
        <Text className="text-sm font-medium">Computed Sqft</Text>
        <Text className="text-sm">{sqft ?? '-'}</Text>
      </div>

      <div className="col-span-12 flex items-center justify-between">
        <Text className="text-base font-semibold">Amount: {amount ?? '-'}</Text>
        {selectedOption ? (
          <Text className="text-sm text-gray-500">
            ({selectedOption.value} @ ₹{selectedOption.rate})
          </Text>
        ) : null}
      </div>

      {/* hidden derived values (optional but safe) */}
      <input type="hidden" {...register(`elements.${index}.sqft`)} />
      <input type="hidden" {...register(`elements.${index}.total`)} />
    </div>
  );
}
