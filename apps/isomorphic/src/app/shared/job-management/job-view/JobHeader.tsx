import { JobViewType } from '@/data/jobpnp-data';

type Props = {
  job: JobViewType;
};

export default function JobHeader({ job }: Props) {
  return (
    <div className="rounded-lg border bg-[#F1F1F1] p-6 shadow-sm">
      <div className="grid grid-cols-2 gap-6 text-sm">
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
            <strong>Type:</strong> {job.jobType}
          </p>
          <p>
            <strong>Delivery Location:</strong> {job.deliveryLocation}
          </p>
        </div>

        {/* Right Side */}
        <div className="space-y-2">
          <p>
            <strong>CC Code:</strong> {job.ccCode}
          </p>
          <p>
            <strong>HSN Code:</strong> {job.hsnCode}
          </p>
          <p>
            <strong>SAP Code:</strong> {job.sapCode}
          </p>
          <p>
            <strong>GL Code:</strong> {job.glCode}
          </p>
          <p>
            <strong>Delivery Date:</strong> {job.deliveryDate}
          </p>
        </div>
      </div>
    </div>
  );
}
