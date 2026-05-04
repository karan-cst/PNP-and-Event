'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { CheckboxGroup, Checkbox, Input, Select, Text, Textarea } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Inquiry({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const session = useSession();
  const role = session.data?.user.role;
  const [activeTab, setActiveTab] = useState<string>('0');
  return (
    <>
      <FormGroup
        title="Inquiry"
        description="Add inquiry details here."
        className={cn(className)}
      >
        {/* Input Name */}
        <Input
          label="Input Name"
          placeholder="Enter input name"
          {...register('inputName')}
          error={errors?.inputName?.message as string}
        />

        {/* Quantity */}
        <Input
          type="number"
          label="Qty"
          placeholder="Enter quantity"
          {...register('qty')}
          error={errors?.qty?.message as string}
        />

        {/* Budget */}
        <Input
          type="number"
          label="Client Budget"
          placeholder="Enter budget"
          {...register('budget')}
          error={errors?.budget?.message as string}
        />

        <Controller
          name={`division`}
          control={control}
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <Select
              label="Division"
              dropdownClassName="h-auto"
              placeholder="Division..."
              searchable
              clearable
              onClear={() => onChange('')}
              options={[{ label: 'Arron', value: 'Arron' }]}
              onChange={onChange}
              value={value}
              getOptionValue={(option) => option.value}
              displayValue={(selected) =>
                [{ label: 'Arron', value: 'Arron' }]?.find(
                  (r) => r.value === selected
                )?.label ?? ''
              }
              error={errors?.role?.message as string}
            />
          )}
        />

        {/* CS Name */}
        <Input
          label="CS Name"
          placeholder="Enter CS name"
          {...register('csName')}
          error={errors?.csName?.message as string}
        />

        {/* Delivery Timeline */}

        {/* Delivery Place */}
        <Input
          label="Delivery Place"
          placeholder="Enter delivery place"
          {...register('deliveryPlace')}
          error={errors?.deliveryPlace?.message as string}
        />
        <Controller
          name="deliveryTimeline"
          control={control}
          render={({ field: { value, onChange, onBlur }, fieldState }) => (
            <DatePicker
              inputProps={{ label: 'Delivery Timeline' }}
              placeholderText="Select delivery date"
              dateFormat="dd/MM/yyyy"
              selected={value}
              onChange={onChange}
              onBlur={onBlur}
              error={fieldState.error?.message}
            />
          )}
        />
        <Input
          label="End User"
          placeholder="Enter end user"
          {...register('endUserOfGift')}
          error={errors?.endUserOfGift?.message as string}
        />
        {/* Customized */}
        <Controller
          name="customized"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex flex-col gap-2">
              <Text className="font-medium">Design</Text>
              <Checkbox
                value={value}
                checked={value}
                onChange={onChange}
                label="Customized"
              />
            </div>
          )}
        />

        <Controller
          name="jobType"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="col-span-1 flex flex-col gap-2">
              <Text className="font-medium">Job Type</Text>
              <CheckboxGroup
                values={value || []}
                setValues={onChange}
                className="flex flex-row items-center gap-4"
              >
                <Checkbox label="Print" value="print" />
                <Checkbox label="Gift" value="gift" />
              </CheckboxGroup>
            </div>
          )}
        />

        {/* Special Instructions */}
        <Textarea
          label="Special Instructions / Brief"
          placeholder="Add any special instructions"
          className="col-span-full"
          {...register('specialInstructions')}
          error={errors?.specialInstructions?.message as string}
        />

        {/* End User */}
        {role == 'printMng' && (
          <>
            <div className="col-span-full">
              <h4 className="text-base font-medium">Print Manager Approval</h4>
              <p className="mt-2">Budget Send for this inquiry with remarks</p>
            </div>
            <Input type="number" label="Budget" placeholder="Enter budget" />
            <Input
              label="Remarks"
              placeholder="Remarks"
              className="col-span-2"
            />
          </>
        )}
      </FormGroup>

      <div className="mt-6 space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
        <Text className="text-lg font-bold">Sample FIles</Text>
        <div className="flex gap-6 border-b text-sm font-medium">
          {[
            {
              key: '0',
              label: 'Sample 1',
            },
            {
              key: '1',
              label: 'Sample 2',
            },
            {
              key: '2',
              label: 'Sample 3',
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 ${
                activeTab === tab.key
                  ? 'border-b-2 border-black font-semibold text-black'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === '0' && (
          <Text>Sample Image or PDF will be displayed here.</Text>
        )}
        {activeTab === '1' && (
          <Text>Sample Image or PDF will be displayed here.</Text>
        )}
        {activeTab === '2' && (
          <Text>Sample Image or PDF will be displayed here.</Text>
        )}
      </div>
    </>
  );
}
