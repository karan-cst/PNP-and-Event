'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Checkbox, Input, Select, Textarea } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { DatePicker } from '@core/ui/datepicker';

export default function Inquiry({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Gifting Inquiry"
      description="Add gifting inquiry details here."
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
        label="Budget"
        placeholder="Enter budget"
        {...register('budget')}
        error={errors?.budget?.message as string}
      />

      {/* Division */}
      <Input
        label="Division"
        placeholder="Enter division"
        {...register('division')}
        error={errors?.division?.message as string}
      />

      {/* CS Name */}
      <Input
        label="CS Name"
        placeholder="Enter CS name"
        {...register('csName')}
        error={errors?.csName?.message as string}
      />

      {/* Delivery Timeline */}
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

      {/* Delivery Place */}
      <Input
        label="Delivery Place"
        placeholder="Enter delivery place"
        {...register('deliveryPlace')}
        error={errors?.deliveryPlace?.message as string}
      />
      <Input
        label="End User of Gift"
        placeholder="Enter end user"
        {...register('endUserOfGift')}
        error={errors?.endUserOfGift?.message as string}
      />
      {/* Customized */}
      <Controller
        name="customized"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            label="Customized"
          />
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
    </FormGroup>
  );
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
