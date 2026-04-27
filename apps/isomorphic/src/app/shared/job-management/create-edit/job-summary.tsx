'use client';

import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import {
  ActionIcon,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Select,
  Text,
} from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';
import { useEffect } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useModal } from '../../modal-views/use-modal';
import { CreateClientModalView } from '../../pnp-master/client-management/division-page-header';

export default function JobSummary({ className }: { className?: string }) {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'divisions',
  });
  const divisions = useWatch({
    control,
    name: 'divisions',
  });
  useEffect(() => {
    const totalQty = divisions?.reduce(
      (total: number, division: any) => total + (Number(division?.Qty) || 0),
      0
    );

    setValue('totalQty', totalQty, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [divisions, setValue]);

  const masterDivision = watch('masterDivision');
  const sbuDivision = watch('sbuDivision');
  const { openModal, closeModal } = useModal();
  const Label = (
    <div className="flex items-center justify-between">
      <Text className="text-sm">Requisitioner Name</Text>
      <Text
        className="cursor-pointer !text-xs font-medium text-blue-600 transition hover:underline"
        onClick={() =>
          openModal({
            view: <CreateClientModalView />,
            customSize: 720,
          })
        }
      >
        Create Client
      </Text>
    </div>
  );

  return (
    <FormGroup
      title="Summary"
      description="Add basics of your job here."
      className={cn(className)}
    >
      <Input
        label="Job Name"
        placeholder="Job Name"
        {...register('jobName')}
        error={errors?.jobName?.message as string}
      />
      <Input
        label="Job No"
        placeholder="Job No"
        {...register('jobNo')}
        error={errors?.jobNo?.message as string}
      />
      <Controller
        name="company"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <Select
            dropdownClassName="h-auto"
            options={[
              { label: 'Intas', value: 'Intas' },
              { label: 'Sun Pharma', value: 'Sun Pharma' },
            ]}
            searchable
            clearable
            onClear={() => onChange('')}
            value={value}
            onChange={onChange}
            label="Company"
            error={errors?.role?.message as string}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              [
                { label: 'Intas', value: 'Intas' },
                { label: 'Sun Pharma', value: 'Sun Pharma' },
              ]?.find((r) => r.value === selected)?.label ?? ''
            }
            placeholder="Select Company..."
          />
        )}
      />
      <Controller
        name="sbuDivision"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <Select
            label="SBU Division"
            dropdownClassName="h-auto"
            placeholder="Select SBU..."
            searchable
            clearable
            onClear={() => onChange('')}
            disabled={!!masterDivision}
            options={[{ label: 'WHI', value: 'WHI' }]}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              [{ label: 'WHI', value: 'WHi' }]?.find(
                (r) => r.value === selected
              )?.label ?? 'Select SBU ...'
            }
            error={errors?.role?.message as string}
          />
        )}
      />
      <Controller
        name="masterDivision"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <Select
            label="Master Division"
            dropdownClassName="h-auto"
            placeholder="Select Division..."
            searchable
            clearable
            onClear={() => onChange('')}
            disabled={!!sbuDivision}
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
      <Controller
        name="requisitionerName"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <Select
            label={Label}
            labelClassName="text-sm font-medium text-gray-900"
            dropdownClassName="h-auto"
            placeholder="Select Client..."
            searchable
            clearable
            onClear={() => onChange('')}
            options={[{ label: 'Rahul Sharma', value: 'Rahul Sharma' }]}
            onChange={onChange}
            value={value}
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              [{ label: 'Rahul Sharma', value: 'Rahul Sharma' }]?.find(
                (r) => r.value === selected
              )?.label ?? 'Select Client...'
            }
            error={errors?.role?.message as string}
          />
        )}
      />
      <Controller
        name="date"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => (
          <DatePicker
            inputProps={{ label: 'Date' }}
            placeholderText="Job Date"
            dateFormat="dd/MM/yyyy"
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            error={fieldState.error?.message}
          />
        )}
      />
      <Input
        label="Floor"
        placeholder="Floor"
        {...register('floor')}
        error={errors?.floor?.message as string}
      />
      <Input
        label="Total Qty"
        placeholder="Total Qty"
        {...register('totalQty')}
        readOnly
        error={errors?.totalQty?.message as string}
      />
      <Input
        label="Package Qty"
        placeholder="Package Qty"
        {...register('packageQty')}
        error={errors?.packageQty?.message as string}
      />
      <Input
        label="Master Box Qty"
        placeholder="Master Box Qty"
        {...register('masterBoxQty')}
        error={errors?.masterBoxQty?.message as string}
      />
      <Controller
        name="jobType"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => {
          console.log('value', value);

          return (
            <div className="col-span-1 flex flex-col gap-2">
              <Text className="font-medium">Job Type</Text>
              <CheckboxGroup
                values={value}
                setValues={onChange}
                className="flex flex-row items-center gap-4"
              >
                <Checkbox label="Print" value="print" />
                <Checkbox label="Gift" value="gift" />
              </CheckboxGroup>
            </div>
          );
        }}
      />
      <Controller
        name="packingTypes"
        control={control}
        render={({ field: { value, onChange, onBlur }, fieldState }) => {
          console.log('fieldState', value, fieldState);
          return (
            <div className="col-span-2 flex flex-col gap-2">
              <Text className="font-medium">Packing Type</Text>
              <CheckboxGroup
                values={value || []}
                setValues={onChange}
                className="flex flex-row gap-5"
              >
                <Checkbox value="bubble" label="Bubble" />
                <Checkbox value="shrink" label="Shrink" />
                <Checkbox value="thermocol" label="Thermocol" />
                <Checkbox value="polythin" label="Polythin Pack" />
                <Checkbox value="bibo" label="BIBO" />
              </CheckboxGroup>

              {fieldState.error && (
                <Text className="text-sm text-red-500">
                  {fieldState.error.message}
                </Text>
              )}
            </div>
          );
        }}
      />
      <div className="col-span-full flex justify-end">
        <Button
          onClick={() =>
            append({
              division: '',
              sapCode: '',
              printsapCode: '',
              ccCode: '',
              Qty: 1,
              deliveryPlace: '',
            })
          }
        >
          +Add Division
        </Button>
      </div>

      <div className="col-span-full space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <Text
                key={field.id}
                className="mb-2 block text-lg font-bold text-gray-700"
              >
                Division {index + 1}
              </Text>
              <ActionIcon
                color="danger"
                variant="outline"
                disabled={fields.length === 1}
                onClick={() => remove(index)}
              >
                <MdDeleteOutline className="h-4 w-4" />
              </ActionIcon>
            </div>

            <div key={field.id}>
              {/* inner grid */}
              <div className="grid grid-cols-1 gap-6 @2xl:grid-cols-6 @3xl:grid-cols-6">
                {/* <Input
                  label="Division"
                  {...register(`divisions.${index}.division`)}
                /> */}
                <Controller
                  name={`divisions.${index}.division`}
                  control={control}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState,
                  }) => (
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

                <Input
                  label="SAP Code"
                  {...register(`divisions.${index}.sapCode`)}
                />

                <Input
                  label="CC Code"
                  {...register(`divisions.${index}.ccCode`)}
                />
                <Input
                  type="number"
                  label="Qty"
                  {...register(`divisions.${index}.Qty`)}
                />
                {/* <Input
                  label="Delivery Place"
                  {...register(`divisions.${index}.deliveryPlace`)}
                /> */}
                <Controller
                  name={`divisions.${index}.deliveryPlace`}
                  control={control}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState,
                  }) => (
                    <Select
                      label="Delivery Place"
                      dropdownClassName="h-auto"
                      placeholder="Delivery Place..."
                      searchable
                      clearable
                      onClear={() => onChange('')}
                      options={[{ label: 'Matoda', value: 'Matoda' }]}
                      onChange={onChange}
                      value={value}
                      getOptionValue={(option) => option.value}
                      displayValue={(selected) =>
                        [{ label: 'Matoda', value: 'Matoda' }]?.find(
                          (r) => r.value === selected
                        )?.label ?? 'Delivery Place...'
                      }
                      error={errors?.role?.message as string}
                    />
                  )}
                />
                <Controller
                  name="deliveryDate"
                  control={control}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState,
                  }) => (
                    <DatePicker
                      inputProps={{ label: 'Date' }}
                      placeholderText="Delivery Date"
                      dateFormat="dd/MM/yyyy"
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </FormGroup>
  );
}
