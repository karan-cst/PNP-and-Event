'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { Element } from 'react-scroll';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { Text } from 'rizzui';
import cn from '@core/utils/class-names';
import FormFooter from '@core/components/form-footer';
import { useLayout } from '@/layouts/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import {
  CreateEventInput,
  eventFormSchema,
} from '@/validators/NEW/create-event.schema';

import { eventDefaultValues } from './form-utils';
import EventSummary from './event-summary';
import EventLocation from './event-location';
import FormNav, { formParts } from './form-nav';
import EventScope from './event-scope';
import EventClient from './event-client';
import EventElements from './event-element';

const MAP_STEP_TO_COMPONENT = {
  [formParts.summary]: EventSummary,
  [formParts.location]: EventLocation,
  [formParts.scope]: EventScope,
  [formParts.element]: EventElements,
  [formParts.client]: EventClient,
};

interface IndexProps {
  slug?: string;
  className?: string;
  event?: CreateEventInput;
}

export default function CreateEditEvent({
  slug,
  event,
  className,
}: IndexProps) {
  const { layout } = useLayout();
  const [isLoading, setLoading] = useState(false);
  const methods = useForm<CreateEventInput>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues(event),
  });

  const onSubmit: SubmitHandler<CreateEventInput> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('event_data', data);
      toast.success(
        <Text as="b">Event successfully {slug ? 'updated' : 'created'}</Text>
      );
      methods.reset();
    }, 600);
  };

  return (
    <div className="@container">
      <FormNav
        className={cn(
          layout === LAYOUT_OPTIONS.BERYLLIUM && 'z-[999] 2xl:top-[72px]'
        )}
      />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className={cn(
            'relative z-[19] [&_label.block>span]:font-medium',
            className
          )}
        >
          <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
            {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
              <Element
                key={key}
                name={formParts[key as keyof typeof formParts]}
              >
                {<Component className="pt-7 @2xl:pt-9 @3xl:pt-11" />}
              </Element>
            ))}
          </div>

          <FormFooter
            isLoading={isLoading}
            submitBtnText={slug ? 'Update Event' : 'Create Event'}
          />
        </form>
      </FormProvider>
    </div>
  );
}
