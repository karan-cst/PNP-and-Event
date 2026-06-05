// components/modals/VendorUploadModal.tsx
'use client';
import { Button, FileInput, Title, ActionIcon } from 'rizzui';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';

interface ClientUploadModalProps {
  id: number; // Assuming you need an ID to associate the upload with a specific event or client
}

export default function ClientUploadModal({ id }: ClientUploadModalProps) {
  const [client, setClient] = useState<string | null>(null);
  const [quotationFile, setQuotationFile] = useState<File | null>(null);
  const [emailFile, setEmailFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!client) {
      alert('Please select client');
      return;
    }

    const formData = new FormData();
    formData.append('client', client);
    if (quotationFile) formData.append('quotationFile', quotationFile);
    if (emailFile) formData.append('emailFile', emailFile);
    formData.append('rowId', String(id));

    console.log('FormData Ready', formData);

    // call your API here
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Update Client
        </Title>
      </div>
      <div className="space-y-4 md:flex md:items-center md:gap-4">
        {/* Excel Upload */}
        <FileInput
          label="Upload Quotation (Excel)"
          accept=".xlsx,.xls"
          onChange={(file) => {
            if (file instanceof File) {
              setQuotationFile(file);
            } else {
              setQuotationFile(null);
            }
          }}
        />

        {/* JPG / PDF Upload */}
        <FileInput
          label="Upload Email File (JPG / PDF)"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={(file) => {
            if (file instanceof File) {
              setEmailFile(file);
            } else {
              setEmailFile(null);
            }
          }}
          className="mt-4 md:!mt-0"
        />
        <div className="flex justify-end gap-3">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
