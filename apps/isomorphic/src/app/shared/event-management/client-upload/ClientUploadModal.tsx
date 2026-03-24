// components/modals/VendorUploadModal.tsx
'use client';
import {
  Modal,
  Button,
  Select,
  FileInput,
  Title,
  ActionIcon,
  Input,
} from 'rizzui';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { renderOptionDisplayValue } from '../../invoice/form-utils';

interface ClientUploadModalProps {
  rowData: any;
  onClose: () => void;
}

export default function ClientUploadModal({
  rowData,
  onClose,
}: ClientUploadModalProps) {
  const [client, setClient] = useState<string | null>(null);
  const [quotationFile, setQuotationFile] = useState<File | null>(null);
  const [emailFile, setEmailFile] = useState<File | null>(null);
  const [clientToal, setClientTotal] = useState<number | 0>(0);

  const handleSubmit = () => {
    if (!client) {
      alert('Please select vendor');
      return;
    }

    const formData = new FormData();
    formData.append('client', client);
    if (quotationFile) formData.append('quotationFile', quotationFile);
    if (emailFile) formData.append('emailFile', emailFile);
    formData.append('rowId', rowData._id);

    console.log('FormData Ready', formData);

    // call your API here

    onClose();
  };

  return (
    <div className="m-auto px-5 pb-8 pt-5 @lg:pt-6 @2xl:px-7">
      <div className="mb-7 flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Update Client
        </Title>
        <ActionIcon size="sm" variant="text" onClick={onClose}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="space-y-4">
        {/* Vendor Selection */}
        {/* <Select
          label="Select Client"
          options={[
            { label: 'Client A', value: 'clientA' },
            { label: 'Client B', value: 'clientB' },
          ]}
          value={client}
          getOptionDisplayValue={(option: { value: any }) =>
            renderOptionDisplayValue(option.value as string)
          }
          displayValue={(selected: string) =>
            renderOptionDisplayValue(selected)
          }
          onChange={(value: string) => setClient(value || 'clientA')}
          placeholder="Choose client"
        /> */}

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
        />
        <Input
          label="Cliet Total"
          type="number"
          value={clientToal}
          onChange={(e) => setClientTotal(Number(e.target.value) || 0)}
        />

        <div className="flex justify-end gap-3 pt-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
