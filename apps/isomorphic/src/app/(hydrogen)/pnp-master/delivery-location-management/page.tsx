import DeliveryLocationTable from '@/app/shared/pnp-master/delivery-location-management/division-list/table';

export default function DeliveryLocationManagement() {
  return (
    <>
      <DeliveryLocationTable pageSize={10} />
    </>
  );
}
