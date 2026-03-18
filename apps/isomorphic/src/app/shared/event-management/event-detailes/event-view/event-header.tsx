import { formatPrice } from '@/config/format-pricing';
import { EventViewDataType } from '@/data/event-management.data';

type Props = {
  event: EventViewDataType;
};

export default function EventHeader({ event }: Props) {
  return (
    <div className="rounded-lg border bg-[#F1F1F1] p-6 shadow-sm">
      <div className="grid grid-cols-2 gap-6 text-sm">
        {/* Left Side */}
        <div className="space-y-2">
          <p>
            <strong>Event Name:</strong> {event.eventName}
          </p>
          <p>
            <strong>Event Type:</strong> {event.eventType}
          </p>
          <p>
            <strong>Event STD Total:</strong> {formatPrice(event.stdTotal)}
          </p>
          <p>
            <strong>Event User:</strong> {event.user.userName} -{' '}
            {event.user.role}
          </p>
        </div>

        {/* Right Side */}
        <div className="space-y-2">
          <p>
            <strong>Company Name:</strong> {event.client?.company}
          </p>
          <p>
            <strong>Division Name:</strong> {event.client?.division || 'N/A'}
          </p>
          <p>
            <strong>Client Name:</strong> {event.client?.name || 'N/A'}
          </p>
          <p>
            <strong>Created Date:</strong>{' '}
            {event.createdAt
              ? new Date(event.createdAt).toLocaleDateString()
              : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  );
}
