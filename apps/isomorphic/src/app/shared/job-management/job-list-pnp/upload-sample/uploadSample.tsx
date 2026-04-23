'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
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
type PreviewItem = { file: File; url: string; isImage: boolean };
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
                <div className="col-span-2 flex items-center justify-between">
                  <Controller
                    name="samples"
                    control={control}
                    render={({ field }) => (
                      <FileInput
                        label="Upload Sample Files"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          const selectedFiles = e?.target?.files;
                          handleFileChange(selectedFiles);
                          field.onChange(selectedFiles);
                        }}
                      />
                    )}
                  />
                  {files.length > 0 && (
                    <div
                      key={0}
                      className="relative h-20 w-20 overflow-hidden rounded border"
                    >
                      {files[0]?.type?.startsWith('image') ? (
                        <Image
                          src={URL.createObjectURL(files[0])}
                          alt="preview"
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <iframe
                          src={URL.createObjectURL(files[0])}
                          className="h-full w-full"
                        />
                      )}

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => {
                          setFiles((prev) => prev.filter((_, i) => i !== 0));
                        }}
                        className="absolute right-0 top-0 bg-black px-1 text-xs text-white"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  <Controller
                    name="samples"
                    control={control}
                    render={({ field }) => (
                      <FileInput
                        label="Upload Sample Files"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          const selectedFiles = e?.target?.files;
                          handleFileChange(selectedFiles);
                          field.onChange(selectedFiles);
                        }}
                      />
                    )}
                  />
                  {files.length > 1 && (
                    <div
                      key={1}
                      className="relative h-20 w-20 overflow-hidden rounded border"
                    >
                      {files[1]?.type?.startsWith('image') ? (
                        <Image
                          src={URL.createObjectURL(files[1])}
                          alt="preview"
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <iframe
                          src={URL.createObjectURL(files[1])}
                          className="h-full w-full"
                        />
                      )}

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => {
                          setFiles((prev) => prev.filter((_, i) => i !== 1));
                        }}
                        className="absolute right-0 top-0 bg-black px-1 text-xs text-white"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  <Controller
                    name="samples"
                    control={control}
                    render={({ field }) => (
                      <FileInput
                        label="Upload Sample Files"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          const selectedFiles = e?.target?.files;
                          handleFileChange(selectedFiles);
                          field.onChange(selectedFiles);
                        }}
                      />
                    )}
                  />
                  {files.length > 2 && (
                    <div
                      key={2}
                      className="relative h-20 w-20 overflow-hidden rounded border"
                    >
                      {files[2]?.type?.startsWith('image') ? (
                        <Image
                          src={URL.createObjectURL(files[2])}
                          alt="preview"
                          width={200}
                          height={200}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <iframe
                          src={URL.createObjectURL(files[2])}
                          className="h-full w-full"
                        />
                      )}

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => {
                          setFiles((prev) => prev.filter((_, i) => i !== 2));
                        }}
                        className="absolute right-0 top-0 bg-black px-1 text-xs text-white"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </HorizontalFormBlockWrapper>
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
{
  /* <div className="col-span-2 mt-2 flex flex-wrap gap-3">
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
              </div> */
}

// export default function UploadSample({
//   id,
//   isModalView = true,
// }: {
//   id?: string;
//   isModalView?: boolean;
// }) {
//   // 3 fixed slots
//   const [files, setFiles] = useState<(File | null)[]>([null, null, null]);

//   // to reset individual inputs after remove/replace (lets user re-pick same file)
//   const [inputKeys, setInputKeys] = useState([0, 0, 0]);

//   // keep old object URLs so we can revoke them
//   const urlsRef = useRef<(string | null)[]>([null, null, null]);

//   const previews = useMemo(() => {
//     return files.map((f, idx) => {
//       // revoke previous url if file changed
//       if (urlsRef.current[idx]) {
//         URL.revokeObjectURL(urlsRef.current[idx]!);
//         urlsRef.current[idx] = null;
//       }
//       if (!f) return null;

//       const url = URL.createObjectURL(f);
//       urlsRef.current[idx] = url;

//       return { url, isImage: f.type.startsWith('image/'), type: f.type };
//     });
//   }, [files]);

//   useEffect(() => {
//     return () => {
//       // cleanup all urls on unmount
//       urlsRef.current.forEach((u) => u && URL.revokeObjectURL(u));
//     };
//   }, []);

//   const onSubmit: SubmitHandler<GiftInquiryFormType> = async (data) => {
//     // data.samples will be [File|null, File|null, File|null]
//     // upload however you want (FormData recommended)
//   };

//   const replaceFileAtIndex = (index: number, fileList: FileList | null) => {
//     const file = fileList?.[0] ?? null; // slot takes only 1 file
//     setFiles((prev) => {
//       const next = [...prev];
//       next[index] = file;
//       return next;
//     });
//   };

//   const removeFileAtIndex = (index: number) => {
//     setFiles((prev) => {
//       const next = [...prev];
//       next[index] = null;
//       return next;
//     });
//     setInputKeys((prev) => {
//       const next = [...prev];
//       next[index] = next[index] + 1;
//       return next;
//     });
//   };

//   return (
//     <Form<GiftInquiryFormType>
//       validationSchema={giftInquirySchema}
//       onSubmit={onSubmit}
//       useFormProps={{
//         mode: 'onChange',
//         defaultValues: {
//           // IMPORTANT: so modal reopen can show existing if you keep form state outside
//           samples: [null, null, null],
//         } as any,
//       }}
//       className="isomorphic-form flex flex-grow flex-col @container"
//     >
//       {({ control, setValue }) => (
//         <>
//           <div className="flex-grow pb-10">
//             <HorizontalFormBlockWrapper
//               title="Division Information"
//               description="Basic division details"
//               isModalView={isModalView}
//             >
//               <div className="col-span-2 grid gap-4">
//                 {[0, 1, 2].map((index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between gap-4"
//                   >
//                     <Controller
//                       name={`samples.${index}` as any}
//                       control={control}
//                       render={({ field }) => (
//                         <FileInput
//                           key={inputKeys[index]}
//                           label={`Upload Sample ${index + 1}`}
//                           accept=".jpg,.jpeg,.png,.pdf"
//                           onChange={(e) => {
//                             const list = e.target.files;
//                             replaceFileAtIndex(index, list);

//                             const picked = list?.[0] ?? null;
//                             field.onChange(picked);

//                             // keep RHF array in sync (optional but nice)
//                             setValue(`samples.${index}` as any, picked, {
//                               shouldValidate: true,
//                               shouldDirty: true,
//                             });

//                             // allow picking same file again
//                             e.target.value = '';
//                           }}
//                         />
//                       )}
//                     />

//                     <div className="relative h-20 w-20 overflow-hidden rounded border">
//                       {files[index] ? (
//                         previews[index]?.isImage ? (
//                           <Image
//                             src={previews[index]!.url}
//                             alt={`preview-${index}`}
//                             width={200}
//                             height={200}
//                             className="h-full w-full object-cover"
//                           />
//                         ) : (
//                           <iframe
//                             src={previews[index]!.url}
//                             className="h-full w-full"
//                           />
//                         )
//                       ) : (
//                         <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
//                           Empty
//                         </div>
//                       )}

//                       {files[index] && (
//                         <button
//                           type="button"
//                           onClick={() => removeFileAtIndex(index)}
//                           className="absolute right-0 top-0 bg-black px-1 text-xs text-white"
//                         >
//                           ✕
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </HorizontalFormBlockWrapper>
//           </div>

//           <div
//             className={cn(
//               'sticky bottom-0 flex items-center justify-end gap-3 bg-gray-0/10 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col',
//               isModalView ? '-mx-10 -mb-7 px-10 py-5' : 'py-1'
//             )}
//           >
//             <Button type="submit" className="w-full @xl:w-auto">
//               Upload Sample
//             </Button>
//           </div>
//         </>
//       )}
//     </Form>
//   );
// }
