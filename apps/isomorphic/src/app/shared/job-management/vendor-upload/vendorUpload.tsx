// components/modals/VendorUploadModal.tsx

import { Modal, Button, Select, FileInput, Title, ActionIcon } from 'rizzui';
import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';

interface VendorUploadModalProps {
  rowData: any;
  onClose: () => void;
}

export default function VendorUploadModal({
  rowData,
  onClose,
}: VendorUploadModalProps) {
  const [vendor, setVendor] = useState<string | null>(null);
  const [quotationFile, setQuotationFile] = useState<File | null>(null);
  const [emailFile, setEmailFile] = useState<File | null>(null);

  const handleSubmit = () => {
    if (!vendor) {
      alert('Please select vendor');
      return;
    }

    const formData = new FormData();
    formData.append('vendor', vendor);
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
          Add Rate
        </Title>
        <ActionIcon size="sm" variant="text" onClick={onClose}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>
      <div className="space-y-4">
        {/* Vendor Selection */}
        <Select
          label="Select Vendor"
          options={[
            { label: 'Vendor A', value: 'vendorA' },
            { label: 'Vendor B', value: 'vendorB' },
          ]}
          value={vendor}
          onChange={(value: string) => setVendor?.(value || 'vendorA')}
          placeholder="Choose vendor"
        />

        {/* Excel Upload */}
        <FileInput
          label="Upload Quotation (Excel)"
          accept=".xlsx,.xls"
          onChange={(file: unknown) => {
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
          onChange={(file: unknown) => {
            if (file instanceof File) {
              setEmailFile(file);
            } else {
              setEmailFile(null);
            }
          }}
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

// {/* <Modal isOpen onClose={onClose} title="Add Vendor">
//       <div className="space-y-4">
//         {/* Vendor Selection */}
//         <Select
//           label="Select Vendor"
//           options={[
//             { label: 'Vendor A', value: 'vendorA' },
//             { label: 'Vendor B', value: 'vendorB' },
//           ]}
//           value={vendor}
//           onChange={(value) => setVendor(value)}
//           placeholder="Choose vendor"
//         />

//         {/* Excel Upload */}
//         <FileInput
//           label="Upload Quotation (Excel)"
//           accept=".xlsx,.xls"
//           onChange={(file) => setQuotationFile(file)}
//         />

//         {/* JPG / PDF Upload */}
//         <FileInput
//           label="Upload Email File (JPG / PDF)"
//           accept=".jpg,.jpeg,.png,.pdf"
//           onChange={(file) => setEmailFile(file)}
//         />

//         <div className="flex justify-end gap-3 pt-3">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit}>Submit</Button>
//         </div>
//       </div>
//     </Modal> */}
