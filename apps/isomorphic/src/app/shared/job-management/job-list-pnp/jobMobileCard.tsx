import { formatPrice } from '@/config/format-pricing';
import { JobFormDataType } from '@/data/jobpnp-data';
import { Badge } from 'rizzui/badge';
import { Text } from 'rizzui/typography';

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null;
  return (
    <Badge
      variant="flat"
      size="sm"
      className="rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-600"
    >
      {status}
    </Badge>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <Text className="shrink-0 text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </Text>
      <div className="text-right text-sm text-gray-900">{children}</div>
    </div>
  );
}

function ApproverBlock({
  label,
  name,
  status,
  date,
  cost,
}: {
  label: string;
  name?: string;
  status?: string;
  date?: string;
  cost?: number;
}) {
  return (
    <Row label={label}>
      <div className="space-y-1 text-right">
        {cost !== undefined && (
          <p className="font-semibold text-gray-900">{formatPrice(cost)}</p>
        )}
        <p className="text-sm font-medium text-gray-800">{name || '—'}</p>
        <div className="flex items-center justify-end gap-1.5">
          <StatusBadge status={status} />
          {date && <Text className="text-[11px] text-gray-400">{date}</Text>}
        </div>
      </div>
    </Row>
  );
}

export function JobMobileCard({ job }: { job: JobFormDataType }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <p className="font-semibold leading-tight text-gray-900">
              {job.jobName}
            </p>
            <p className="text-xs text-gray-500">
              {job.division} · {job.jobType}
            </p>
          </div>
          <span className="shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1 font-mono text-xs text-gray-500">
            {job.jobNo}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-100 px-4">
        {/* Summary row */}
        <Row label="Std Total / Qty">
          <span className="font-semibold">{formatPrice(job.stdTotal)}</span>
          <span className="ml-2 text-xs text-gray-400">
            × {job.totalQty} qty
          </span>
        </Row>

        <Row label="User">
          <span>ABC / CS User</span>
        </Row>

        {/* Approvers */}
        <ApproverBlock
          label="Operation Head"
          name={job?.operationHead?.userName}
          status={job?.operationHead?.status}
          date={job?.operationHead?.date}
        />

        <ApproverBlock
          label="Business Head"
          name={job?.businessHeadName?.userName}
          status={job?.businessHeadName?.status}
          date={job?.businessHeadName?.date}
          cost={job?.businessHeadName?.designCost}
        />

        <ApproverBlock
          label="Print Executive"
          name={job?.printExecutive?.userName}
          status={job?.printExecutive?.status}
          date={job?.printExecutive?.date}
        />

        <ApproverBlock
          label="Print Manager"
          name={job?.printManager?.managerName}
          status={job?.printManager?.vendorSelectionStatus}
          date={job?.printManager?.date}
        />

        {/* Vendor */}
        <Row label="Vendor">
          <div className="space-y-0.5">
            <p className="font-medium">{job.finalizedVendor || '—'}</p>
            <p className="text-xs text-gray-500">
              {formatPrice(job?.finalizedVendorCost)}
            </p>
          </div>
        </Row>

        {/* Delivery */}
        <Row label="Delivery">
          <span>{job.deliveryPlace || '—'}</span>
        </Row>
      </div>
    </div>
  );
}
