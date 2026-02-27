import { JobViewType } from '@/data/jobpnp-data';

type Props = {
  job: JobViewType;
};

export default function JobSpecifications({ job }: Props) {
  const spec = job.specifications;

  return (
    <div className="space-y-6">
      {/* Main Spec Card */}
      <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <div className="grid grid-cols-4 gap-6 text-sm">
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

        <div className="grid grid-cols-4 gap-6 text-sm">
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

        <div className="grid grid-cols-4 gap-6 text-sm">
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

        <div className="grid grid-cols-4 gap-6 text-sm">
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

      {/* Packing Details */}
      <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
        <h3 className="font-semibold">Packing Details</h3>
        <p>
          <strong>Shrink Pack:</strong> {job.packingDetails?.shrinkPack || '-'}
        </p>
        <p>
          <strong>BIBO Pack:</strong> {job.packingDetails?.biboPack || '-'}
        </p>
      </div>

      {/* Printing Instructions */}
      <div className="space-y-2 rounded-lg border bg-white p-6 text-sm shadow-sm">
        <h3 className="font-semibold">Printing Instructions</h3>
        <ul className="ml-6 list-decimal space-y-1">
          {job.printingInstructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
