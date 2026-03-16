'use client';

import { useEffect, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, Select, Button, ActionIcon, Flex } from 'rizzui';
import { PiPlusBold, PiTrashBold } from 'react-icons/pi';
import FormGroup from '@/app/shared/form-group';
import { CreateEventInput } from '@/validators/NEW/create-event.schema';
import cn from '@core/utils/class-names';
import { formatPrice } from '@/config/format-pricing';
import { CreateCitytierModalView } from '../../event-master/city-tier/citytier-page-header';
import { useModal } from '../../modal-views/use-modal';
import { CreateStandardrateModalView } from '../../event-master/standard-rate/rate-page-header';

const standardElementsFromBackend = [
  { name: 'Chair', rate: 100 },
  { name: 'LED Screen', rate: 1200 },
  { name: 'Sound System', rate: 800 },
];
const option = standardElementsFromBackend.map((el) => ({
  label: `${el.name} - ₹${el.rate}`,
  value: el.name,
}));

export default function EventElements({ className }: { className?: string }) {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateEventInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'elements',
  });

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [days, setDays] = useState<number>(1);

  const handleAdd = () => {
    if (!selectedItem || quantity < 1 || days < 1) return;
    console.log('789456123', selectedItem);

    append({
      standardElementName: selectedItem.name,
      quantity,
      days,
      standardRate: selectedItem.rate,
      total: selectedItem.rate * days * quantity,
    });

    setSelectedItem(null);
    setQuantity(1);
  };

  useEffect(() => {
    console.log('fields', fields);
    if (fields.length === 1 && !fields[0]?.standardElementName) {
      remove(0); // ✅ RHF-safe
    }
  }, [fields, remove]);
  const { openModal } = useModal();
  return (
    <>
      <FormGroup
        title="Elements"
        description="Add standard elements for this event."
        className={cn(className)}
      >
        {/* Selection Row */}
        <div className="col-span-full grid grid-cols-12 items-end gap-4">
          <div className="col-span-6">
            <Select
              label="Standard Element"
              options={option}
              value={
                selectedItem
                  ? {
                      label: `${selectedItem.name} - ₹${selectedItem.rate}`,
                      value: selectedItem,
                    }
                  : null
              }
              onChange={(option: { value: string; label: string }) =>
                setSelectedItem(
                  standardElementsFromBackend.find(
                    (s) => s.name == option?.value
                  )
                )
              }
              displayValue={(option: { value: string; label: string }) =>
                option?.label
              }
            />
          </div>

          <div className="col-span-2">
            <Input
              label="Quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          <div className="col-span-2">
            <Input
              label="Days"
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
            />
          </div>

          <div className="col-span-2">
            <Button
              type="button"
              onClick={handleAdd}
              className="w-full"
              disabled={
                !selectedItem ||
                quantity < 1 ||
                days < 1 ||
                fields.some(
                  (field) => field.standardElementName === selectedItem.name
                )
              }
            >
              <PiPlusBold className="mr-2" />
              Add
            </Button>
          </div>
        </div>

        <div className="col-span-full flex justify-end">
          <Button
            as="span"
            className="mt-4 w-[50%] cursor-pointer @md:mt-2 @lg:w-auto"
            onClick={() =>
              openModal({
                view: <CreateStandardrateModalView />,
                customSize: 720,
              })
            }
          >
            ADD NEW ITEM
          </Button>
        </div>

        {/* Table */}
        {fields.length > 0 && (
          <div className="col-span-full mt-6 overflow-hidden rounded-md border">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Rate</th>
                  <th className="p-3 text-left">Qty</th>
                  <th className="p-3 text-left">Days</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((item, index) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-3">{item.standardElementName}</td>
                    <td className="p-3">{formatPrice(item.standardRate)}</td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">{item.days}</td>
                    <td className="p-3">{formatPrice(item.total)}</td>
                    <td className="p-3">
                      <ActionIcon variant="text" onClick={() => remove(index)}>
                        <PiTrashBold className="h-4 w-4 text-red-500" />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {errors.elements?.message && (
          <p className="mt-2 text-sm text-red-500">{errors.elements.message}</p>
        )}
      </FormGroup>
    </>
  );
}
