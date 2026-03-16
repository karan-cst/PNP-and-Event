'use client';

import { useMemo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Select } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import { CreateEventInput } from '@/validators/NEW/create-event.schema';
import cn from '@core/utils/class-names';

type Option = {
  label: string;
  value: string;
};
const companies = [{ id: '1', name: 'Intas', isPharma: true }];
const companyOptions: Option[] = companies.map((c) => ({
  label: c.name,
  value: c.id,
}));

const divisionOptions: Option[] = [
  { label: 'Arron', value: 'Arron' },
  { label: 'Altis', value: 'Altis' },
];
const clientOptions: Option[] = [
  { label: 'Rahul Sharma', value: 'DC001' },
  { label: 'Sachin Patel', value: 'DC002' },
];
const priorityOptions: Option[] = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];

export default function EventClient({ className }: { className?: string }) {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<CreateEventInput>();

  const selectedClientId = watch('company.companyId');

  // Find selected client
  const selectedClient = useMemo(
    () => companies.find((c) => c.id === selectedClientId),
    [selectedClientId]
  );

  const isPharma = selectedClient?.isPharma;

  return (
    <FormGroup
      title="Client"
      description="Select client and division if applicable."
      className={cn(className)}
    >
      {/* Client Dropdown */}
      <Controller
        name="company.companyId"
        control={control}
        render={({ field: { value, onChange }, fieldState }) => (
          <Select
            label="Client"
            options={companyOptions}
            value={companyOptions.find((opt) => opt.value === value) ?? null}
            onChange={(option: Option) => onChange(option?.value)}
            displayValue={(option: Option) => option?.label}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* Division only if Pharma */}
      <Controller
        name="company.divisionName"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            label="Division"
            options={divisionOptions}
            value={
              divisionOptions.find((opt) => opt.value === field.value) ?? null
            }
            onChange={(option: Option) => field.onChange(option?.value)}
            displayValue={(option: Option) => option?.label}
            error={fieldState.error?.message}
          />
        )}
      />
      <Controller
        name="company.client"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            label="Client"
            options={clientOptions}
            value={
              clientOptions.find((opt) => opt.value === field.value) ?? null
            }
            onChange={(option: Option) => field.onChange(option?.value)}
            displayValue={(option: Option) => option?.label}
            error={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            label="Priority"
            options={priorityOptions}
            value={
              priorityOptions.find((opt) => opt.value === field.value) ?? null
            }
            onChange={(option: Option) => field.onChange(option?.value)}
            displayValue={(option: Option) => option?.label}
            error={fieldState.error?.message}
          />
        )}
      />
    </FormGroup>
  );
}
