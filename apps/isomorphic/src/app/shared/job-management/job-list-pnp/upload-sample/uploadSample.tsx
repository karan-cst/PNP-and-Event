'use client';

import { useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { Button, FileInput, Text, Title } from 'rizzui';
import cn from '@core/utils/class-names';
import { Form } from '@core/ui/form';
import {
  GiftInquiryFormType,
  giftInquirySchema,
} from '@/validators/NEW/create-enquiry.schema';
import Image from 'next/image';

// a reusable form wrapper component
function HorizontalFormBlockWrapper({
  title,
  description,
  children,
  className,
  isModalView = true,
}: React.PropsWithChildren<{
  title: string;
  description?: string;
  className?: string;
  isModalView?: boolean;
}>) {
  return (
    <div
      className={cn(
        className,
        isModalView ? '@5xl:grid @5xl:grid-cols-6' : ' '
      )}
    >
      {isModalView && (
        <div className="col-span-2 mb-6 pe-4 @5xl:mb-0">
          <Title as="h6" className="font-semibold">
            {title}
          </Title>
          <Text className="mt-1 text-sm text-gray-500">{description}</Text>
        </div>
      )}

      <div
        className={cn(
          'grid grid-cols-2 gap-3 @lg:gap-4 @2xl:gap-5',
          isModalView ? 'col-span-4' : ' '
        )}
      >
        {children}
      </div>
    </div>
  );
}

// main category form component for create and update category
export default function UploadSample({
  id,
  isModalView = true,
}: {
  id?: string;
  isModalView?: boolean;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [reset, setReset] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleFileChange = (fileList: FileList | null) => {
    if (!fileList) return;

    const newFiles = Array.from(fileList);

    if (files.length + newFiles.length > 3) {
      alert('Maximum 3 files allowed');
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const onSubmit: SubmitHandler<GiftInquiryFormType> = (data) => {
    // set timeout ony required to display loading state of the create category button
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setReset({});
    }, 600);
  };

  return (
    <Form<GiftInquiryFormType>
      validationSchema={giftInquirySchema}
      resetValues={reset}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: undefined,
      }}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, getValues, setValue, formState: { errors } }) => (
        <>
          <div className="flex-grow pb-10">
            <div
              className={cn(
                'grid grid-cols-1',
                isModalView
                  ? 'grid grid-cols-1 gap-8 divide-y divide-dashed divide-gray-200 @2xl:gap-10 @3xl:gap-12 [&>div]:pt-7 first:[&>div]:pt-0 @2xl:[&>div]:pt-9 @3xl:[&>div]:pt-11'
                  : 'gap-5'
              )}
            >
              <HorizontalFormBlockWrapper
                title="Division Information"
                description="Basic division details"
                isModalView={isModalView}
              >
                <Controller
                  name="samples"
                  control={control}
                  render={({ field }) => (
                    <FileInput
                      label="Upload Sample Files (Max 3)"
                      accept=".jpg,.jpeg,.png,.pdf"
                      multiple
                      onChange={(e) => {
                        const selectedFiles = e?.target?.files;
                        handleFileChange(selectedFiles);
                        field.onChange(selectedFiles);
                      }}
                    />
                  )}
                />
              </HorizontalFormBlockWrapper>
              <div className="col-span-2 mt-2 flex flex-wrap gap-3">
                {files.map((file, index) => {
                  const fileUrl = URL.createObjectURL(file);
                  const isImage = file.type.startsWith('image');

                  return (
                    <div
                      key={index}
                      className="relative h-20 w-20 overflow-hidden rounded border"
                    >
                      {isImage ? (
                        <Image
                          src={fileUrl}
                          alt="preview"
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <iframe src={fileUrl} className="h-full w-full" />
                      )}

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => {
                          setFiles((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute right-0 top-0 bg-black px-1 text-xs text-white"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* z-40   */}
          <div
            className={cn(
              'sticky bottom-0 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
              isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
            )}
          >
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto"
            >
              Upload Sample
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
