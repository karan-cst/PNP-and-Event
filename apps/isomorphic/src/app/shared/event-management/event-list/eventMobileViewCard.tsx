import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { AiOutlineExport } from 'react-icons/ai';
import { formatPrice } from '@/config/format-pricing';
import { Text, Title } from 'rizzui/typography';
import { EventDataType } from './table';
import { getStatusBadge } from '@core/components/table-utils/get-status-badge';

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

export function EventMobileCard({
  event,
  role,
  ActionComponent,
}: {
  event: EventDataType;
  role?: string;
  ActionComponent?: React.ComponentType<{
    event: EventDataType;
    role?: string;
  }>;
}) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* ── Header ── */}
      <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
        <div className="flex items-start justify-between gap-2">
          {/* Event name + meta */}
          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => router.push('/event-management/event-detailes')}
              className="flex items-center gap-1 text-left font-semibold leading-tight text-gray-900 hover:underline"
            >
              {event.eventName}
              <AiOutlineExport className="mt-0.5 shrink-0 text-gray-400" />
            </button>
            <Text className="text-xs text-gray-500">
              {event.isPharma ? event.divisionName : event.clientName} ·{' '}
              {event.eventType}
            </Text>
          </div>

          {/* ID pill */}
          <span className="shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1 font-mono text-xs text-gray-500">
            #{event.id}
          </span>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="divide-y divide-gray-100 px-4">
        {/* Date */}
        <Row label="Event Date">
          <span>
            {dayjs(event.startDate).format('DD/MM/YYYY')}
            {' → '}
            {dayjs(event.endDate).format('DD/MM/YYYY')}
          </span>
        </Row>

        {/* Location */}
        <Row label="Location">
          <span>
            {event.location.city}, {event.location.state}
          </span>
        </Row>

        {/* Elements */}
        <Row label="Elements">
          <button
            type="button"
            onClick={() => {}}
            className="flex items-center justify-end gap-1 font-medium text-gray-900 hover:underline"
          >
            {event.elements}
            <AiOutlineExport className="shrink-0 text-gray-400" />
          </button>
        </Row>

        {/* Std Total / Tentative Cost */}
        <Row label="Std / Tentative">
          <div className="space-y-0.5">
            <p className="font-semibold">{formatPrice(event.stdTotal)}</p>
            <p className="text-xs text-gray-500">
              {formatPrice(event.vendor1Total)}
            </p>
          </div>
        </Row>

        {/* Client Rate */}
        <Row label="Client Rate">
          <span className="font-semibold">{formatPrice(event.clientRate)}</span>
        </Row>

        {/* Priority */}
        <Row label="Priority">{getStatusBadge(event.priority)}</Row>

        {/* Status */}
        <Row label="Status">
          <span className="text-sm text-gray-700">{event.status}</span>
        </Row>
      </div>

      {/* ── Footer: Actions ── */}
      {ActionComponent && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5">
          <ActionComponent event={event} role={role} />
        </div>
      )}
    </div>
  );
}
