import { JobViewType } from '@/data/jobpnp-data';
import { useState } from 'react';
import { Text } from 'rizzui/typography';

type Props = {
  job: JobViewType;
};

export default function JobSpecifications({ job }: Props) {
  const spec = job.specifications;
  const [activeTab, setActiveTab] = useState<string>('0');

  return (
    <div className="space-y-6">
      <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <Text className="text-lg font-bold">Division Specifications</Text>
        {/* Main Spec Card */}
        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
          {job.divisions.map((division, index) => (
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
              <strong>Size:</strong> {spec.size}
            </p>
            <p>
              <strong>Paper:</strong> {spec.paper}
            </p>
            <p>
              <strong>Colour:</strong> {spec.colour}
            </p>
            <p>
              <strong>Budget:</strong> {spec.budget ? `₹ ${spec.budget}` : '-'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
            <p>
              <strong>Lamination:</strong> {spec.lamination ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Matt:</strong> {spec.matt ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Gloss:</strong> {spec.gloss ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Front:</strong> {spec.front ? 'Yes' : 'No'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
            <p>
              <strong>Back:</strong> {spec.back ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>UV:</strong> {spec.uv ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>V.AID (B2B):</strong> {spec.vaidB2B ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>H.Bound:</strong> {spec.hBound ? 'Yes' : 'No'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
            <p>
              <strong>Spiral:</strong> {spec.spiral ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Wiro Wire:</strong> {spec.wiroWire ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Indexing:</strong> {spec.indexing ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Foil:</strong> {spec.foil ? 'Yes' : 'No'}
            </p>
          </div>

          {spec.otherLamination && (
            <p className="text-sm">
              <strong>Other Lamination:</strong> {spec.otherLamination}
            </p>
          )}
        </div>

        {/* Printing Instructions */}
        <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
          <Text className="text-base font-semibold">Printing Instructions</Text>
          <ul className="ml-6 list-decimal space-y-1">
            {job.printingInstructions.map((instruction, index) => (
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
          <Text className="text-base font-semibold">Gifting Instructions</Text>
          <ul className="ml-6 list-decimal space-y-1">
            {job.printingInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
        <Text className="text-lg font-bold">Packing Details</Text>
        <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-6">
          {job.packingType.map((packing, index) => (
            <p className="text-sm" key={index}>
              <strong>{packing}</strong>
            </p>
          ))}
          <p>
            <strong>Total Qty:</strong> 1000
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
        <Text className="text-lg font-bold">Sample FIles</Text>
        <div className="flex gap-6 border-b text-sm font-medium">
          {[
            {
              key: '0',
              label: 'Sample 1',
            },
            {
              key: '1',
              label: 'Sample 2',
            },
            {
              key: '2',
              label: 'Sample 3',
            },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`pb-3 ${
                activeTab === tab.key
                  ? 'border-b-2 border-black font-semibold text-black'
                  : 'text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === '0' && (
          <Text>Sample Image or PDF will be displayed here.</Text>
        )}
        {activeTab === '1' && (
          <Text>Sample Image or PDF will be displayed here.</Text>
        )}
        {activeTab === '2' && (
          <Text>Sample Image or PDF will be displayed here.</Text>
        )}
      </div>
    </div>
  );
}
