import { JobFormDataType, JobViewType } from '@/data/jobpnp-data';
import React, { useState } from 'react';
import { Text } from 'rizzui/typography';
import VendorsTable from '../vendorTable';
import VendorsPNPTable from '../job-view/vendorView';
type Props = {
  job: JobFormDataType;
};
const JobDetailModal = ({ job }: Props) => {
  const spec = job.specifications;
  const [vendors, setVendors] = useState<any[]>([
    {
      id: 1,
      vendorName: 'ABC Technologies',
      name: 'Ankit Gandhi',
      total: 7500,
      price: 2.5,
      qty: 3000,
      emlFileUrl: '/uploads/xml/abc.xml',
      excelFileUrl: '/uploads/excel/abc.xlsx',
    },
    {
      id: 2,
      vendorName: 'Skyline Solutions',
      name: 'Karan Jain',
      total: 8250,
      price: 2.75,
      qty: 3000,
      emlFileUrl: '/uploads/xml/abc.xml',
      excelFileUrl: '/uploads/excel/abc.xlsx',
    },
    {
      id: 3,
      vendorName: 'Prime Event Services',
      name: 'Amulakh Mistry',
      total: 9000,
      price: 3,
      qty: 3000,
      emlFileUrl: '/uploads/xml/abc.xml',
      excelFileUrl: '/uploads/excel/abc.xlsx',
    },
  ]);
  return (
    <div>
      <div className="rounded-lg border bg-[#F1F1F1] p-6 shadow-sm">
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          {/* Left Side */}
          <div className="space-y-2">
            <p>
              <strong>Job Name:</strong> {job.jobName}
            </p>
            <p>
              <strong>Job Number:</strong> {job.jobNo}
            </p>
            <p>
              <strong>Created Date:</strong> {job.date}
            </p>
            <p>
              <strong>Name of Requisitioner:</strong> {job.requisitionerName}
            </p>
          </div>

          {/* Right Side */}
          <div className="space-y-2">
            <p>
              <strong>Type:</strong> {job.jobType}
            </p>
            <p>
              <strong>Delivery Date:</strong> {job.deliveryDate}
            </p>
            <p>
              <strong>Total Qty:</strong> {job.totalQty}
            </p>
            <p>
              <strong>Packing Qty:</strong> {job.packageQty}
            </p>
            <p>
              <strong>Master Packing Qty:</strong> {job.masterPackingQty}
            </p>
          </div>
          <div className="space-y-2">
            <p>
              <strong>Master Division:</strong> {job.masterDivision}
            </p>
            <p>
              <strong>GL Code:</strong> {job.glCode}
            </p>
            <p>
              <strong>HSN Code:</strong> {job.hsnCode}
            </p>
            <p>
              <strong>FInalized Vendor:</strong> ABC
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
          <Text className="text-lg font-bold">Division Specifications</Text>
          {/* Main Spec Card */}
          <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            {job.divisions?.map((division, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-6 text-sm md:grid-cols-5"
              >
                <p>
                  <strong>Division:</strong> {division.division}
                </p>
                <p>
                  <strong>SAP Code:</strong> {division.sapCode}
                </p>
                <p>
                  <strong>Qty:</strong> {division.Qty}
                </p>
                <p>
                  <strong>Delivery Location:</strong> {division.deliveryPlace}
                </p>
                <p>
                  <strong>Delivery Date:</strong> {division.deliveryDate}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
          <Text className="text-lg font-bold">Print Specifications</Text>
          {/* Main Spec Card */}
          <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
              <p>
                <strong>Size:</strong> {spec?.size}
              </p>
              <p>
                <strong>Paper:</strong> {spec?.paper}
              </p>
              <p>
                <strong>Colour:</strong> {spec?.colour}
              </p>
              <p>
                <strong>Budget:</strong>{' '}
                {spec?.budget ? `₹ ${spec.budget}` : '-'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
              <p>
                <strong>Lamination:</strong> {spec?.lamination ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Matt:</strong> {spec?.matt ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Gloss:</strong> {spec?.gloss ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Front:</strong> {spec?.front ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
              <p>
                <strong>Back:</strong> {spec?.back ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>UV:</strong> {spec?.uv ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>V.AID (B2B):</strong> {spec?.vaidB2B ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>H.Bound:</strong> {spec?.hBound ? 'Yes' : 'No'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
              <p>
                <strong>Spiral:</strong> {spec?.spiral ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Wiro Wire:</strong> {spec?.wiroWire ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Indexing:</strong> {spec?.indexing ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Foil:</strong> {spec?.foil ? 'Yes' : 'No'}
              </p>
            </div>

            {spec?.otherLamination && (
              <p className="text-sm">
                <strong>Other Lamination:</strong> {spec.otherLamination}
              </p>
            )}
          </div>

          {/* Printing Instructions */}
          <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
            <Text className="text-base font-semibold">
              Printing Instructions
            </Text>
            <ul className="ml-6 list-decimal space-y-1">
              {job.printingInstructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
          <Text className="text-lg font-bold">Gift Specifications</Text>
          {/* Main Spec Card */}
          <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
              <p>
                <strong> Gifting Type:</strong> Branded
              </p>
              <p>
                <strong>Logo Type:</strong> Logo
              </p>
              <p>
                <strong>Colour Type:</strong> Four Color
              </p>
              <p>
                <strong>Engrave Type:</strong> Engrave
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
              <p>
                <strong>Printing Type:</strong> Screen Printing
              </p>
            </div>
          </div>

          {/* Packing Details
            <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
              <h3 className="font-semibold">Packing Details</h3>
              <p>Bubble</p>
              <p>Polythin</p>
            </div> */}

          {/* Printing Instructions */}
          <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
            <Text className="text-base font-semibold">
              Gifting Instructions
            </Text>
            <ul className="ml-6 list-decimal space-y-1">
              {job.printingInstructions?.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
          <Text className="text-lg font-bold">Packing Details</Text>
          <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-5">
            {job.packingType?.map((packing, index) => (
              <p className="text-sm" key={index}>
                <strong>{packing}</strong>
              </p>
            ))}
            <p>
              <strong>Total Qty:</strong> 4000
            </p>
            <p>
              <strong>Packing Qty:</strong> 100
            </p>
            <p>
              <strong>Master Packing Qty:</strong> 10
            </p>
          </div>
        </div>

        <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
          <Text className="text-lg font-bold">Finalized Vendor</Text>
          <div className="grid grid-cols-6 gap-6 text-sm md:grid-cols-4">
            <p>
              <strong>Vendor Company:</strong> ABC Pvt Ltd
            </p>

            <p>
              <strong>Final Rate:</strong> Rs.2.00
            </p>

            <p>
              <strong>Total Quantity:</strong> 4000
            </p>
            <p>
              <strong>Total Amount:</strong> Rs.8000.00
            </p>
          </div>
        </div>

        <VendorsPNPTable vendors={vendors} />
      </div>
    </div>
  );
};

export default JobDetailModal;
