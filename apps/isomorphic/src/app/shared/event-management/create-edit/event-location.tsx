'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Button, Flex, Input, Select } from 'rizzui';
import cn from '@core/utils/class-names';
import FormGroup from '@/app/shared/form-group';
import { cityOption, stateOption } from './form-utils';
import { CreateEventInput } from '@/validators/NEW/create-event.schema';
import { CreateCitytierModalView } from '../../event-master/city-tier/citytier-page-header';
import { useModal } from '../../modal-views/use-modal';
import { PiPlusBold } from 'react-icons/pi';

export default function EventLocation({ className }: { className?: string }) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<CreateEventInput>();
  console.log('errors', errors);
  const { openModal } = useModal();
  return (
    <>
      <FormGroup
        title="Location"
        description="Add event location with their city and full address."
        className={cn(className)}
      >
        <Input
          label="Address line 1"
          placeholder="Address line 1"
          className="col-span-full"
          {...register('location.addressLine1')}
          error={errors?.location?.addressLine1?.message}
        />
        <Input
          label="Address line 2"
          placeholder="Address line 2"
          className="col-span-full"
          {...register('location.addressLine2')}
          error={errors?.location?.addressLine2?.message}
        />
        <Input
          label="pincode"
          placeholder="pincode"
          {...register('location.pincode')}
          error={errors?.location?.pincode?.message}
        />
        <Controller
          name="location.state"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              dropdownClassName="h-auto"
              options={stateOption}
              value={value}
              onChange={onChange}
              label="State"
              error={errors?.location?.state?.message}
              getOptionValue={(option) => option.value}
            />
          )}
        />
        <Controller
          name="location.city"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              dropdownClassName="h-auto"
              options={cityOption}
              value={value}
              onChange={onChange}
              label="City"
              error={errors?.location?.city?.message}
              getOptionValue={(option) => option.value}
            />
          )}
        />
      </FormGroup>
      <Flex align="center" justify="end" gap="4">
        <Button
          as="span"
          className="mt-4 w-[50%] cursor-pointer @md:mt-2 @lg:w-auto"
          onClick={() =>
            openModal({
              view: <CreateCitytierModalView />,
              customSize: 720,
            })
          }
        >
          ADD NEW CITY
          {/* <PiPlusBold className="h-[17px] w-[17px]" /> */}
        </Button>
      </Flex>
    </>
  );
}
