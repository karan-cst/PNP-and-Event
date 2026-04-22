import DivisionClientTable from '@/app/shared/pnp-master/client-management/client-list/table';

export default function DivisionManagement() {
  return (
    <>
      <DivisionClientTable pageSize={10} />
    </>
  );
}
