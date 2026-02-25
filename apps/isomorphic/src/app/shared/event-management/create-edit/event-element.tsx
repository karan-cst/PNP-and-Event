'use client';

import { useEffect, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Input, Select, Button, ActionIcon } from 'rizzui';
import { PiPlusBold, PiTrashBold } from 'react-icons/pi';
import FormGroup from '@/app/shared/form-group';
import { CreateEventInput } from '@/validators/NEW/create-event.schema';
import cn from '@core/utils/class-names';
import { formatPrice } from '@/config/format-pricing';

const standardElementsFromBackend = [
  { name: 'Stage Setup', rate: 5000 },
  { name: 'LED Screen', rate: 12000 },
  { name: 'Sound System', rate: 8000 },
];

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

  const handleAdd = () => {
    if (!selectedItem || quantity < 1) return;

    append({
      standardElementName: selectedItem.name,
      quantity,
      standardRate: selectedItem.rate,
      total: selectedItem.rate * quantity,
    });

    setSelectedItem(null);
    setQuantity(1);
  };

  useEffect(() => {
    if (fields.length === 1 && !fields[0]?.standardElementName) {
      remove(0); // ✅ RHF-safe
    }
  }, [fields, remove]);
  return (
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
            options={standardElementsFromBackend.map((el) => ({
              label: `${el.name} - ₹${el.rate}`,
              value: el,
            }))}
            value={
              selectedItem
                ? {
                    label: `${selectedItem.name} - ₹${selectedItem.rate}`,
                    value: selectedItem,
                  }
                : null
            }
            onChange={(option) => setSelectedItem(option?.value)}
            displayValue={(option) => option?.label}
          />
        </div>

        <div className="col-span-4">
          <Input
            label="Quantity"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
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

      {/* Table */}
      {fields.length > 0 && (
        <div className="col-span-full mt-6 overflow-hidden rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Rate</th>
                <th className="p-3 text-left">Qty</th>
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
  );
}
