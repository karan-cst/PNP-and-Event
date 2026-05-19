import { JobViewType } from '@/data/jobpnp-data';

type Props = {
  job: JobViewType;
};

export default function JobHeader({ job }: Props) {
  return (
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
            <strong>Created Date:</strong> {job.createdDate}
          </p>
          <p>
            <strong>Master Division:</strong> {job.masterDivision}
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
            <strong>Packing Qty:</strong> {job.packingQty}
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <strong>Master Packing Qty:</strong> {job.masterPackingQty}
          </p>
          <p>
            <strong>GL Code:</strong> {job.glCode}
          </p>
          <p>
            <strong>HSN Code:</strong> {job.hsnCode}
          </p>
          {/* <p>
            <strong>FInalized Vendor:</strong> ABC
          </p> */}
        </div>
      </div>
    </div>
  );
}
