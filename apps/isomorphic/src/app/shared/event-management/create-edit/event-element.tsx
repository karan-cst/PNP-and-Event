'use client';
import { useMemo } from 'react';
import {
  Controller,
  useFormContext,
  useWatch,
  useFieldArray,
} from 'react-hook-form';
import { Button, Input, Select, Text } from 'rizzui';
import type { CreateEventInput } from '@/validators/NEW/create-event.schema';
import { formatPrice } from '@/config/format-pricing';

const toNumberOrUndef = (v: any) => (v === '' ? undefined : Number(v));
function calcSqftFromAllProvided(dims: Array<number | undefined>) {
  const nums = dims.filter(
    (n) => typeof n === 'number' && Number.isFinite(n) && n > 0
  ) as number[];

  // need at least 2 dimensions to consider it “area/volume-like”
  if (nums.length < 2) return undefined;

  return nums.reduce((acc, n) => acc * n, 1);
}

export default function EventElements() {
  const {
    control,
    register,
    setValue,
    getValues,
    resetField,
    trigger,
    formState: { errors },
  } = useFormContext<CreateEventInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'elements',
  });

  // dummy backend
  const standardElementsFromBackend = [
    { name: 'Chair', rate: 100, unitType: 'perpcs' },
    { name: 'Banner', rate: 10, unitType: 'persqft' },
    { name: 'LED Screen', rate: 1200, unitType: 'perpcs' },
    { name: 'Sound System', rate: 800, unitType: 'perpcs' },
  ];

  const options = useMemo(
    () =>
      standardElementsFromBackend.map((el) => ({
        label: `${el.name} - ₹${el.rate} - ${el.unitType}`,
        value: el.name,
        rate: el.rate,
      })),
    []
  );

  // watch draft fields
  const [
    standardElementName,
    width,
    length,
    height,
    depth,
    days,
    quantity,
    standardRate,
  ] = useWatch({
    control,
    name: [
      'elementDraft.standardElementName',
      'elementDraft.width',
      'elementDraft.length',
      'elementDraft.height',
      'elementDraft.depth',
      'elementDraft.days',
      'elementDraft.quantity',
      'elementDraft.standardRate',
    ] as const,
  });

  const sqft = useMemo(
    () => calcSqftFromAllProvided([width, length, height, depth]),
    [width, length, height, depth]
  );

  const amount = useMemo(() => {
    const d = Number(days) || 0;
    const q = Number(quantity) || 0;
    const r = Number(standardRate) || 0;
    const sqftFactor = sqft ?? 1;
    const total = sqftFactor * d * q * r;
    return Number.isFinite(total) ? Math.round(total * 100) / 100 : undefined;
  }, [sqft, days, quantity, standardRate]);

  const draftErr: any = errors?.elementDraft;

  const addToTable = async () => {
    // validate draft fields (so you don't add invalid row)
    const ok = await trigger([
      'elementDraft.standardElementName',
      'elementDraft.days',
      'elementDraft.quantity',
      'elementDraft.standardRate',
      // optionally validate dims too if you have rules
    ] as any);

    if (!ok) return;

    const draft = getValues('elementDraft');

    append({
      ...draft,
      sqft,
      amount,
    } as any);

    // clear the draft inputs for next add
    resetField('elementDraft', {
      defaultValue: {
        standardElementName: undefined,
        standardRate: 0,
        days: 1,
        quantity: 1,
        width: undefined,
        length: undefined,
        height: undefined,
        depth: undefined,
      },
    });
  };
  console.log(
    'render',
    !standardElementName ||
      (Number(quantity) || 0) < 1 ||
      (Number(days) || 0) < 1 ||
      fields.some((field) => field.standardElementName === standardElementName)
  );

  return (
    <div className="space-y-6">
      {/* Draft form (single element input) */}
      <div className="rounded-lg border p-4">
        <Text className="mb-3 text-base font-semibold">Add Element</Text>

        <div className="grid grid-cols-12 gap-4">
          <Controller
            control={control}
            name="elementDraft.standardElementName"
            render={({ field: { value, onChange } }) => (
              <Select
                className="col-span-3"
                label="Element"
                options={options}
                value={options.find((o) => o.value === value) ?? null}
                onChange={(opt: any) => {
                  let element = options.find((o) => o.value == opt);
                  onChange(element?.value);
                  setValue('elementDraft.standardRate', element?.rate ?? 0, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }}
                getOptionValue={(opt) => opt.value}
                dropdownClassName="h-auto"
                error={draftErr?.standardElementName?.message}
              />
            )}
          />

          <Input
            type="number"
            className="col-span-1"
            label="Std Rate"
            {...register('elementDraft.standardRate', {
              setValueAs: toNumberOrUndef,
            })}
            error={draftErr?.stdRate?.message}
          />
          <Input
            type="number"
            className="col-span-1"
            label="Width"
            {...register('elementDraft.width', { setValueAs: toNumberOrUndef })}
          />
          <Input
            type="number"
            className="col-span-1"
            label="Length"
            {...register('elementDraft.length', {
              setValueAs: toNumberOrUndef,
            })}
          />
          <Input
            type="number"
            className="col-span-1"
            label="Height"
            {...register('elementDraft.height', {
              setValueAs: toNumberOrUndef,
            })}
          />
          <Input
            type="number"
            className="col-span-1"
            label="Depth"
            {...register('elementDraft.depth', { setValueAs: toNumberOrUndef })}
          />

          <Input
            type="number"
            className="col-span-1"
            label="Days"
            {...register('elementDraft.days', { setValueAs: toNumberOrUndef })}
            error={draftErr?.days?.message}
          />
          <Input
            type="number"
            className="col-span-1"
            label="Quantity"
            {...register('elementDraft.quantity', {
              setValueAs: toNumberOrUndef,
            })}
            error={draftErr?.quantity?.message}
          />

          <div className="col-span-1 flex flex-col justify-end">
            <Text className="text-sm font-medium">Sqft</Text>
            <Text className="text-sm">{sqft ?? '-'}</Text>
          </div>

          <div className="col-span-1 flex flex-col justify-end">
            <Text className="text-sm font-medium">Amount</Text>
            <Text className="text-sm">{formatPrice(amount) ?? '-'}</Text>
          </div>

          <div className="col-span-12 flex justify-end">
            <Button
              type="button"
              onClick={addToTable}
              disabled={
                !standardElementName ||
                (Number(quantity) || 0) < 1 ||
                (Number(days) || 0) < 1 ||
                fields.some(
                  (field) => field.standardElementName === standardElementName
                )
              }
            >
              Add to Table
            </Button>
          </div>
        </div>
      </div>

      {/* Table of added elements */}
      <div className="rounded-lg border p-4">
        <Text className="mb-3 text-base font-semibold">Elements</Text>

        {fields.length === 0 ? (
          <Text className="text-sm text-gray-500">No elements added yet.</Text>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="py-2 pr-4">Element</th>
                  <th className="py-2 pr-4">Rate</th>
                  <th className="py-2 pr-4">Days</th>
                  <th className="py-2 pr-4">Qty</th>
                  <th className="py-2 pr-4">W x L x H x D</th>
                  <th className="py-2 pr-4">Sqft</th>
                  <th className="py-2 pr-4">Amount</th>
                  <th className="py-2 pr-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((row, idx) => (
                  <tr key={row.id} className="border-b">
                    <td className="py-2 pr-4">
                      {(row as any).standardElementName}
                    </td>
                    <td className="py-2 pr-4">₹{(row as any).standardRate}</td>
                    <td className="py-2 pr-4">{(row as any).days}</td>
                    <td className="py-2 pr-4">{(row as any).quantity}</td>
                    <td className="py-2 pr-4">{`${(row as any).width ?? '-'} ${`x ${(row as any).length ?? '-'} `}${` x ${(row as any).height ?? '-'}`} ${`x ${(row as any).depth ?? '-'}`}`}</td>
                    <td className="py-2 pr-4">{(row as any).sqft ?? '-'}</td>
                    <td className="py-2 pr-4">{(row as any).amount ?? '-'}</td>
                    <td className="py-2 pr-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => remove(idx)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// 'use client';

// import { useMemo } from 'react';
// import { useFieldArray, useFormContext } from 'react-hook-form';
// import { Button } from 'rizzui';
// import type { CreateEventInput } from '@/validators/NEW/create-event.schema';
// import { EventElementRow } from './EventElementRow';

// const standardElementsFromBackend = [
//   { name: 'Chair', rate: 100 },
//   { name: 'LED Screen', rate: 1200 },
//   { name: 'Sound System', rate: 800 },
// ];

// export default function EventElements() {
//   const { control } = useFormContext<CreateEventInput>();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'elements',
//   });

//   const options = useMemo(
//     () =>
//       standardElementsFromBackend.map((el) => ({
//         label: `${el.name} - ₹${el.rate}`,
//         value: el.name,
//         rate: el.rate,
//       })),
//     []
//   );

//   return (
//     <div className="space-y-5">
//       {fields.map((f, idx) => (
//         <div key={f.id}>
//           <EventElementRow index={idx} options={options} />
//           <div className="mt-2 flex justify-end">
//             <Button variant="outline" type="button" onClick={() => remove(idx)}>
//               Remove
//             </Button>
//           </div>
//         </div>
//       ))}

//       <Button
//         type="button"
//         onClick={() =>
//           append({
//             elementName: undefined,
//             stdRate: 0,
//             days: 1,
//             quantity: 1,
//           } as any)
//         }
//       >
//         Add Element
//       </Button>
//     </div>
//   );
// }
//
//
//
//
//
//
//
//
//
//
//
//
//

// 'use client';

// import { useEffect, useMemo } from 'react';
// import { useFormContext, useWatch } from 'react-hook-form';
// import { Input, Text } from 'rizzui';
// import { CreateEventInput } from '@/validators/NEW/create-event.schema';

// const toNumberOrUndef = (v: any) => (v === '' ? undefined : Number(v));

// function calcSqftFromAnyTwo(dims: Array<number | undefined>) {
//   const nums = dims.filter(
//     (n) => typeof n === 'number' && Number.isFinite(n) && n > 0
//   ) as number[];
//   if (nums.length < 2) return undefined;
//   return nums[0] * nums[1];
// }

// function round2(n: number) {
//   return Math.round(n * 100) / 100;
// }

// export default function EventElementRow({ index }: { index: number }) {
//   const {
//     register,
//     control,
//     setValue,
//     formState: { errors },
//   } = useFormContext<CreateEventInput>();

//   const [width, length, height, depth, days, quantity, standardRate] = useWatch(
//     {
//       control,
//       name: [
//         `elements.${index}.width`,
//         `elements.${index}.length`,
//         `elements.${index}.height`,
//         `elements.${index}.depth`,
//         `elements.${index}.days`,
//         `elements.${index}.quantity`,
//         `elements.${index}.standardRate`,
//       ] as const,
//     }
//   );

//   const sqft = useMemo(
//     () => calcSqftFromAnyTwo([width, length, height, depth]),
//     [width, length, height, depth]
//   );

//   const amount = useMemo(() => {
//     const d = Number(days) || 0;
//     const q = Number(quantity) || 0;
//     const r = Number(standardRate) || 0;

//     const sqftFactor = sqft ?? 1; // so no-dimension items still calculate
//     const total = sqftFactor * d * q * r;

//     return Number.isFinite(total) ? round2(total) : undefined;
//   }, [sqft, days, quantity, standardRate]);

//   // Push derived values into RHF state so they go in payload
//   useEffect(() => {
//     setValue(`elements.${index}.sqft`, sqft, {
//       shouldDirty: true,
//       shouldValidate: false,
//     });
//     setValue(`elements.${index}.total`, amount, {
//       shouldDirty: true,
//       shouldValidate: false,
//     });
//   }, [sqft, amount, index, setValue]);

//   const rowErrors: any = errors?.elements?.[index];

//   return (
//     <div className="grid grid-cols-12 gap-4">
//       <Input
//         type="number"
//         label="Width"
//         className="col-span-3"
//         {...register(`elements.${index}.width`, {
//           setValueAs: toNumberOrUndef,
//         })}
//         error={rowErrors?.width?.message}
//       />
//       <Input
//         type="number"
//         label="Length"
//         className="col-span-3"
//         {...register(`elements.${index}.length`, {
//           setValueAs: toNumberOrUndef,
//         })}
//         error={rowErrors?.length?.message}
//       />
//       <Input
//         type="number"
//         label="Height"
//         className="col-span-3"
//         {...register(`elements.${index}.height`, {
//           setValueAs: toNumberOrUndef,
//         })}
//         error={rowErrors?.height?.message}
//       />
//       <Input
//         type="number"
//         label="Depth"
//         className="col-span-3"
//         {...register(`elements.${index}.depth`, {
//           setValueAs: toNumberOrUndef,
//         })}
//         error={rowErrors?.depth?.message}
//       />

//       <Input
//         type="number"
//         label="Days"
//         className="col-span-3"
//         {...register(`elements.${index}.days`, { setValueAs: toNumberOrUndef })}
//         error={rowErrors?.days?.message}
//       />
//       <Input
//         type="number"
//         label="Qty"
//         className="col-span-3"
//         {...register(`elements.${index}.quantity`, {
//           setValueAs: toNumberOrUndef,
//         })}
//         error={rowErrors?.quantity?.message}
//       />
//       <Input
//         type="number"
//         label="Std Rate"
//         className="col-span-3"
//         {...register(`elements.${index}.standardRate`, {
//           setValueAs: toNumberOrUndef,
//         })}
//         error={rowErrors?.standardRate?.message}
//       />

//       <div className="col-span-3 flex flex-col justify-end">
//         <Text className="text-sm font-medium">Computed Sqft</Text>
//         <Text className="text-sm">{sqft ?? '-'}</Text>
//       </div>

//       <div className="col-span-12">
//         <Text className="text-sm font-medium">Amount</Text>
//         <Text className="text-base">{amount ?? '-'}</Text>
//       </div>

//       {/* hidden fields (optional). Not required if you already setValue them, but safe. */}
//       <input type="hidden" {...register(`elements.${index}.sqft`)} />
//       <input type="hidden" {...register(`elements.${index}.total`)} />
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useFormContext, useFieldArray } from 'react-hook-form';
// import { Input, Select, Button, ActionIcon, Flex } from 'rizzui';
// import { PiPlusBold, PiTrashBold } from 'react-icons/pi';
// import FormGroup from '@/app/shared/form-group';
// import { CreateEventInput } from '@/validators/NEW/create-event.schema';
// import cn from '@core/utils/class-names';
// import { formatPrice } from '@/config/format-pricing';
// import { CreateCitytierModalView } from '../../event-master/city-tier/citytier-page-header';
// import { useModal } from '../../modal-views/use-modal';
// import { CreateStandardrateModalView } from '../../event-master/standard-rate/rate-page-header';

// const standardElementsFromBackend = [
//   { name: 'Chair', rate: 100 },
//   { name: 'LED Screen', rate: 1200 },
//   { name: 'Sound System', rate: 800 },
// ];
// const option = standardElementsFromBackend.map((el) => ({
//   label: `${el.name} - ₹${el.rate}`,
//   value: el.name,
// }));

// export default function EventElements({ className }: { className?: string }) {
//   const {
//     control,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useFormContext<CreateEventInput>();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'elements',
//   });

//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   const [quantity, setQuantity] = useState<number>(1);
//   const [days, setDays] = useState<number>(1);

//   const handleAdd = () => {
//     if (!selectedItem || quantity < 1 || days < 1) return;
//     append({
//       standardElementName: selectedItem.name,
//       quantity,
//       days,
//       standardRate: selectedItem.rate,
//       total: selectedItem.rate * days * quantity,
//     });

//     setSelectedItem(null);
//     setQuantity(1);
//   };

//   useEffect(() => {
//     console.log('fields', fields);
//     if (fields.length === 1 && !fields[0]?.standardElementName) {
//       remove(0); // ✅ RHF-safe
//     }
//   }, [fields, remove]);
//   const { openModal } = useModal();
//   return (
//     <>
//       <FormGroup
//         title="Elements"
//         description="Add standard elements for this event."
//         className={cn(className)}
//       >
//         {/* Selection Row */}
//         <div className="col-span-full grid grid-cols-12 items-end gap-4">
//           <div className="col-span-2">
//             <Select
//               label="Standard Element"
//               options={option}
//               value={
//                 selectedItem
//                   ? {
//                       label: `${selectedItem.name} - ₹${selectedItem.rate}`,
//                       value: selectedItem,
//                     }
//                   : null
//               }
//               onChange={(option: { value: string; label: string }) =>
//                 setSelectedItem(
//                   standardElementsFromBackend.find(
//                     (s) => s.name == option?.value
//                   )
//                 )
//               }
//               displayValue={(option: { value: string; label: string }) =>
//                 option?.label
//               }
//             />
//           </div>

//           <div className="col-span-1">
//             <Input
//               label="Width"
//               type="number"
//               min={1}
//               // value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//           </div>
//           <div className="col-span-1">
//             <Input
//               label="Depth"
//               type="number"
//               min={1}
//               // value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//           </div>
//           <div className="col-span-1">
//             <Input
//               label="height"
//               type="number"
//               min={1}
//               // value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//           </div>
//           <div className="col-span-1">
//             <Input
//               label="Length"
//               type="number"
//               min={1}
//               // value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//           </div>
//           <div className="col-span-1">
//             <Input
//               label="Quantity"
//               type="number"
//               min={1}
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//             />
//           </div>
//           <div className="col-span-1">
//             <Input
//               label="Days"
//               type="number"
//               min={1}
//               value={days}
//               onChange={(e) => setDays(Number(e.target.value))}
//             />
//           </div>

//           <div className="col-span-1">
//             <Button
//               type="button"
//               onClick={handleAdd}
//               className="w-full"
//               disabled={
//                 !selectedItem ||
//                 quantity < 1 ||
//                 days < 1 ||
//                 fields.some(
//                   (field) => field.standardElementName === selectedItem.name
//                 )
//               }
//             >
//               <PiPlusBold className="mr-2" />
//               Add
//             </Button>
//           </div>
//         </div>

//         <div className="col-span-full flex justify-end">
//           <Button
//             as="span"
//             className="mt-4 w-[50%] cursor-pointer @md:mt-2 @lg:w-auto"
//             onClick={() =>
//               openModal({
//                 view: <CreateStandardrateModalView />,
//                 customSize: 720,
//               })
//             }
//           >
//             ADD NEW ITEM
//           </Button>
//         </div>

//         {/* Table */}
//         {fields.length > 0 && (
//           <div className="col-span-full mt-6 overflow-hidden rounded-md border">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="p-3 text-left">Name</th>
//                   <th className="p-3 text-left">Rate</th>
//                   <th className="p-3 text-left">Qty</th>
//                   <th className="p-3 text-left">Days</th>
//                   <th className="p-3 text-left">Total</th>
//                   <th className="p-3 text-left">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fields.map((item, index) => (
//                   <tr key={item.id} className="border-t">
//                     <td className="p-3">{item.standardElementName}</td>
//                     <td className="p-3">{formatPrice(item.standardRate)}</td>
//                     <td className="p-3">{item.quantity}</td>
//                     <td className="p-3">{item.days}</td>
//                     <td className="p-3">{formatPrice(item.total)}</td>
//                     <td className="p-3">
//                       <ActionIcon variant="text" onClick={() => remove(index)}>
//                         <PiTrashBold className="h-4 w-4 text-red-500" />
//                       </ActionIcon>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {errors.elements?.message && (
//           <p className="mt-2 text-sm text-red-500">{errors.elements.message}</p>
//         )}
//       </FormGroup>
//     </>
//   );
// }
